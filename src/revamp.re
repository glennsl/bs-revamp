
type re = Js.Re.t;

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

module Compiled = {
  let make ::flags=[] pattern => {
    let flags = flags
      |> List.map _flagToString
      |> List.fold_left (fun acc flag => acc ^ flag) "g";
    
    Js.Re.fromStringWithFlags pattern flags::flags
  };

  let exec re input => {
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

  let matches re input =>
    input |> exec re
          |> Sequence.map
                (fun result =>
                  Array.unsafe_get (result |> Js.Re.matches) 0
                );

  let indices re input =>
    input |> exec re
          |> Sequence.map
                (fun result => {
                  let index = Js.Re.index result;
                  let match_ = Array.unsafe_get (Js.Re.matches result) 0;
                  (index, index + Js.String.length match_)
                });

  let captures re input =>
    input |> exec re
          |> Sequence.map
                (fun result =>
                  result |> Js.Re.matches
                        |> Js.Array.sliceFrom 1
                );

  let test re input => {
    _assertValid re;
    let res = Js.Re.test input re;
    _reset re;
    res
  };

  let find re input => {
    _assertValid re;
    switch (re |> Js.Re.exec input) {
    | None => None
    | Some result =>
      _reset re;
      let matches = Js.Re.matches result;
      Some matches.(0)
    }
  };

  let findIndex re input => {
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

  let count re input =>
    input |> exec re
          |> Sequence.count;

  let replace re f input =>
    _replace re f input;

  let replaceByString re replacement input =>
    Js.String.replaceByRe re replacement input;

  let split re input =>
    Js.String.splitByRe re input

};

let exec pattern ::flags=[] input =>
  Compiled.exec (Compiled.make ::flags pattern) input;

let matches pattern ::flags=[] input =>
  Compiled.matches (Compiled.make ::flags pattern) input;

let indices pattern ::flags=[] input =>
  Compiled.indices (Compiled.make ::flags pattern) input;

let captures pattern ::flags=[] input =>
  Compiled.captures (Compiled.make ::flags pattern) input;

let test pattern ::flags=[] input =>
  Compiled.test (Compiled.make ::flags pattern) input;

let find pattern ::flags=[] input =>
  Compiled.find (Compiled.make ::flags pattern) input;

let findIndex pattern ::flags=[] input =>
  Compiled.findIndex (Compiled.make ::flags pattern) input;

let count pattern ::flags=[] input =>
  Compiled.count (Compiled.make ::flags pattern) input;

let replace pattern ::flags=[] f input =>
  Compiled.replace (Compiled.make ::flags pattern) f input;

let replaceByString pattern ::flags=[] replacement input =>
  Compiled.replaceByString (Compiled.make ::flags pattern) replacement input;

let split pattern ::flags=[] input =>
  Compiled.split (Compiled.make ::flags pattern) input;