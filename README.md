
# bs-re:vamp

An experimental safe and functional API for JavaScript regexes

[![npm](https://img.shields.io/npm/v/@glennsl/bs-revamp.svg)](https://npmjs.org/@glennsl/bs-revamp)
[![Travis](https://img.shields.io/travis/glennsl/bs-revamp/master.svg)](https://travis-ci.org/glennsl/bs-revamp)
[![Coveralls](https://img.shields.io/coveralls/glennsl/bs-revamp/master.svg)](https://coveralls.io/github/glennsl/bs-revamp?branch=master)
[![Dependencies](https://img.shields.io/david/glennsl/bs-revamp.svg)](https://github.com/glennsl/bs-revamp/network/dependencies)
[![Issues](https://img.shields.io/github/issues/glennsl/bs-revamp.svg)](https://github.com/glennsl/bs-revamp/issues)
[![Last Commit](https://img.shields.io/github/last-commit/glennsl/bs-revamp.svg)](https://github.com/glennsl/bs-revamp/commits/master)
[![Size](https://img.shields.io/github/size/glennsl/bs-revamp/lib/js/src/Revamp.js.svg)](https://github.com/glennsl/bs-revamp/blob/master/lib/js/src/Revamp.js)

## Example

```reason
/*
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

## Installation

```sh
npm install --save @glennsl/bs-revamp
```

Then add `@glennsl/bs-revamp` to `bs-dependencies` in your `bsconfig.json`:
```js
{
  ...
  "bs-dependencies": ["@glennsl/bs-revamp"]
}
```

## Goals

* A sane, safe API
* Low performance overhead (secondary)

## Non-goals

* Full feature parity

## Documentation

For the moment, please see the interface file, [Revamp.rei](https://github.com/glennsl/bs-revamp/blob/master/src/Revamp.rei).

## Changes

### Next

- [BREAKING] Removed `Match.matches`, deprecated in 0.1.0, sue to being unsound

### 0.1.0
* Changed type of `captures` from `Sequence.t(array(string))` to `Sequence.t(list(option(string)))` because the former was unsound.
* Added `Match.match` and `Match.captures`
* Deprecated `Match.matches` due to being unsound
