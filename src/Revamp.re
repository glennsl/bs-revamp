open Rebase;

[@bs.set] external _setLastIndex : (Js.Re.t, int) => unit = "lastIndex";
[@bs.send.pipe : string] external _replace : (Js.Re.t, string => string) => string = "replace";
[@bs.send.pipe: string] external _splitByRe: Js.Re.t => array(string) = "split";
let _captures = result =>
  result |> Js.Re.captures
         |> List.fromArray
         |> List.map(Js.toOption)
         |> List.tail
         |> Option.getOrRaise;

let _match = result =>
  result |> Js.Re.captures
         |> array => Array.unsafeGetUnchecked(0, array)
         |> Obj.magic;


type flags =
  | IgnoreCase
  | MultiLine
  | Unicode;

let _flagToString =
  fun | IgnoreCase => "i"
      | MultiLine  => "m"
      | Unicode    => "u";

let _assertValid = (re) => {
  if (Js.Re.lastIndex(re) != 0) {
    let lastIndex = Js.Re.lastIndex(re);
    raise(Invalid_argument({j|Invalid RegEx, lastIndex should be 0, is $lastIndex (This should never happen, file a bug!)|j}));
  };
  if (Js.Re.global(re) != true) {
    raise(Invalid_argument("Invalid RegEx, global == false (This should never happen, file a bug!)"));
  };
};

let _reset = re =>
  _setLastIndex(re, 0);

module Match = {
  type t = Js.Re.result;

  let match = _match;
  let captures = _captures;
  let index = Js.Re.index;
  let input = Js.Re.input;
};

module Compiled = {
  type t = Js.Re.t;

  let make = (~flags=[], pattern) => {
    let flags =
      flags |> List.map(_flagToString)
            |> List.reduce((acc, flag) => acc ++ flag, "g");

    Js.Re.fromStringWithFlags(pattern, ~flags=flags);
  };

  let exec = (re, input) => {
    _assertValid(re);
    let rec next = start => () => {
      _setLastIndex(re, start);
      switch (re -> Js.Re.exec_(input)) {
      | None => Nil
      | Some(result) =>
        let nextIndex = Js.Re.lastIndex(re);
        _reset(re);
        Cons(result, next(nextIndex));
      };
    };
    next(0);
  };

  let matches = (re, input) =>
    input |> exec(re)
          |> Seq.map(_match);

  let indices = (re, input) =>
    input |> exec(re)
          |> Seq.map(
               result => {
                 let index = Js.Re.index(result);
                 (index, index + Js.String.length(_match(result)));
               }
             );

  let captures = (re, input) =>
    input |> exec(re)
          |> Seq.map(_captures);

  let test = (re, input) => {
    _assertValid(re);
    let res = re->Js.Re.test_(input);
    _reset(re);
    res
  };

  let find = (re, input) => {
    _assertValid(re);
    switch (re -> Js.Re.exec_(input)) {
    | None => None
    | Some(result) =>
      _reset(re);
      Some(_match(result));
    };
  };

  let findIndex = (re, input) => {
    _assertValid(re);
    switch (re -> Js.Re.exec_(input)) {
    | None => None
    | Some(result) =>
      _reset(re);
      let index = Js.Re.index(result);
      Some((index, index + Js.String.length(_match(result))));
    };
  };

  let count = (re, input) =>
    input |> exec(re)
          |> Seq.count;

  let replace = (re, f, input) =>
    _replace(re, f, input);

  let replaceByString = (re, replacement, input) =>
    Js.String.replaceByRe(re, replacement, input);

  let split = (re, input) => _splitByRe(re, input);
};

let exec = (pattern, ~flags=[], input) =>
  Compiled.exec(Compiled.make(~flags=flags, pattern), input);

let matches = (pattern, ~flags=[], input) =>
  Compiled.matches(Compiled.make(~flags=flags, pattern), input);

let indices = (pattern, ~flags=[], input) =>
  Compiled.indices(Compiled.make(~flags=flags, pattern), input);

let captures = (pattern, ~flags=[], input) =>
  Compiled.captures(Compiled.make(~flags=flags, pattern), input);

let test = (pattern, ~flags=[], input) =>
  Compiled.test(Compiled.make(~flags=flags, pattern), input);

let find = (pattern, ~flags=[], input) =>
  Compiled.find(Compiled.make(~flags=flags, pattern), input);

let findIndex = (pattern, ~flags=[], input) =>
  Compiled.findIndex(Compiled.make(~flags=flags, pattern), input);

let count = (pattern, ~flags=[], input) =>
  Compiled.count(Compiled.make(~flags=flags, pattern), input);

let replace = (pattern, ~flags=[], f, input) =>
  Compiled.replace(Compiled.make(~flags=flags, pattern), f, input);

let replaceByString = (pattern, ~flags=[], replacement, input) =>
  Compiled.replaceByString(Compiled.make(~flags=flags, pattern), replacement, input);

let split = (pattern, ~flags=[], input) =>
  Compiled.split(Compiled.make(~flags=flags, pattern), input);
