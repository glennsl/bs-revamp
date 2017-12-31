'use strict';

var Rebase                  = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function _captures(result) {
  return Rebase.Option[/* getOrRaise */17](Rebase.List[/* tail */17](Rebase.List[/* map */0]((function (prim) {
                        if (prim == null) {
                          return /* None */0;
                        } else {
                          return [prim];
                        }
                      }), Rebase.List[/* fromArray */12](result))));
}

function _match(result) {
  return Rebase.$$Array[/* unsafeGetUnchecked */21](0, result);
}

function _flagToString(param) {
  switch (param) {
    case 0 : 
        return "i";
    case 1 : 
        return "m";
    case 2 : 
        return "u";
    
  }
}

function _assertValid(re) {
  if (re.lastIndex !== 0) {
    var lastIndex = re.lastIndex;
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Invalid RegEx, lastIndex should be 0, is " + (String(lastIndex) + " (This should never happen, file a bug!)")
        ];
  }
  if (+re.global !== /* true */1) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Invalid RegEx, global == false (This should never happen, file a bug!)"
        ];
  } else {
    return 0;
  }
}

function matches(prim) {
  return prim;
}

function index(prim) {
  return prim.index;
}

function input(prim) {
  return prim.input;
}

var Match = /* module */[
  /* matches */matches,
  /* match_ */_match,
  /* captures */_captures,
  /* index */index,
  /* input */input
];

function make($staropt$star, pattern) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  var flags$1 = Rebase.List[/* reduce */3]((function (acc, flag) {
          return acc + flag;
        }), "g", Rebase.List[/* map */0](_flagToString, flags));
  return new RegExp(pattern, flags$1);
}

function exec(re, input) {
  _assertValid(re);
  var next = function (start, _) {
    re.lastIndex = start;
    var match = re.exec(input);
    if (match !== null) {
      var nextIndex = re.lastIndex;
      re.lastIndex = 0;
      return /* Cons */[
              match,
              (function (param) {
                  return next(nextIndex, param);
                })
            ];
    } else {
      return /* Nil */0;
    }
  };
  return (function (param) {
      return next(0, param);
    });
}

function matches$1(re, input) {
  var partial_arg = exec(re, input);
  var partial_arg$1 = Rebase.Seq[/* map */0];
  return (function (param) {
      return partial_arg$1(_match, partial_arg, param);
    });
}

function indices(re, input) {
  var partial_arg = exec(re, input);
  var partial_arg$1 = Rebase.Seq[/* map */0];
  return (function (param) {
      return partial_arg$1((function (result) {
                    var index = result.index;
                    return /* tuple */[
                            index,
                            index + _match(result).length | 0
                          ];
                  }), partial_arg, param);
    });
}

function captures(re, input) {
  var partial_arg = exec(re, input);
  var partial_arg$1 = Rebase.Seq[/* map */0];
  return (function (param) {
      return partial_arg$1(_captures, partial_arg, param);
    });
}

function test(re, input) {
  _assertValid(re);
  var res = +re.test(input);
  re.lastIndex = 0;
  return res;
}

function find(re, input) {
  _assertValid(re);
  var match = re.exec(input);
  if (match !== null) {
    re.lastIndex = 0;
    return /* Some */[_match(match)];
  } else {
    return /* None */0;
  }
}

function findIndex(re, input) {
  _assertValid(re);
  var match = re.exec(input);
  if (match !== null) {
    re.lastIndex = 0;
    var index = match.index;
    return /* Some */[/* tuple */[
              index,
              index + _match(match).length | 0
            ]];
  } else {
    return /* None */0;
  }
}

function count(re, input) {
  return Rebase.Seq[/* count */16](exec(re, input));
}

function replace(re, f, input) {
  return input.replace(re, f);
}

function replaceByString(re, replacement, input) {
  return input.replace(re, replacement);
}

function split(re, input) {
  return input.split(re);
}

var Compiled = /* module */[
  /* make */make,
  /* exec */exec,
  /* matches */matches$1,
  /* indices */indices,
  /* captures */captures,
  /* test */test,
  /* find */find,
  /* findIndex */findIndex,
  /* count */count,
  /* replace */replace,
  /* replaceByString */replaceByString,
  /* split */split
];

function exec$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return exec(make(/* Some */[flags], pattern), input);
}

function matches$2(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return matches$1(make(/* Some */[flags], pattern), input);
}

function indices$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return indices(make(/* Some */[flags], pattern), input);
}

function captures$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return captures(make(/* Some */[flags], pattern), input);
}

function test$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return test(make(/* Some */[flags], pattern), input);
}

function find$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return find(make(/* Some */[flags], pattern), input);
}

function findIndex$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return findIndex(make(/* Some */[flags], pattern), input);
}

function count$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return count(make(/* Some */[flags], pattern), input);
}

function replace$1(pattern, $staropt$star, f, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return input.replace(make(/* Some */[flags], pattern), f);
}

function replaceByString$1(pattern, $staropt$star, replacement, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return input.replace(make(/* Some */[flags], pattern), replacement);
}

function split$1(pattern, $staropt$star, input) {
  var flags = $staropt$star ? $staropt$star[0] : /* [] */0;
  return input.split(make(/* Some */[flags], pattern));
}

exports.Match           = Match;
exports.Compiled        = Compiled;
exports.exec            = exec$1;
exports.matches         = matches$2;
exports.indices         = indices$1;
exports.captures        = captures$1;
exports.test            = test$1;
exports.find            = find$1;
exports.findIndex       = findIndex$1;
exports.count           = count$1;
exports.replace         = replace$1;
exports.replaceByString = replaceByString$1;
exports.split           = split$1;
/* No side effect */
