open Rebase;

type flags =
  | IgnoreCase
  | MultiLine
  | Unicode;

module Match: {
  type t;

  let match: t => string;
  let captures: t => list(option(string));
  let index: t => int;
  let input: t => string;
};

module Compiled: {
  type t;

  let make: (~flags: list(flags)=?, string) => t;
  let exec: (t, string) => seq(Match.t);
  let matches: (t, string) => seq(string);
  let indices: (t, string) => seq((int, int));
  let captures: (t, string) => seq(list(option(string)));
  let test: (t, string) => bool;
  let find: (t, string) => option(string);
  let findIndex: (t, string) => option((int, int));
  let count: (t, string) => int;
  let replace: (t, string => string, string) => string;
  let replaceByString: (t, string, string) => string; /* TODO: better name? */
  let split: (t, Js.String.t) => array(option(Js.String.t)); /* TODO: should be list string? */
};

let exec: (string, ~flags: list(flags)=?, string) => seq(Match.t);
let matches: (string, ~flags: list(flags)=?, string) => seq(string);
let indices: (string, ~flags: list(flags)=?, string) => seq((int, int));
let captures: (string, ~flags: list(flags)=?, string) => seq(list(option(string)));
let test: (string, ~flags: list(flags)=?, string) => bool;
let find: (string, ~flags: list(flags)=?, string) => option(string);
let findIndex: (string, ~flags: list(flags)=?, string) => option((int, int));
let count: (string, ~flags: list(flags)=?, string) => int;
let replace: (string, ~flags: list(flags)=?, string => string, string) => string;
let replaceByString: (string, ~flags: list(flags)=?, string, string) => string;
let split: (string, ~flags: Rebase.List.t(flags)=?, Js.String.t) =>
           array(option(Js.String.t));
