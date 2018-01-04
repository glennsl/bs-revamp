
# bs-re:vamp

An experimental safe and functional API for JavaScript regexes

[![Dependencies](https://img.shields.io/david/glennsl/bs-revamp.svg)]()
[![Issues](https://img.shields.io/github/issues/glennsl/bs-revamp.svg)](https://github.com/glennsl/bs-revamp/issues)
[![Last Commit](https://img.shields.io/github/last-commit/glennsl/bs-revamp.svg)]()

## Example

```reason
/**
 * Reason
 *
 * Dasherize camelCased identifiers inside string literals
 */

let code = {|
  let borderLeftColor = "borderLeftColor";
  let borderRightColor = "borderRightColor";
|};

code |> Revamp.replace({|"([^"]+)"|},                /* Matches the content of string literals */
          Revamp.replace("[A-Z]", letter =>          /* Matches uppercase letters */
            "-" ++ letter |> Js.String.toLowerCase)) /* Convert to lower case and prefix with a dash */
     |> Js.log;

/* Outputs:

  let borderLeftColor = "border-left-color";
  let borderRightColor = "border-right-color";
*/
```

```ml
(**
 * OCaml
 *
 * Dasherize camelCased identifiers inside string literals
 *)

let code =
  {|
  let borderLeftColor = "borderLeftColor";
  let borderRightColor = "borderRightColor";
|}

let () =
  code |> Revamp.replace {|"([^"]*)"|}                (* Matches the content of string literals *)
            (Revamp.replace "[A-Z]" (fun letter ->    (* Matches uppercase letters *)
              "-" ^ letter |> Js.String.toLowerCase)) (* Convert to lower case and prefix with a dash *)
       |> Js.log

(* Outputs:

  let borderLeftColor = "border-left-color";
  let borderRightColor = "border-right-color";
*)
```

## Goals

* A sane, safe API
* Low performance overhead (secondary)

## Non-goals

* Full feature parity

## Changes

### Next
* Changed type of `captures` from `Sequence.t(array(string))` to `Sequence.t(list(option(string)))` because the former was unsound.
* Added `Match.match` and `Match.captures`
* Deprecated `Match.matches` due to being unsound
