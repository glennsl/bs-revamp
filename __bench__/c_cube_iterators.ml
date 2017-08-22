(* based on https://github.com/c-cube/iterators_bench, with external dependencies inlined and converted to use bs-bench *)

module G = struct
type 'a t = unit -> 'a option

let (--) i j =
  let r = ref i in
  fun () ->
    if !r > j then None
    else (let x = !r in incr r; Some x)

let map f g =
  fun () -> match g() with
    | None -> None
    | Some x -> Some (f x)

let rec filter f g () = match g() with
  | None -> None
  | Some x when f x -> Some x
  | Some _ -> filter f g ()

type 'a state =
  | Start
  | Cur of 'a
  | Stop

let flat_map f g =
  let state = ref Start in
  let rec aux () = match !state with
    | Start -> next_gen(); aux ()
    | Stop -> None
    | Cur g' ->
      match g'() with
        | None -> next_gen(); aux ()
        | Some _ as res -> res
  and next_gen() = match g() with
    | None -> state := Stop
    | Some x -> state := Cur (f x)
    | exception e -> state := Stop; raise e
  in
  aux

let rec fold f acc g = match g () with
  | None -> acc
  | Some x -> fold f (f acc x) g
end

module G_exn = struct
exception End

type 'a t = unit -> 'a
(** @raise End when gen is exhausted *)

let (--) i j =
  let r = ref i in
  fun () ->
    if !r > j then raise End
    else (let x = !r in incr r; x)

let map f g =
  fun () ->
    let x = g() in
    f x

let rec filter f g () =
  let x = g() in
  if f x then x else filter f g ()

type 'a state =
  | Start
  | Cur of 'a
  | Stop

let flat_map f g =
  let state = ref Start in
  let rec aux () = match !state with
    | Start -> next_gen(); aux ()
    | Stop -> raise End
    | Cur g' ->
      match g'() with
        | x -> x
        | exception End -> next_gen(); aux ()
  and next_gen() = match g() with
    | x -> state := Cur (f x)
    | exception e -> state := Stop; raise e
  in
  aux

let rec fold f acc g = match g () with
  | x -> fold f (f acc x) g
  | exception End -> acc
end

module CPS = struct
type (+'a, 'state) unfold = {
  unfold: 'r.
    'state ->
    on_done:(unit -> 'r) ->
    on_skip:('state -> 'r) ->
    on_yield:('state -> 'a -> 'r) ->
    'r
}

type +_ t = CPS : 'state * ('a, 'state) unfold -> 'a t

let empty = CPS ((), {unfold=(fun () ~on_done ~on_skip:_ ~on_yield:_ -> on_done ())})

let return x = CPS ((), {
  unfold=(fun () ~on_done:_ ~on_skip:_ ~on_yield -> on_yield () x)
})

let map f (CPS (st, u)) = CPS (st, {
  unfold=(fun st ~on_done ~on_skip ~on_yield ->
    u.unfold
      st
      ~on_done
      ~on_skip
      ~on_yield:(fun st x -> on_yield st (f x))
  );
})

let fold f acc (CPS (st,u)) =
  let rec loop st acc =
    u.unfold
      st
      ~on_done:(fun _ -> acc)
      ~on_skip:(fun st' -> loop st' acc)
      ~on_yield:(fun st' x -> let acc = f acc x in loop st' acc)
  in
  loop st acc

let to_list_rev iter = fold (fun acc x -> x::acc) [] iter

let of_list l = CPS (l, {
  unfold=(fun l ~on_done ~on_skip:_ ~on_yield -> match l with
    | [] -> on_done ()
    | x :: tail -> on_yield tail x
  );
})

let (--) i j = CPS (i, {
  unfold=(fun i ~on_done ~on_skip:_ ~on_yield ->
    if i>j then on_done ()
    else on_yield (i+1) i
  );
})

let filter f (CPS (st, u1)) =
  CPS (st, {
    unfold=(fun st ~on_done ~on_skip ~on_yield ->
      u1.unfold st ~on_done ~on_skip
        ~on_yield:(fun st' x ->
          if f x then on_yield st' x
          else on_skip st'
        )
    );
  })

let flat_map : type a b. (a -> b t) -> a t -> b t
= fun f (CPS (st1, u1)) ->
  (* obtain next element of u1 *)
  let u = {
    unfold=(fun (st1, CPS (sub_st2, sub2))
        ~on_done ~on_skip ~on_yield ->
      let done_ () =
        u1.unfold st1
          ~on_done
          ~on_skip:(fun st1' -> on_skip (st1', empty))
          ~on_yield:(fun st1' x1 -> on_skip (st1', f x1))
      in
      let skip sub_st2 = on_skip (st1, CPS (sub_st2, sub2)) in
      let yield_ sub_st2 x2 = on_yield (st1, CPS (sub_st2,sub2)) x2 in
      sub2.unfold sub_st2 ~on_done:done_ ~on_skip:skip ~on_yield:yield_
    );
  }
  in
  CPS ((st1, empty), u)
end

module CPS2 = struct
type ('a, 's, 'r) t_record = {
  state : 's;
  unfold : 'r. 's
            -> on_done:(unit -> 'r)
            -> on_skip:('s -> 'r)
            -> on_yield:('s -> 'a -> 'r)
            -> 'r
}
type +'a t =
  | CPS :  ('a, 's, 'r) t_record -> 'a t

let empty =
  CPS { state = (); unfold=(fun () ~on_done ~on_skip:_ ~on_yield:_ -> on_done ()) }

let return x =
  CPS { state = ();
        unfold=(fun () ~on_done:_ ~on_skip:_ ~on_yield -> on_yield () x)
      }

let map f (CPS { state = st; unfold = u }) =
  CPS { state = st;
        unfold=(fun st ~on_done ~on_skip ~on_yield ->
          u
            st
            ~on_done
            ~on_skip
            ~on_yield:(fun st x -> on_yield st (f x))
        );
      }

let fold f acc (CPS { state = st; unfold = u }) =
  let rec loop st acc =
    u
      st
      ~on_done:(fun _ -> acc)
      ~on_skip:(fun st' -> loop st' acc)
      ~on_yield:(fun st' x -> let acc = f acc x in loop st' acc)
  in
  loop st acc

let to_list_rev iter = fold (fun acc x -> x::acc) [] iter

let of_list l = CPS { state = l;
                      unfold=(fun l ~on_done ~on_skip:_ ~on_yield -> match l with
                        | [] -> on_done ()
                        | x :: tail -> on_yield tail x
                      );
                    }

let (--) i j = CPS { state = i;
                     unfold=(fun i ~on_done ~on_skip:_ ~on_yield ->
                       if i>j then on_done ()
                       else on_yield (i+1) i
                     );
                   }

let filter f (CPS { state = st; unfold = u1 }) =
  CPS { state = st;
        unfold=(fun st ~on_done ~on_skip ~on_yield ->
          u1 st ~on_done ~on_skip
            ~on_yield:(fun st' x ->
              if f x then on_yield st' x
              else on_skip st'
            )
        );
      }

let flat_map : type a b. (a -> b t) -> a t -> b t
  = fun f (CPS { state = st1; unfold = u1 }) ->
    (* obtain next element of u1 *)
    let u = (fun (st1, CPS { state = sub_st2; unfold = sub2 })
              ~on_done ~on_skip ~on_yield ->
              let done_ () =
                u1 st1
                  ~on_done
                  ~on_skip:(fun st1' -> on_skip (st1', empty))
                  ~on_yield:(fun st1' x1 -> on_skip (st1', f x1))
              in
              let skip sub_st2 = on_skip (st1, CPS { state = sub_st2; unfold = sub2 }) in
              let yield_ sub_st2 x2 =
                on_yield (st1, CPS { state = sub_st2; unfold = sub2 }) x2
              in
              sub2 sub_st2 ~on_done:done_ ~on_skip:skip ~on_yield:yield_
            );
    in
    CPS { state = (st1, empty); unfold = u }
end

module Fold = struct
type ('a, 's) t_record = {
  fold: 'b. 's -> init:'b -> f:('b -> 'a -> 'b) -> 'b;
  s: 's
}
type _ t =
  | Fold : ('a, 's) t_record -> 'a t

let map (Fold{fold;s}) ~f:m =
  let fold s ~init ~f =
    fold s ~init ~f:(fun b a -> f b (m a))
  in
  Fold{fold;s}

let filter (Fold{fold;s}) ~f:p =
  let fold s ~init ~f =
    fold s ~init ~f:(fun b a -> if p a then  f b a else b)
  in
  Fold{fold;s}

let fold (Fold{fold;s}) = fold s

let flat_map (Fold{fold=fold1;s=s1}) ~f:m =
  let fold _s2 ~init ~f =
    fold1 s1
      ~init
      ~f:(fun acc x1 ->
        let (Fold{fold=fold2;s=s2}) = m x1 in
        fold2 s2 ~init:acc ~f)
  in
  Fold {fold; s=s1}

let (--) i j =
  let rec fold s ~init ~f =
    if s>j then init
    else fold (s+1) ~init:(f init s) ~f
  in
  Fold {fold; s=i}
end

module LList = struct
type 'a t = 'a node lazy_t
and 'a node = Nil | Cons of 'a * 'a t

let rec (--) i j =
  lazy (
    if i>j then  Nil
    else Cons (i, i+1 -- j)
  )

let rec map f l =
  lazy (match l with
    | lazy Nil -> Nil
    | lazy (Cons (x,tail)) -> Cons (f x, map f tail)
  )

let filter f l =
  let rec aux f l = match l with
    | lazy Nil -> Nil
    | lazy (Cons (x,tl)) when f x -> Cons (x, lazy (aux f tl))
    | lazy (Cons (_, tl)) ->  aux f tl
  in
  lazy (aux f l)

let rec append a b =
  lazy (
    match a with
      | lazy Nil -> Lazy.force b
      | lazy (Cons (x,tl)) -> Cons (x, append tl b)
  )

let rec flat_map f l =
  lazy (
    match l with
      | lazy Nil -> Nil
      | lazy (Cons (x,tl)) ->
        let res = append (f x) (flat_map f tl) in
        Lazy.force res
  )

let rec fold f acc = function
  | lazy Nil -> acc
  | lazy (Cons (x,tl)) -> fold f (f acc x) tl
end

module UList = struct
type 'a t = unit -> 'a node
and 'a node = Nil | Cons of 'a * 'a t

let rec (--) i j () =
  if i>j then Nil
  else Cons (i, i+1 -- j)

let rec map f l () =
  match l () with
    | Nil -> Nil
    | Cons (x,tail) -> Cons (f x, map f tail)

let filter f l =
  let rec aux f l () = match l () with
    | Nil -> Nil
    | Cons (x,tl) when f x -> Cons (x, aux f tl)
    | Cons (_, tl) -> aux f tl ()
  in
  aux f l

let rec append a b () =
  match a () with
    | Nil -> b ()
    | Cons (x,tl) -> Cons (x, append tl b)

let rec flat_map f l () =
  match l() with
    | Nil -> Nil
    | Cons (x,tl) ->
      let res = append (f x) (flat_map f tl) in
      res ()

let rec fold f acc l = match l() with
  | Nil -> acc
  | Cons (x,tl) -> fold f (f acc x) tl
end

module UnCons = struct
type ('a, 'st) t_record = {
  state: 'st;
  next: 'st -> ('a * 'st) option
}
type +'a t = T : ('a, 'st) t_record -> 'a t

let empty = T { state=(); next=(fun _ -> None) }

let (--) i j =
  let next i = if i>j then None else Some (i, i+1) in
  T {state=i; next}

let map f (T {state; next}) =
  let next' s = match next s with
    | None -> None
    | Some (x, s') -> Some (f x, s')
  in
  T {state; next=next'}

let filter f (T {state; next}) =
  let rec next' s = match next s with
    | None -> None
    | Some (x, _) as res when f x -> res
    | Some (_, s') -> next' s'
  in
  T {state; next=next'}

type ('b, 'top_st, 'sub_st) flat_map_state_record = {
  top: 'top_st;
  sub: 'sub_st;
  sub_next: 'sub_st -> ('b * 'sub_st) option
}
type ('a, 'b, 'top_st) flat_map_state = 
  FMS: ('b, 'top_st, 'sub_st) flat_map_state_record -> ('a, 'b, 'top_st) flat_map_state

let flat_map f (T {state; next}) =
  let rec next' (FMS { top; sub; sub_next}) =
    match sub_next sub with
      | None ->
        begin match next top with
          | None -> None
          | Some (x, top') ->
            let T{next=sub_next; state=sub} = f x in
            next' (FMS { top=top'; sub; sub_next; })
        end
      | Some (x, sub') ->
        Some (x, FMS {top; sub=sub'; sub_next})
  in
  T {
    state=FMS {top=state; sub=(); sub_next=(fun _ -> None) };
    next=next';
  }

let fold f acc (T{state; next}) =
  let rec aux f acc state = match next state with
    | None -> acc
    | Some (x, state') ->
      let acc = f acc x in
      aux f acc state'
  in
  aux f acc state
end

module Gen = struct
  type 'a t = unit -> 'a option
  
  type 'a gen = 'a t

  let map f gen =
    let stop = ref false in
    fun () ->
      if !stop then None
      else match gen() with
        | None -> stop:= true; None
        | Some x -> Some (f x)

  let filter p gen =
    let rec next () =
      (* wrap exception into option, for next to be tailrec *)
      match gen() with
      | None -> None
      | (Some x) as res ->
          if p x
          then res (* yield element *)
          else next ()  (* discard element *)
    in next

  module RunState = struct
    type 'a t =
      | Init
      | Run of 'a
      | Stop
  end

  let flat_map f next_elem =
    let open RunState in
    let state = ref Init in
    let rec next() =
      match !state with
      | Init -> get_next_gen()
      | Run gen ->
          begin match gen () with
            | None -> get_next_gen ()
            | (Some _) as x -> x
          end
      | Stop -> None
    and get_next_gen() = match next_elem() with
      | None -> state:=Stop; None
      | Some x ->
          begin try state := Run (f x)
            with e ->
              state := Stop;
              raise e
          end;
          next()
    in
    next

  let rec fold f acc gen =
    match gen () with
    | None -> acc
    | Some x -> fold f (f acc x) gen

  let int_range ?(step=1) i j =
    if step = 0 then raise (Invalid_argument "Gen.int_range");
    let (>) = if step > 0 then (>) else (<) in
    let r = ref i in
    fun () ->
      let x = !r in
      if x > j then None
      else begin
        r := !r + step;
        Some x
      end

  let (--) = int_range
end

module Sequence = struct
  type 'a t = ('a -> unit) -> unit
  
  type 'a sequence = 'a t

  let map f seq k = seq (fun x -> k (f x))

  let filter p seq k = seq (fun x -> if p x then k x)

  let flat_map f seq k = seq (fun x -> f x k)

  let fold f init seq =
    let r = ref init in
    seq (fun elt -> r := f !r elt);
    !r

  let int_range ~start ~stop k =
    for i = start to stop do k i done

  let (--) i j = int_range ~start:i ~stop:j
end

module CCList = struct
  include List

  let flat_map f l =
    let rec aux f l kont = match l with
      | [] -> kont []
      | x::l' ->
        let y = f x in
        let kont' tail = match y with
          | [] -> kont tail
          | [x] -> kont (x :: tail)
          | [x;y] -> kont (x::y::tail)
          | l -> kont (append l tail)
        in
        aux f l' kont'
    in
    aux f l (fun l->l)

  let range i j =
    let rec up i j acc =
      if i=j then i::acc else up i (j-1) (j::acc)
    and down i j acc =
      if i=j then i::acc else down i (j+1) (j::acc)
    in
    if i<=j then up i j [] else down i j []

  let (--) = range

end

module Core_kernel_sequence = struct

  module Step = struct
    type ('a,'s) t =
      | Done
      | Skip of 's
      | Yield of 'a * 's
  end
  
  open Step

  type +_ t =
    | Sequence : 's * ('s -> ('a,'s) Step.t) -> 'a t
  
  type 'a sequence = 'a t

  let empty =
    Sequence((), fun () -> Done)

  let unfold_step ~init ~f =
    Sequence (init,f)

  let map t ~f =
    match t with
    | Sequence(seed, next) ->
      Sequence(seed,
               fun seed ->
                 match next seed with
                 | Done -> Done
                 | Skip s -> Skip s
                 | Yield(a,s) -> Yield(f a,s))

  let filter t ~f =
    match t with
    | Sequence(seed, next) ->
      Sequence(seed,
                fun seed ->
                  match next seed with
                  | Done -> Done
                  | Skip s -> Skip s
                  | Yield(a,s) when f a -> Yield(a,s)
                  | Yield (_,s) -> Skip s)

  let bind t ~f =
    unfold_step
      ~f:(function
        | Sequence(seed,next), rest ->
          match next seed with
          | Done ->
            begin
              match rest with
              | Sequence(seed, next) ->
                match next seed with
                | Done -> Done
                | Skip s -> Skip (empty, Sequence(s, next))
                | Yield(a, s) -> Skip(f a, Sequence(s, next))
            end
          | Skip s -> Skip (Sequence(s,next), rest)
          | Yield(a,s) -> Yield(a, (Sequence(s,next) , rest)))
      ~init:(empty,t)

  let concat_map s ~f = bind s ~f

  let fold t ~init ~f =
    let rec loop seed v next f =
      match next seed with
      | Done -> v
      | Skip s -> loop s v next f
      | Yield(a,s) -> loop s (f v a) next f
    in
    match t with
    | Sequence(seed, next) -> loop seed init next f

  let range ?(stride=1) ?(start=`inclusive) ?(stop=`exclusive) start_v stop_v =
    let step =
      match stop with
      | `inclusive when stride >= 0 ->
        fun i -> if i > stop_v then Done else Yield(i, i + stride)
      | `inclusive ->
        fun i -> if i < stop_v then Done else Yield(i, i + stride)
      | `exclusive when stride >= 0 ->
        fun i -> if i >= stop_v then Done else Yield(i,i + stride)
      | `exclusive ->
        fun i -> if i <= stop_v then Done else Yield(i,i + stride)
    in
    let init =
      match start with
      | `inclusive -> start_v
      | `exclusive -> start_v + stride
    in
    unfold_step ~init ~f:step
end

(* the "gen" library *)
let f_gen () =
let open Gen in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_g () =
let open G in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_g_exn () =
let open G_exn in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

(* sequence library *)
let f_seq () =
let open Sequence in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_cps () =
let open CPS in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_cps2 () =
let open CPS2 in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_fold () =
let open Fold in
1 -- 100_000
|> map ~f:(fun x -> x +1)
|> filter ~f:(fun i -> i mod 2 = 0)
|> flat_map ~f:(fun x -> x -- (x+30))
|> fold ~init:0 ~f:(+)

let f_list () =
let open CCList in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> List.fold_left (+) 0

let f_llist () =
let open LList in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_ulist () =
let open UList in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

let f_uncons () =
let open UnCons in
1 -- 100_000
|> map (fun x -> x+1)
|> filter (fun x -> x mod 2 = 0)
|> flat_map (fun x -> x -- (x+30))
|> fold (+) 0

(* Core library *)
let f_core () =
let open Core_kernel_sequence in
range ~start:`inclusive ~stop:`inclusive 1 100_000
|> map ~f:(fun x -> x+1)
|> filter ~f:(fun x -> x mod 2 = 0)
|> concat_map ~f:(fun x -> range ~start:`inclusive ~stop:`inclusive x (x+30))
|> fold ~f:(+) ~init:0

let () =
assert (f_g () = f_gen());
assert (f_g_exn () = f_gen());
assert (f_seq () = f_gen());
assert (f_core () = f_gen());
assert (f_fold () = f_gen());
assert (f_uncons () = f_gen());
()

let () =
  Benchmark.(
    makeSuite "tags"
    |> add "Gen" (fun () -> ignore (f_gen ()))
    |> add "g" (fun () -> ignore (f_g ()))
    |> add "g_exn" (fun () -> ignore (f_g_exn ()))
    |> add "core.sequence" (fun () -> ignore (f_core ()))
    |> add "cps" (fun () -> ignore (f_cps ()))
    |> add "cps2" (fun () -> ignore (f_cps2 ()))
    |> add "fold" (fun () -> ignore (f_fold ()))
    |> add "sequence" (fun () -> ignore (f_seq ()))
    |> add "list" (fun () -> ignore (f_list ()))
    |> add "lazy_list" (fun () -> ignore (f_llist ()))
    |> add "ulist" (fun () -> ignore (f_ulist ()))
    |> add "uncons" (fun () -> ignore (f_uncons ()))
    |> on "cycle" (fun event -> 
      Js.log (Js.String.make event##target)
    )
    |> run ()
  )