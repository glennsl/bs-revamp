
type re = Js.Re.t;
type captures = array string;

external _setLastIndex : re => int => unit = "lastIndex" [@@bs.set];
external _replace : re => (string => string) => string = "replace" [@@bs.send.pipe: string];

type flags =
| IgnoreCase
| MultiLine
| Unicode;

let _flagToString = fun
| IgnoreCase => "i"
| MultiLine => "m"
| Unicode => "u";

let _assertValid re => {
  if ((Js.Re.lastIndex re) != 0) {
    let lastIndex = Js.Re.lastIndex re;
    raise (Invalid_argument {j|Invalid RegEx, lastIndex should be 0, is $lastIndex (This should never happen, file a bug!)|j})
  };
  if ((Js.Re.global re) != true) {
    raise (Invalid_argument "Invalid RegEx, global == false (This should never happen, file a bug!)")
  }
};

let _reset re => {
  _setLastIndex re 0
};


let compile ::flags=[] pattern => {
  let flags = flags
    |> List.map _flagToString
    |> List.fold_left (fun acc flag => acc ^ flag) "g";
  
  Js.Re.fromStringWithFlags pattern flags::flags
};

let exec input re => {
  _assertValid re;
  let rec next start () => {
    _setLastIndex re start;
    switch (re |> Js.Re.exec input) {
      | None => Sequence.Nil
      | Some result => {
        let nextIndex = Js.Re.lastIndex re;
        _reset re;
        Sequence.Cons result (next nextIndex)
      }
    }
  };
  next 0
};

let matches input re =>
  re |> exec input
     |> Sequence.map
          (fun result =>
            Array.unsafe_get (result |> Js.Re.matches) 0
          );

let indices input re =>
  re |> exec input
     |> Sequence.map
          (fun result => {
            let index = Js.Re.index result;
            let match_ = Array.unsafe_get (Js.Re.matches result) 0;
            (index, index + Js.String.length match_)
          });

let captures input re =>
  re |> exec input
     |> Sequence.map
          (fun result =>
            result |> Js.Re.matches
                   |> Js.Array.sliceFrom 1
          );

let test input re => {
  _assertValid re;
  let res = Js.Re.test input re;
  _reset re;
  res
};

let find input re => {
  _assertValid re;
  switch (re |> Js.Re.exec input) {
  | None => None
  | Some result =>
    _reset re;
    let matches = Js.Re.matches result;
    Some matches.(0)
  }
};

let findIndex input re => {
  _assertValid re;
  switch (re |> Js.Re.exec input) {
  | None => None
  | Some result =>
    _reset re;
    let matches = Js.Re.matches result;
    let index = Js.Re.index result;
    Some (index, index + (Js.String.length matches.(0)))
  }
};

let count input re =>
  exec input re |> Sequence.count;

let replace f input re =>
  _replace re f input;

let split input re =>
  Js.String.splitByRe re input