[@bs.set] external _setLastIndex : (Js.Re.t, int) => unit = "lastIndex";

let re = [%re "/(na)+/g"];

module Seq = {
  open Rebase;

  let rec forEach = (f, seq) =>
    switch (seq()) {
    | Nil => ()
    | Cons(element, next) =>
      f(element);
      forEach(f, next);
    };

  let rec map = (f, seq) =>
    switch (seq()) {
    | Nil => () => Nil
    | Cons(element, next) => () => Cons(f(element), map(f, next))
    };

  let exec = (input, re) => {
    let rec next = start => () => {
      _setLastIndex(re, start);
      switch (re->Js.Re.exec_(input)) {
      | None => Nil
      | Some(result) =>
        let nextIndex = Js.Re.lastIndex(re);
        _setLastIndex(re, 0);
        Cons(result, next(nextIndex));
      };
    };
    next(0);
  };

  let matches = (input, re) =>
    re |> exec(input)
       |> map(result => Array.unsafeGetUnchecked(0, result |> Js.Re.captures));
};

module Gen = {
  type t('a) = unit => option('a);

  let exec = (input, re) => {
    let nextIndex = ref(0);
    () => {
      _setLastIndex(re, nextIndex^);
      switch (re->Js.Re.exec_(input)) {
      | None => None
      | Some(result) =>
        nextIndex := Js.Re.lastIndex(re);
        _setLastIndex(re, 0);
        Some(result);
      };
    };
  };

  let rec forEach = (f, gen) =>
    switch (gen()) {
    | None => ()
    | Some(element) =>
      f(element);
      forEach(f, gen);
    };
};

module Internal = {
  let rec forEach = (f, input, re) =>
    switch (re->Js.Re.exec_("bananas")) {
    | None => ()
    | Some(result) =>
      f(result);
      forEach(f, input, re);
    };
};

let run = () => Benchmark.(
  makeSuite("iterators")
  |> add("Imperative (baseline)", () => {
      let break = ref(false);
      while (!break^) {
        switch (re->Js.Re.exec_("bananas")) {
        | None => break := true
        | Some(result) =>
          let _: string = switch (
                 result
                 ->Js.Re.captures
                 ->Belt.Array.getExn(1)
                 ->Js.Nullable.toOption
               ) {
               | Some(string) => string
               | None => ""
               };
             ();
           };
         };
       })
  |> add("Seq", () =>
      re |> Seq.exec("bananas")
         |> Seq.forEach(ignore)
     )
  |> add("Seq + map", () =>
      re |> Seq.matches("bananas")
         |> Seq.forEach(ignore)
     )
  |> add("Gen", () =>
      re |> Gen.exec("bananas")
         |> Gen.forEach(ignore)
     )
  |> add("Internal", () =>
      re |> Internal.forEach(ignore, "bananas")
  )
  |> on("cycle", event => Js.log(Js.String.make(event##target)))
  |> run()
);
