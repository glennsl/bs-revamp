'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function _captures(result) {
  return Rebase.$$Option.getOrRaise(Rebase.List.tail(Rebase.List.map((function (prim) {
                        if (prim == null) {
                          return ;
                        } else {
                          return Caml_option.some(prim);
                        }
                      }), Rebase.List.fromArray(result))));
}

function _match(result) {
  return Rebase.$$Array.unsafeGetUnchecked(0, result);
}

function _flagToString(param) {
  switch (param) {
    case /* IgnoreCase */0 :
        return "i";
    case /* MultiLine */1 :
        return "m";
    case /* Unicode */2 :
        return "u";
    
  }
}

function _assertValid(re) {
  if (re.lastIndex !== 0) {
    var lastIndex = re.lastIndex;
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Invalid RegEx, lastIndex should be 0, is " + lastIndex + " (This should never happen, file a bug!)",
          Error: new Error()
        };
  }
  if (re.global === true) {
    return ;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Invalid RegEx, global == false (This should never happen, file a bug!)",
        Error: new Error()
      };
}

function index(prim) {
  return prim.index;
}

function input(prim) {
  return prim.input;
}

var Match = {
  match_: _match,
  captures: _captures,
  index: index,
  input: input
};

function make(flagsOpt, pattern) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  var flags$1 = Rebase.List.reduce((function (acc, flag) {
          return acc + flag;
        }), "g", Rebase.List.map(_flagToString, flags));
  return new RegExp(pattern, flags$1);
}

function exec(re, input) {
  _assertValid(re);
  var next = function (start, param) {
    re.lastIndex = start;
    var result = re.exec(input);
    if (result === null) {
      return /* Nil */0;
    }
    var nextIndex = re.lastIndex;
    re.lastIndex = 0;
    return /* Cons */{
            _0: result,
            _1: (function (param) {
                return next(nextIndex, param);
              })
          };
  };
  return function (param) {
    return next(0, param);
  };
}

function matches(re, input) {
  var partial_arg = exec(re, input);
  return function (param) {
    return Rebase.Seq.map(_match, partial_arg, param);
  };
}

function indices(re, input) {
  var partial_arg = exec(re, input);
  return function (param) {
    return Rebase.Seq.map((function (result) {
                  var index = result.index;
                  return [
                          index,
                          index + _match(result).length | 0
                        ];
                }), partial_arg, param);
  };
}

function captures(re, input) {
  var partial_arg = exec(re, input);
  return function (param) {
    return Rebase.Seq.map(_captures, partial_arg, param);
  };
}

function test(re, input) {
  _assertValid(re);
  var res = re.test(input);
  re.lastIndex = 0;
  return res;
}

function find(re, input) {
  _assertValid(re);
  var result = re.exec(input);
  if (result !== null) {
    re.lastIndex = 0;
    return Caml_option.some(_match(result));
  }
  
}

function findIndex(re, input) {
  _assertValid(re);
  var result = re.exec(input);
  if (result === null) {
    return ;
  }
  re.lastIndex = 0;
  var index = result.index;
  return [
          index,
          index + _match(result).length | 0
        ];
}

function count(re, input) {
  return Rebase.Seq.count(exec(re, input));
}

function replace(re, f, input) {
  return input.replace(re, f);
}

function replaceByString(re, replacement, input) {
  return input.replace(re, replacement);
}

function split(re, input) {
  return Belt_Array.keepMap(input.split(re), (function (x) {
                return x;
              }));
}

var Compiled = {
  make: make,
  exec: exec,
  matches: matches,
  indices: indices,
  captures: captures,
  test: test,
  find: find,
  findIndex: findIndex,
  count: count,
  replace: replace,
  replaceByString: replaceByString,
  split: split
};

function exec$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return exec(make(flags, pattern), input);
}

function matches$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return matches(make(flags, pattern), input);
}

function indices$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return indices(make(flags, pattern), input);
}

function captures$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return captures(make(flags, pattern), input);
}

function test$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return test(make(flags, pattern), input);
}

function find$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return find(make(flags, pattern), input);
}

function findIndex$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return findIndex(make(flags, pattern), input);
}

function count$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return count(make(flags, pattern), input);
}

function replace$1(pattern, flagsOpt, f, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return input.replace(make(flags, pattern), f);
}

function replaceByString$1(pattern, flagsOpt, replacement, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return input.replace(make(flags, pattern), replacement);
}

function split$1(pattern, flagsOpt, input) {
  var flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  return split(make(flags, pattern), input);
}

exports.Match = Match;
exports.Compiled = Compiled;
exports.exec = exec$1;
exports.matches = matches$1;
exports.indices = indices$1;
exports.captures = captures$1;
exports.test = test$1;
exports.find = find$1;
exports.findIndex = findIndex$1;
exports.count = count$1;
exports.replace = replace$1;
exports.replaceByString = replaceByString$1;
exports.split = split$1;
/* No side effect */
