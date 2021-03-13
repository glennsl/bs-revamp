'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Benchmark = require("benchmark");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var re = /(na)+/g;

function forEach(f, _seq) {
  while(true) {
    var seq = _seq;
    var match = Curry._1(seq, undefined);
    if (!match) {
      return ;
    }
    Curry._1(f, match._0);
    _seq = match._1;
    continue ;
  };
}

function map(f, seq) {
  var match = Curry._1(seq, undefined);
  if (!match) {
    return function (param) {
      return /* Nil */0;
    };
  }
  var next = match._1;
  var element = match._0;
  return function (param) {
    return /* Cons */{
            _0: Curry._1(f, element),
            _1: map(f, next)
          };
  };
}

function exec(input, re) {
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

function matches(input, re) {
  return map((function (result) {
                return Rebase.$$Array.unsafeGetUnchecked(0, result);
              }), exec(input, re));
}

var Seq = {
  forEach: forEach,
  map: map,
  exec: exec,
  matches: matches
};

function exec$1(input, re) {
  var nextIndex = {
    contents: 0
  };
  return function (param) {
    re.lastIndex = nextIndex.contents;
    var result = re.exec(input);
    if (result !== null) {
      nextIndex.contents = re.lastIndex;
      re.lastIndex = 0;
      return Caml_option.some(result);
    }
    
  };
}

function forEach$1(f, gen) {
  while(true) {
    var element = Curry._1(gen, undefined);
    if (element === undefined) {
      return ;
    }
    Curry._1(f, Caml_option.valFromOption(element));
    continue ;
  };
}

var Gen = {
  exec: exec$1,
  forEach: forEach$1
};

function forEach$2(f, input, re) {
  while(true) {
    var result = re.exec("bananas");
    if (result === null) {
      return ;
    }
    Curry._1(f, result);
    continue ;
  };
}

var Internal = {
  forEach: forEach$2
};

function run(param) {
  new Benchmark.Suite("iterators").add("Imperative (baseline)", (function (param) {
                      var $$break = false;
                      while(!$$break) {
                        var result = re.exec("bananas");
                        if (result !== null) {
                          var string = Belt_Array.getExn(result, 1);
                          !(string == null);
                        } else {
                          $$break = true;
                        }
                      };
                      
                    })).add("Seq", (function (param) {
                    return forEach((function (prim) {
                                  
                                }), exec("bananas", re));
                  })).add("Seq + map", (function (param) {
                  return forEach((function (prim) {
                                
                              }), matches("bananas", re));
                })).add("Gen", (function (param) {
                return forEach$1((function (prim) {
                              
                            }), exec$1("bananas", re));
              })).add("Internal", (function (param) {
              return forEach$2((function (prim) {
                            
                          }), "bananas", re);
            })).on("cycle", (function ($$event) {
            console.log(String($$event.target));
            
          })).run();
  
}

exports.re = re;
exports.Seq = Seq;
exports.Gen = Gen;
exports.Internal = Internal;
exports.run = run;
/* benchmark Not a pure module */
