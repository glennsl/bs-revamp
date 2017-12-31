'use strict';

var Curry     = require("bs-platform/lib/js/curry.js");
var Benchmark = require("benchmark");

var re = (/(na)+/g);

function forEach(f, _seq) {
  while(true) {
    var seq = _seq;
    var match = Curry._1(seq, /* () */0);
    if (match) {
      Curry._1(f, match[0]);
      _seq = match[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function map(f, seq) {
  var match = Curry._1(seq, /* () */0);
  if (match) {
    var next = match[1];
    var element = match[0];
    return (function () {
        return /* Cons */[
                Curry._1(f, element),
                map(f, next)
              ];
      });
  } else {
    return (function () {
        return /* Nil */0;
      });
  }
}

function exec(input, re) {
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

function matches(input, re) {
  return map((function (result) {
                return result[0];
              }), exec(input, re));
}

var Seq = /* module */[
  /* forEach */forEach,
  /* map */map,
  /* exec */exec,
  /* matches */matches
];

function exec$1(input, re) {
  var nextIndex = [0];
  return (function () {
      re.lastIndex = nextIndex[0];
      var match = re.exec(input);
      if (match !== null) {
        nextIndex[0] = re.lastIndex;
        re.lastIndex = 0;
        return /* Some */[match];
      } else {
        return /* None */0;
      }
    });
}

function forEach$1(f, gen) {
  while(true) {
    var match = Curry._1(gen, /* () */0);
    if (match) {
      Curry._1(f, match[0]);
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

var Gen = /* module */[
  /* exec */exec$1,
  /* forEach */forEach$1
];

function forEach$2(f, _, re) {
  while(true) {
    var match = re.exec("bananas");
    if (match !== null) {
      Curry._1(f, match);
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

var Internal = /* module */[/* forEach */forEach$2];

function run() {
  new Benchmark.Suite("iterators").add("Imperative (baseline)", (function () {
                      var $$break = /* false */0;
                      while(!$$break) {
                        var match = re.exec("bananas");
                        if (match === null) {
                          $$break = /* true */1;
                        }
                        
                      };
                      return /* () */0;
                    })).add("Seq", (function () {
                    return forEach((function () {
                                  return /* () */0;
                                }), exec("bananas", re));
                  })).add("Seq + map", (function () {
                  return forEach((function () {
                                return /* () */0;
                              }), matches("bananas", re));
                })).add("Gen", (function () {
                return forEach$1((function () {
                              return /* () */0;
                            }), exec$1("bananas", re));
              })).add("Internal", (function () {
              return forEach$2((function () {
                            return /* () */0;
                          }), "bananas", re);
            })).on("cycle", (function ($$event) {
            console.log(String($$event.target));
            return /* () */0;
          })).run();
  return /* () */0;
}

exports.re       = re;
exports.Seq      = Seq;
exports.Gen      = Gen;
exports.Internal = Internal;
exports.run      = run;
/* re Not a pure module */
