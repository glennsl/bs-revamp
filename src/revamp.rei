type flags =
  | IgnoreCase
  | MultiLine
  | Unicode;

module Match: {
  type t;
  
  /* TODO: implement better API */
  let matches: t => array(string);
  let index: t => int;
  let input: t => string;
};

module Compiled: {
  type t;

  let make: (~flags: list(flags)=?, string) => t;
  let exec: (t, string) => Sequence.t(Match.t);
  let matches: (t, string) => Sequence.t(string);
  let indices: (t, string) => Sequence.t((int, int));
  let captures: (t, string) => Sequence.t(array(string)); /* TODO: should be list string? */
  let test: (t, string) => bool;
  let find: (t, string) => option(string);
  let findIndex: (t, string) => option((int, int));
  let count: (t, string) => int;
  let replace: (t, string => string, string) => string;
  let replaceByString: (t, string, string) => string; /* TODO: better name? */
  let split: (t, string) => array(string); /* TODO: should be list string? */
};

let exec: (string, ~flags: list(flags)=?, string) => Sequence.t(Match.t);
let matches: (string, ~flags: list(flags)=?, string) => Sequence.t(string);
let indices: (string, ~flags: list(flags)=?, string) => Sequence.t((int, int));
let captures: (string, ~flags: list(flags)=?, string) => Sequence.t(array(string));
let test: (string, ~flags: list(flags)=?, string) => bool;
let find: (string, ~flags: list(flags)=?, string) => option(string);
let findIndex: (string, ~flags: list(flags)=?, string) => option((int, int));
let count: (string, ~flags: list(flags)=?, string) => int;
let replace: (string, ~flags: list(flags)=?, string => string, string) => string;
let replaceByString: (string, ~flags: list(flags)=?, string, string) => string;
let split: (string, ~flags: list(flags)=?, string) => array(string);