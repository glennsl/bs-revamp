'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Benchmark = require("benchmark");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var CamlinternalLazy = require("bs-platform/lib/js/camlinternalLazy.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function $neg$neg(i, j) {
  var r = {
    contents: i
  };
  return function (param) {
    if (r.contents > j) {
      return ;
    }
    var x = r.contents;
    r.contents = r.contents + 1 | 0;
    return x;
  };
}

function map(f, g, param) {
  var x = Curry._1(g, undefined);
  if (x !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(x)));
  }
  
}

function filter(f, g, _param) {
  while(true) {
    var x = Curry._1(g, undefined);
    if (x === undefined) {
      return ;
    }
    var x$1 = Caml_option.valFromOption(x);
    if (Curry._1(f, x$1)) {
      return Caml_option.some(x$1);
    }
    _param = undefined;
    continue ;
  };
}

function flat_map(f, g) {
  var state = {
    contents: /* Start */0
  };
  var aux = function (_param) {
    while(true) {
      var g$prime = state.contents;
      if (typeof g$prime === "number") {
        if (g$prime !== 0) {
          return ;
        }
        next_gen(undefined);
        _param = undefined;
        continue ;
      }
      var res = Curry._1(g$prime._0, undefined);
      if (res !== undefined) {
        return res;
      }
      next_gen(undefined);
      _param = undefined;
      continue ;
    };
  };
  var next_gen = function (param) {
    var x;
    try {
      x = Curry._1(g, undefined);
    }
    catch (e){
      state.contents = /* Stop */1;
      throw e;
    }
    if (x !== undefined) {
      state.contents = /* Cur */{
        _0: Curry._1(f, Caml_option.valFromOption(x))
      };
    } else {
      state.contents = /* Stop */1;
    }
    
  };
  return aux;
}

function fold(f, _acc, g) {
  while(true) {
    var acc = _acc;
    var x = Curry._1(g, undefined);
    if (x === undefined) {
      return acc;
    }
    _acc = Curry._2(f, acc, Caml_option.valFromOption(x));
    continue ;
  };
}

var G = {
  $neg$neg: $neg$neg,
  map: map,
  filter: filter,
  flat_map: flat_map,
  fold: fold
};

var End = /* @__PURE__ */Caml_exceptions.create("C_cube_iterators.G_exn.End");

function $neg$neg$1(i, j) {
  var r = {
    contents: i
  };
  return function (param) {
    if (r.contents > j) {
      throw {
            RE_EXN_ID: End,
            Error: new Error()
          };
    }
    var x = r.contents;
    r.contents = r.contents + 1 | 0;
    return x;
  };
}

function map$1(f, g, param) {
  return Curry._1(f, Curry._1(g, undefined));
}

function filter$1(f, g, _param) {
  while(true) {
    var x = Curry._1(g, undefined);
    if (Curry._1(f, x)) {
      return x;
    }
    _param = undefined;
    continue ;
  };
}

function flat_map$1(f, g) {
  var state = {
    contents: /* Start */0
  };
  var aux = function (_param) {
    while(true) {
      var g$prime = state.contents;
      if (typeof g$prime === "number") {
        if (g$prime !== 0) {
          throw {
                RE_EXN_ID: End,
                Error: new Error()
              };
        }
        next_gen(undefined);
        _param = undefined;
        continue ;
      }
      try {
        return Curry._1(g$prime._0, undefined);
      }
      catch (raw_exn){
        var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === End) {
          next_gen(undefined);
          _param = undefined;
          continue ;
        }
        throw exn;
      }
    };
  };
  var next_gen = function (param) {
    var x;
    try {
      x = Curry._1(g, undefined);
    }
    catch (e){
      state.contents = /* Stop */1;
      throw e;
    }
    state.contents = /* Cur */{
      _0: Curry._1(f, x)
    };
    
  };
  return aux;
}

function fold$1(f, _acc, g) {
  while(true) {
    var acc = _acc;
    var x;
    try {
      x = Curry._1(g, undefined);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === End) {
        return acc;
      }
      throw exn;
    }
    _acc = Curry._2(f, acc, x);
    continue ;
  };
}

var G_exn = {
  End: End,
  $neg$neg: $neg$neg$1,
  map: map$1,
  filter: filter$1,
  flat_map: flat_map$1,
  fold: fold$1
};

var empty_1 = {
  unfold: (function (param, on_done, param$1, param$2) {
      return Curry._1(on_done, undefined);
    })
};

var empty = /* CPS */{
  _0: undefined,
  _1: empty_1
};

function $$return(x) {
  return /* CPS */{
          _0: undefined,
          _1: {
            unfold: (function (param, param$1, param$2, on_yield) {
                return Curry._2(on_yield, undefined, x);
              })
          }
        };
}

function map$2(f, param) {
  var u = param._1;
  return /* CPS */{
          _0: param._0,
          _1: {
            unfold: (function (st, on_done, on_skip, on_yield) {
                return Curry._4(u.unfold, st, on_done, on_skip, (function (st, x) {
                              return Curry._2(on_yield, st, Curry._1(f, x));
                            }));
              })
          }
        };
}

function fold$2(f, acc, param) {
  var u = param._1;
  var loop = function (st, acc) {
    return Curry._4(u.unfold, st, (function (param) {
                  return acc;
                }), (function (st$prime) {
                  return loop(st$prime, acc);
                }), (function (st$prime, x) {
                  var acc$1 = Curry._2(f, acc, x);
                  return loop(st$prime, acc$1);
                }));
  };
  return loop(param._0, acc);
}

function to_list_rev(iter) {
  return fold$2((function (acc, x) {
                return {
                        hd: x,
                        tl: acc
                      };
              }), /* [] */0, iter);
}

function of_list(l) {
  return /* CPS */{
          _0: l,
          _1: {
            unfold: (function (l, on_done, param, on_yield) {
                if (l) {
                  return Curry._2(on_yield, l.tl, l.hd);
                } else {
                  return Curry._1(on_done, undefined);
                }
              })
          }
        };
}

function $neg$neg$2(i, j) {
  return /* CPS */{
          _0: i,
          _1: {
            unfold: (function (i, on_done, param, on_yield) {
                if (i > j) {
                  return Curry._1(on_done, undefined);
                } else {
                  return Curry._2(on_yield, i + 1 | 0, i);
                }
              })
          }
        };
}

function filter$2(f, param) {
  var u1 = param._1;
  return /* CPS */{
          _0: param._0,
          _1: {
            unfold: (function (st, on_done, on_skip, on_yield) {
                return Curry._4(u1.unfold, st, on_done, on_skip, (function (st$prime, x) {
                              if (Curry._1(f, x)) {
                                return Curry._2(on_yield, st$prime, x);
                              } else {
                                return Curry._1(on_skip, st$prime);
                              }
                            }));
              })
          }
        };
}

function flat_map$2(f, param) {
  var u1 = param._1;
  var u = {
    unfold: (function (param, on_done, on_skip, on_yield) {
        var match = param[1];
        var sub2 = match._1;
        var st1 = param[0];
        var done_ = function (param) {
          return Curry._4(u1.unfold, st1, on_done, (function (st1$prime) {
                        return Curry._1(on_skip, [
                                    st1$prime,
                                    empty
                                  ]);
                      }), (function (st1$prime, x1) {
                        return Curry._1(on_skip, [
                                    st1$prime,
                                    Curry._1(f, x1)
                                  ]);
                      }));
        };
        var skip = function (sub_st2) {
          return Curry._1(on_skip, [
                      st1,
                      /* CPS */{
                        _0: sub_st2,
                        _1: sub2
                      }
                    ]);
        };
        var yield_ = function (sub_st2, x2) {
          return Curry._2(on_yield, [
                      st1,
                      /* CPS */{
                        _0: sub_st2,
                        _1: sub2
                      }
                    ], x2);
        };
        return Curry._4(sub2.unfold, match._0, done_, skip, yield_);
      })
  };
  return /* CPS */{
          _0: [
            param._0,
            empty
          ],
          _1: u
        };
}

var CPS = {
  empty: empty,
  $$return: $$return,
  map: map$2,
  fold: fold$2,
  to_list_rev: to_list_rev,
  of_list: of_list,
  $neg$neg: $neg$neg$2,
  filter: filter$2,
  flat_map: flat_map$2
};

var empty$1 = /* CPS */{
  _0: {
    state: undefined,
    unfold: (function (param, on_done, param$1, param$2) {
        return Curry._1(on_done, undefined);
      })
  }
};

function $$return$1(x) {
  return /* CPS */{
          _0: {
            state: undefined,
            unfold: (function (param, param$1, param$2, on_yield) {
                return Curry._2(on_yield, undefined, x);
              })
          }
        };
}

function map$3(f, param) {
  var match = param._0;
  var u = match.unfold;
  return /* CPS */{
          _0: {
            state: match.state,
            unfold: (function (st, on_done, on_skip, on_yield) {
                return Curry._4(u, st, on_done, on_skip, (function (st, x) {
                              return Curry._2(on_yield, st, Curry._1(f, x));
                            }));
              })
          }
        };
}

function fold$3(f, acc, param) {
  var match = param._0;
  var u = match.unfold;
  var loop = function (st, acc) {
    return Curry._4(u, st, (function (param) {
                  return acc;
                }), (function (st$prime) {
                  return loop(st$prime, acc);
                }), (function (st$prime, x) {
                  var acc$1 = Curry._2(f, acc, x);
                  return loop(st$prime, acc$1);
                }));
  };
  return loop(match.state, acc);
}

function to_list_rev$1(iter) {
  return fold$3((function (acc, x) {
                return {
                        hd: x,
                        tl: acc
                      };
              }), /* [] */0, iter);
}

function of_list$1(l) {
  return /* CPS */{
          _0: {
            state: l,
            unfold: (function (l, on_done, param, on_yield) {
                if (l) {
                  return Curry._2(on_yield, l.tl, l.hd);
                } else {
                  return Curry._1(on_done, undefined);
                }
              })
          }
        };
}

function $neg$neg$3(i, j) {
  return /* CPS */{
          _0: {
            state: i,
            unfold: (function (i, on_done, param, on_yield) {
                if (i > j) {
                  return Curry._1(on_done, undefined);
                } else {
                  return Curry._2(on_yield, i + 1 | 0, i);
                }
              })
          }
        };
}

function filter$3(f, param) {
  var match = param._0;
  var u1 = match.unfold;
  return /* CPS */{
          _0: {
            state: match.state,
            unfold: (function (st, on_done, on_skip, on_yield) {
                return Curry._4(u1, st, on_done, on_skip, (function (st$prime, x) {
                              if (Curry._1(f, x)) {
                                return Curry._2(on_yield, st$prime, x);
                              } else {
                                return Curry._1(on_skip, st$prime);
                              }
                            }));
              })
          }
        };
}

function flat_map$3(f, param) {
  var match = param._0;
  var u1 = match.unfold;
  var u = function (param, on_done, on_skip, on_yield) {
    var match = param[1]._0;
    var sub2 = match.unfold;
    var st1 = param[0];
    var done_ = function (param) {
      return Curry._4(u1, st1, on_done, (function (st1$prime) {
                    return Curry._1(on_skip, [
                                st1$prime,
                                empty$1
                              ]);
                  }), (function (st1$prime, x1) {
                    return Curry._1(on_skip, [
                                st1$prime,
                                Curry._1(f, x1)
                              ]);
                  }));
    };
    var skip = function (sub_st2) {
      return Curry._1(on_skip, [
                  st1,
                  /* CPS */{
                    _0: {
                      state: sub_st2,
                      unfold: sub2
                    }
                  }
                ]);
    };
    var yield_ = function (sub_st2, x2) {
      return Curry._2(on_yield, [
                  st1,
                  /* CPS */{
                    _0: {
                      state: sub_st2,
                      unfold: sub2
                    }
                  }
                ], x2);
    };
    return Curry._4(sub2, match.state, done_, skip, yield_);
  };
  return /* CPS */{
          _0: {
            state: [
              match.state,
              empty$1
            ],
            unfold: u
          }
        };
}

var CPS2 = {
  empty: empty$1,
  $$return: $$return$1,
  map: map$3,
  fold: fold$3,
  to_list_rev: to_list_rev$1,
  of_list: of_list$1,
  $neg$neg: $neg$neg$3,
  filter: filter$3,
  flat_map: flat_map$3
};

function map$4(param, m) {
  var match = param._0;
  var fold = match.fold;
  var fold$1 = function (s, init, f) {
    return Curry._3(fold, s, init, (function (b, a) {
                  return Curry._2(f, b, Curry._1(m, a));
                }));
  };
  return /* Fold */{
          _0: {
            fold: fold$1,
            s: match.s
          }
        };
}

function filter$4(param, p) {
  var match = param._0;
  var fold = match.fold;
  var fold$1 = function (s, init, f) {
    return Curry._3(fold, s, init, (function (b, a) {
                  if (Curry._1(p, a)) {
                    return Curry._2(f, b, a);
                  } else {
                    return b;
                  }
                }));
  };
  return /* Fold */{
          _0: {
            fold: fold$1,
            s: match.s
          }
        };
}

function fold$4(param) {
  var match = param._0;
  return Curry._1(match.fold, match.s);
}

function flat_map$4(param, m) {
  var match = param._0;
  var s1 = match.s;
  var fold1 = match.fold;
  var fold = function (_s2, init, f) {
    return Curry._3(fold1, s1, init, (function (acc, x1) {
                  var match = Curry._1(m, x1);
                  var match$1 = match._0;
                  return Curry._3(match$1.fold, match$1.s, acc, f);
                }));
  };
  return /* Fold */{
          _0: {
            fold: fold,
            s: s1
          }
        };
}

function $neg$neg$4(i, j) {
  var fold = function (_s, _init, f) {
    while(true) {
      var init = _init;
      var s = _s;
      if (s > j) {
        return init;
      }
      _init = Curry._2(f, init, s);
      _s = s + 1 | 0;
      continue ;
    };
  };
  return /* Fold */{
          _0: {
            fold: fold,
            s: i
          }
        };
}

var Fold = {
  map: map$4,
  filter: filter$4,
  fold: fold$4,
  flat_map: flat_map$4,
  $neg$neg: $neg$neg$4
};

function $neg$neg$5(i, j) {
  return {
          LAZY_DONE: false,
          VAL: (function () {
              if (i > j) {
                return /* Nil */0;
              } else {
                return /* Cons */{
                        _0: i,
                        _1: $neg$neg$5(i + 1 | 0, j)
                      };
              }
            })
        };
}

function map$5(f, l) {
  return {
          LAZY_DONE: false,
          VAL: (function () {
              var match = CamlinternalLazy.force(l);
              if (match) {
                return /* Cons */{
                        _0: Curry._1(f, match._0),
                        _1: map$5(f, match._1)
                      };
              } else {
                return /* Nil */0;
              }
            })
        };
}

function filter$5(f, l) {
  var aux = function (f, _l) {
    while(true) {
      var l = _l;
      var match = CamlinternalLazy.force(l);
      if (!match) {
        return /* Nil */0;
      }
      var tl = match._1;
      var x = match._0;
      if (Curry._1(f, x)) {
        return /* Cons */{
                _0: x,
                _1: {
                  LAZY_DONE: false,
                  VAL: (function(tl){
                  return function () {
                    return aux(f, tl);
                  }
                  }(tl))
                }
              };
      }
      _l = tl;
      continue ;
    };
  };
  return {
          LAZY_DONE: false,
          VAL: (function () {
              return aux(f, l);
            })
        };
}

function append(a, b) {
  return {
          LAZY_DONE: false,
          VAL: (function () {
              var match = CamlinternalLazy.force(a);
              if (match) {
                return /* Cons */{
                        _0: match._0,
                        _1: append(match._1, b)
                      };
              } else {
                return CamlinternalLazy.force(b);
              }
            })
        };
}

function flat_map$5(f, l) {
  return {
          LAZY_DONE: false,
          VAL: (function () {
              var match = CamlinternalLazy.force(l);
              if (match) {
                return CamlinternalLazy.force(append(Curry._1(f, match._0), flat_map$5(f, match._1)));
              } else {
                return /* Nil */0;
              }
            })
        };
}

function fold$5(f, _acc, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    var match = CamlinternalLazy.force(param);
    if (!match) {
      return acc;
    }
    _param = match._1;
    _acc = Curry._2(f, acc, match._0);
    continue ;
  };
}

var LList = {
  $neg$neg: $neg$neg$5,
  map: map$5,
  filter: filter$5,
  append: append,
  flat_map: flat_map$5,
  fold: fold$5
};

function $neg$neg$6(i, j, param) {
  if (i > j) {
    return /* Nil */0;
  }
  var partial_arg = i + 1 | 0;
  return /* Cons */{
          _0: i,
          _1: (function (param) {
              return $neg$neg$6(partial_arg, j, param);
            })
        };
}

function map$6(f, l, param) {
  var match = Curry._1(l, undefined);
  if (!match) {
    return /* Nil */0;
  }
  var tail = match._1;
  return /* Cons */{
          _0: Curry._1(f, match._0),
          _1: (function (param) {
              return map$6(f, tail, param);
            })
        };
}

function filter$6(f, l) {
  var aux = function (f, _l, _param) {
    while(true) {
      var l = _l;
      var match = Curry._1(l, undefined);
      if (!match) {
        return /* Nil */0;
      }
      var tl = match._1;
      var x = match._0;
      if (Curry._1(f, x)) {
        return /* Cons */{
                _0: x,
                _1: (function(tl){
                return function (param) {
                  return aux(f, tl, param);
                }
                }(tl))
              };
      }
      _param = undefined;
      _l = tl;
      continue ;
    };
  };
  return function (param) {
    return aux(f, l, param);
  };
}

function append$1(a, b, param) {
  var match = Curry._1(a, undefined);
  if (!match) {
    return Curry._1(b, undefined);
  }
  var tl = match._1;
  return /* Cons */{
          _0: match._0,
          _1: (function (param) {
              return append$1(tl, b, param);
            })
        };
}

function flat_map$6(f, l, param) {
  var match = Curry._1(l, undefined);
  if (!match) {
    return /* Nil */0;
  }
  var tl = match._1;
  var partial_arg = Curry._1(f, match._0);
  var param$1;
  return append$1(partial_arg, (function (param) {
                return flat_map$6(f, tl, param);
              }), param$1);
}

function fold$6(f, _acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    var match = Curry._1(l, undefined);
    if (!match) {
      return acc;
    }
    _l = match._1;
    _acc = Curry._2(f, acc, match._0);
    continue ;
  };
}

var UList = {
  $neg$neg: $neg$neg$6,
  map: map$6,
  filter: filter$6,
  append: append$1,
  flat_map: flat_map$6,
  fold: fold$6
};

var empty$2 = /* T */{
  _0: {
    state: undefined,
    next: (function (param) {
        
      })
  }
};

function $neg$neg$7(i, j) {
  var next = function (i) {
    if (i > j) {
      return ;
    } else {
      return [
              i,
              i + 1 | 0
            ];
    }
  };
  return /* T */{
          _0: {
            state: i,
            next: next
          }
        };
}

function map$7(f, param) {
  var match = param._0;
  var next = match.next;
  var next$prime = function (s) {
    var match = Curry._1(next, s);
    if (match !== undefined) {
      return [
              Curry._1(f, match[0]),
              match[1]
            ];
    }
    
  };
  return /* T */{
          _0: {
            state: match.state,
            next: next$prime
          }
        };
}

function filter$7(f, param) {
  var match = param._0;
  var next = match.next;
  var next$prime = function (_s) {
    while(true) {
      var s = _s;
      var res = Curry._1(next, s);
      if (res === undefined) {
        return ;
      }
      if (Curry._1(f, res[0])) {
        return res;
      }
      _s = res[1];
      continue ;
    };
  };
  return /* T */{
          _0: {
            state: match.state,
            next: next$prime
          }
        };
}

function flat_map$7(f, param) {
  var match = param._0;
  var next = match.next;
  var next$prime = function (_param) {
    while(true) {
      var param = _param;
      var match = param._0;
      var sub_next = match.sub_next;
      var top = match.top;
      var match$1 = Curry._1(sub_next, match.sub);
      if (match$1 !== undefined) {
        return [
                match$1[0],
                /* FMS */{
                  _0: {
                    top: top,
                    sub: match$1[1],
                    sub_next: sub_next
                  }
                }
              ];
      }
      var match$2 = Curry._1(next, top);
      if (match$2 === undefined) {
        return ;
      }
      var match$3 = Curry._1(f, match$2[0]);
      var match$4 = match$3._0;
      _param = /* FMS */{
        _0: {
          top: match$2[1],
          sub: match$4.state,
          sub_next: match$4.next
        }
      };
      continue ;
    };
  };
  return /* T */{
          _0: {
            state: /* FMS */{
              _0: {
                top: match.state,
                sub: undefined,
                sub_next: (function (param) {
                    
                  })
              }
            },
            next: next$prime
          }
        };
}

function fold$7(f, acc, param) {
  var match = param._0;
  var next = match.next;
  var _acc = acc;
  var _state = match.state;
  while(true) {
    var state = _state;
    var acc$1 = _acc;
    var match$1 = Curry._1(next, state);
    if (match$1 === undefined) {
      return acc$1;
    }
    var acc$2 = Curry._2(f, acc$1, match$1[0]);
    _state = match$1[1];
    _acc = acc$2;
    continue ;
  };
}

var UnCons = {
  empty: empty$2,
  $neg$neg: $neg$neg$7,
  map: map$7,
  filter: filter$7,
  flat_map: flat_map$7,
  fold: fold$7
};

function map$8(f, gen) {
  var stop = {
    contents: false
  };
  return function (param) {
    if (stop.contents) {
      return ;
    }
    var x = Curry._1(gen, undefined);
    if (x !== undefined) {
      return Caml_option.some(Curry._1(f, Caml_option.valFromOption(x)));
    } else {
      stop.contents = true;
      return ;
    }
  };
}

function filter$8(p, gen) {
  var next = function (_param) {
    while(true) {
      var res = Curry._1(gen, undefined);
      if (res === undefined) {
        return ;
      }
      if (Curry._1(p, Caml_option.valFromOption(res))) {
        return res;
      }
      _param = undefined;
      continue ;
    };
  };
  return next;
}

var RunState = {};

function flat_map$8(f, next_elem) {
  var state = {
    contents: /* Init */0
  };
  var next = function (param) {
    var gen = state.contents;
    if (typeof gen === "number") {
      if (gen !== 0) {
        return ;
      } else {
        return get_next_gen(undefined);
      }
    }
    var x = Curry._1(gen._0, undefined);
    if (x !== undefined) {
      return x;
    } else {
      return get_next_gen(undefined);
    }
  };
  var get_next_gen = function (param) {
    var x = Curry._1(next_elem, undefined);
    if (x !== undefined) {
      try {
        state.contents = /* Run */{
          _0: Curry._1(f, Caml_option.valFromOption(x))
        };
      }
      catch (e){
        state.contents = /* Stop */1;
        throw e;
      }
      return next(undefined);
    }
    state.contents = /* Stop */1;
    
  };
  return next;
}

function fold$8(f, _acc, gen) {
  while(true) {
    var acc = _acc;
    var x = Curry._1(gen, undefined);
    if (x === undefined) {
      return acc;
    }
    _acc = Curry._2(f, acc, Caml_option.valFromOption(x));
    continue ;
  };
}

function int_range(stepOpt, i, j) {
  var step = stepOpt !== undefined ? stepOpt : 1;
  if (step === 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Gen.int_range",
          Error: new Error()
        };
  }
  var $great = step > 0 ? Caml_obj.caml_greaterthan : Caml_obj.caml_lessthan;
  var r = {
    contents: i
  };
  return function (param) {
    var x = r.contents;
    if (Curry._2($great, x, j)) {
      return ;
    } else {
      r.contents = r.contents + step | 0;
      return x;
    }
  };
}

var Gen = {
  map: map$8,
  filter: filter$8,
  RunState: RunState,
  flat_map: flat_map$8,
  fold: fold$8,
  int_range: int_range,
  $neg$neg: int_range
};

function map$9(f, seq, k) {
  return Curry._1(seq, (function (x) {
                return Curry._1(k, Curry._1(f, x));
              }));
}

function filter$9(p, seq, k) {
  return Curry._1(seq, (function (x) {
                if (Curry._1(p, x)) {
                  return Curry._1(k, x);
                }
                
              }));
}

function flat_map$9(f, seq, k) {
  return Curry._1(seq, (function (x) {
                return Curry._2(f, x, k);
              }));
}

function fold$9(f, init, seq) {
  var r = {
    contents: init
  };
  Curry._1(seq, (function (elt) {
          r.contents = Curry._2(f, r.contents, elt);
          
        }));
  return r.contents;
}

function int_range$1(start, stop, k) {
  for(var i = start; i <= stop; ++i){
    Curry._1(k, i);
  }
  
}

function $neg$neg$8(i, j) {
  return function (param) {
    return int_range$1(i, j, param);
  };
}

var Sequence = {
  map: map$9,
  filter: filter$9,
  flat_map: flat_map$9,
  fold: fold$9,
  int_range: int_range$1,
  $neg$neg: $neg$neg$8
};

function flat_map$10(f, l) {
  var _l = l;
  var _kont = function (l) {
    return l;
  };
  while(true) {
    var kont = _kont;
    var l$1 = _l;
    if (!l$1) {
      return Curry._1(kont, /* [] */0);
    }
    var y = Curry._1(f, l$1.hd);
    var kont$prime = (function(kont,y){
    return function kont$prime(tail) {
      if (!y) {
        return Curry._1(kont, tail);
      }
      var match = y.tl;
      var x = y.hd;
      if (match) {
        if (match.tl) {
          return Curry._1(kont, List.append(y, tail));
        } else {
          return Curry._1(kont, {
                      hd: x,
                      tl: {
                        hd: match.hd,
                        tl: tail
                      }
                    });
        }
      } else {
        return Curry._1(kont, {
                    hd: x,
                    tl: tail
                  });
      }
    }
    }(kont,y));
    _kont = kont$prime;
    _l = l$1.tl;
    continue ;
  };
}

function range(i, j) {
  if (i <= j) {
    var _j = j;
    var _acc = /* [] */0;
    while(true) {
      var acc = _acc;
      var j$1 = _j;
      if (i === j$1) {
        return {
                hd: i,
                tl: acc
              };
      }
      _acc = {
        hd: j$1,
        tl: acc
      };
      _j = j$1 - 1 | 0;
      continue ;
    };
  } else {
    var _j$1 = j;
    var _acc$1 = /* [] */0;
    while(true) {
      var acc$1 = _acc$1;
      var j$2 = _j$1;
      if (i === j$2) {
        return {
                hd: i,
                tl: acc$1
              };
      }
      _acc$1 = {
        hd: j$2,
        tl: acc$1
      };
      _j$1 = j$2 + 1 | 0;
      continue ;
    };
  }
}

var CCList = {
  length: List.length,
  compare_lengths: List.compare_lengths,
  compare_length_with: List.compare_length_with,
  cons: List.cons,
  hd: List.hd,
  tl: List.tl,
  nth: List.nth,
  nth_opt: List.nth_opt,
  rev: List.rev,
  init: List.init,
  append: List.append,
  rev_append: List.rev_append,
  concat: List.concat,
  flatten: List.flatten,
  iter: List.iter,
  iteri: List.iteri,
  map: List.map,
  mapi: List.mapi,
  rev_map: List.rev_map,
  fold_left: List.fold_left,
  fold_right: List.fold_right,
  iter2: List.iter2,
  map2: List.map2,
  rev_map2: List.rev_map2,
  fold_left2: List.fold_left2,
  fold_right2: List.fold_right2,
  for_all: List.for_all,
  exists: List.exists,
  for_all2: List.for_all2,
  exists2: List.exists2,
  mem: List.mem,
  memq: List.memq,
  find: List.find,
  find_opt: List.find_opt,
  filter: List.filter,
  find_all: List.find_all,
  partition: List.partition,
  assoc: List.assoc,
  assoc_opt: List.assoc_opt,
  assq: List.assq,
  assq_opt: List.assq_opt,
  mem_assoc: List.mem_assoc,
  mem_assq: List.mem_assq,
  remove_assoc: List.remove_assoc,
  remove_assq: List.remove_assq,
  split: List.split,
  combine: List.combine,
  sort: List.sort,
  stable_sort: List.stable_sort,
  fast_sort: List.fast_sort,
  sort_uniq: List.sort_uniq,
  merge: List.merge,
  flat_map: flat_map$10,
  range: range,
  $neg$neg: range
};

var Step = {};

function empty_1$1(param) {
  return /* Done */0;
}

var empty$3 = /* Sequence */{
  _0: undefined,
  _1: empty_1$1
};

function unfold_step(init, f) {
  return /* Sequence */{
          _0: init,
          _1: f
        };
}

function map$10(t, f) {
  var next = t._1;
  return /* Sequence */{
          _0: t._0,
          _1: (function (seed) {
              var s = Curry._1(next, seed);
              if (typeof s === "number") {
                return /* Done */0;
              } else if (s.TAG === /* Skip */0) {
                return {
                        TAG: /* Skip */0,
                        _0: s._0
                      };
              } else {
                return {
                        TAG: /* Yield */1,
                        _0: Curry._1(f, s._0),
                        _1: s._1
                      };
              }
            })
        };
}

function filter$10(t, f) {
  var next = t._1;
  return /* Sequence */{
          _0: t._0,
          _1: (function (seed) {
              var s = Curry._1(next, seed);
              if (typeof s === "number") {
                return /* Done */0;
              }
              if (s.TAG === /* Skip */0) {
                return {
                        TAG: /* Skip */0,
                        _0: s._0
                      };
              }
              var s$1 = s._1;
              var a = s._0;
              if (Curry._1(f, a)) {
                return {
                        TAG: /* Yield */1,
                        _0: a,
                        _1: s$1
                      };
              } else {
                return {
                        TAG: /* Skip */0,
                        _0: s$1
                      };
              }
            })
        };
}

function bind(t, f) {
  return /* Sequence */{
          _0: [
            empty$3,
            t
          ],
          _1: (function (param) {
              var rest = param[1];
              var match = param[0];
              var next = match._1;
              var s = Curry._1(next, match._0);
              if (typeof s !== "number") {
                if (s.TAG === /* Skip */0) {
                  return {
                          TAG: /* Skip */0,
                          _0: [
                            /* Sequence */{
                              _0: s._0,
                              _1: next
                            },
                            rest
                          ]
                        };
                } else {
                  return {
                          TAG: /* Yield */1,
                          _0: s._0,
                          _1: [
                            /* Sequence */{
                              _0: s._1,
                              _1: next
                            },
                            rest
                          ]
                        };
                }
              }
              var next$1 = rest._1;
              var s$1 = Curry._1(next$1, rest._0);
              if (typeof s$1 === "number") {
                return /* Done */0;
              } else if (s$1.TAG === /* Skip */0) {
                return {
                        TAG: /* Skip */0,
                        _0: [
                          empty$3,
                          /* Sequence */{
                            _0: s$1._0,
                            _1: next$1
                          }
                        ]
                      };
              } else {
                return {
                        TAG: /* Skip */0,
                        _0: [
                          Curry._1(f, s$1._0),
                          /* Sequence */{
                            _0: s$1._1,
                            _1: next$1
                          }
                        ]
                      };
              }
            })
        };
}

var concat_map = bind;

function fold$10(t, init, f) {
  var _seed = t._0;
  var _v = init;
  var next = t._1;
  while(true) {
    var v = _v;
    var seed = _seed;
    var s = Curry._1(next, seed);
    if (typeof s === "number") {
      return v;
    }
    if (s.TAG === /* Skip */0) {
      _seed = s._0;
      continue ;
    }
    _v = Curry._2(f, v, s._0);
    _seed = s._1;
    continue ;
  };
}

function range$1(strideOpt, startOpt, stopOpt, start_v, stop_v) {
  var stride = strideOpt !== undefined ? strideOpt : 1;
  var start = startOpt !== undefined ? startOpt : "inclusive";
  var stop = stopOpt !== undefined ? stopOpt : "exclusive";
  var step = stop === "inclusive" ? (
      stride >= 0 ? (function (i) {
            if (i > stop_v) {
              return /* Done */0;
            } else {
              return {
                      TAG: /* Yield */1,
                      _0: i,
                      _1: i + stride | 0
                    };
            }
          }) : (function (i) {
            if (i < stop_v) {
              return /* Done */0;
            } else {
              return {
                      TAG: /* Yield */1,
                      _0: i,
                      _1: i + stride | 0
                    };
            }
          })
    ) : (
      stride >= 0 ? (function (i) {
            if (i >= stop_v) {
              return /* Done */0;
            } else {
              return {
                      TAG: /* Yield */1,
                      _0: i,
                      _1: i + stride | 0
                    };
            }
          }) : (function (i) {
            if (i <= stop_v) {
              return /* Done */0;
            } else {
              return {
                      TAG: /* Yield */1,
                      _0: i,
                      _1: i + stride | 0
                    };
            }
          })
    );
  var init = start === "inclusive" ? start_v : start_v + stride | 0;
  return /* Sequence */{
          _0: init,
          _1: step
        };
}

var Core_kernel_sequence = {
  Step: Step,
  empty: empty$3,
  unfold_step: unfold_step,
  map: map$10,
  filter: filter$10,
  bind: bind,
  concat_map: concat_map,
  fold: fold$10,
  range: range$1
};

function f_gen(param) {
  return fold$8((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$8((function (x) {
                    return int_range(undefined, x, x + 30 | 0);
                  }), filter$8((function (x) {
                        return x % 2 === 0;
                      }), map$8((function (x) {
                            return x + 1 | 0;
                          }), int_range(undefined, 1, 100000)))));
}

function f_g(param) {
  var partial_arg = $neg$neg(1, 100000);
  var partial_arg$1 = function (param) {
    return map((function (x) {
                  return x + 1 | 0;
                }), partial_arg, param);
  };
  return fold((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map((function (x) {
                    return $neg$neg(x, x + 30 | 0);
                  }), (function (param) {
                    return filter((function (x) {
                                  return x % 2 === 0;
                                }), partial_arg$1, param);
                  })));
}

function f_g_exn(param) {
  var partial_arg = $neg$neg$1(1, 100000);
  var partial_arg$1 = function (param) {
    return Curry._1(partial_arg, undefined) + 1 | 0;
  };
  return fold$1((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$1((function (x) {
                    return $neg$neg$1(x, x + 30 | 0);
                  }), (function (param) {
                    return filter$1((function (x) {
                                  return x % 2 === 0;
                                }), partial_arg$1, param);
                  })));
}

function f_seq(param) {
  return fold$9((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, (function (param) {
                var f = function (x) {
                  var partial_arg = x + 30 | 0;
                  return function (param) {
                    return int_range$1(x, partial_arg, param);
                  };
                };
                var param$1 = function (x) {
                  return Curry._2(f, x, param);
                };
                return filter$9((function (x) {
                              return x % 2 === 0;
                            }), (function (param) {
                              var f = function (x) {
                                return x + 1 | 0;
                              };
                              return int_range$1(1, 100000, (function (x) {
                                            return Curry._1(param, Curry._1(f, x));
                                          }));
                            }), param$1);
              }));
}

function f_cps(param) {
  return fold$2((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$2((function (x) {
                    return $neg$neg$2(x, x + 30 | 0);
                  }), filter$2((function (x) {
                        return x % 2 === 0;
                      }), map$2((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$2(1, 100000)))));
}

function f_cps2(param) {
  return fold$3((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$3((function (x) {
                    return $neg$neg$3(x, x + 30 | 0);
                  }), filter$3((function (x) {
                        return x % 2 === 0;
                      }), map$3((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$3(1, 100000)))));
}

function f_fold(param) {
  var arg = function (prim, prim$1) {
    return prim + prim$1 | 0;
  };
  var arg$1 = function (x) {
    return $neg$neg$4(x, x + 30 | 0);
  };
  var arg$2 = function (i) {
    return i % 2 === 0;
  };
  var arg$3 = function (x) {
    return x + 1 | 0;
  };
  var param$1 = (function (param) {
        return flat_map$4(param, arg$1);
      })((function (param) {
            return filter$4(param, arg$2);
          })((function (param) {
                return map$4(param, arg$3);
              })($neg$neg$4(1, 100000))));
  return Curry._2(fold$4(param$1), 0, arg);
}

function f_list(param) {
  return List.fold_left((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$10((function (x) {
                    return range(x, x + 30 | 0);
                  }), List.filter(function (x) {
                        return x % 2 === 0;
                      })(List.map((function (x) {
                            return x + 1 | 0;
                          }), range(1, 100000)))));
}

function f_llist(param) {
  return fold$5((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$5((function (x) {
                    return $neg$neg$5(x, x + 30 | 0);
                  }), filter$5((function (x) {
                        return x % 2 === 0;
                      }), map$5((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$5(1, 100000)))));
}

function f_ulist(param) {
  var partial_arg = filter$6((function (x) {
          return x % 2 === 0;
        }), (function (param) {
          return map$6((function (x) {
                        return x + 1 | 0;
                      }), (function (param) {
                        return $neg$neg$6(1, 100000, param);
                      }), param);
        }));
  return fold$6((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, (function (param) {
                return flat_map$6((function (x) {
                              var partial_arg = x + 30 | 0;
                              return function (param) {
                                return $neg$neg$6(x, partial_arg, param);
                              };
                            }), partial_arg, param);
              }));
}

function f_uncons(param) {
  return fold$7((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, flat_map$7((function (x) {
                    return $neg$neg$7(x, x + 30 | 0);
                  }), filter$7((function (x) {
                        return x % 2 === 0;
                      }), map$7((function (x) {
                            return x + 1 | 0;
                          }), $neg$neg$7(1, 100000)))));
}

function f_core(param) {
  var arg = function (prim, prim$1) {
    return prim + prim$1 | 0;
  };
  var arg$1 = function (x) {
    return range$1(undefined, "inclusive", "inclusive", x, x + 30 | 0);
  };
  var arg$2 = function (x) {
    return x % 2 === 0;
  };
  var arg$3 = function (x) {
    return x + 1 | 0;
  };
  var param$1 = (function (param) {
        return bind(param, arg$1);
      })((function (param) {
            return filter$10(param, arg$2);
          })((function (param) {
                return map$10(param, arg$3);
              })(range$1(undefined, "inclusive", "inclusive", 1, 100000))));
  return fold$10(param$1, 0, arg);
}

if (f_g(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          776,
          0
        ],
        Error: new Error()
      };
}

if (f_g_exn(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          777,
          0
        ],
        Error: new Error()
      };
}

if (f_seq(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          778,
          0
        ],
        Error: new Error()
      };
}

if (f_core(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          779,
          0
        ],
        Error: new Error()
      };
}

if (f_fold(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          780,
          0
        ],
        Error: new Error()
      };
}

if (f_uncons(undefined) !== f_gen(undefined)) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "c_cube_iterators.ml",
          781,
          0
        ],
        Error: new Error()
      };
}

new Benchmark.Suite("tags").suite("Gen", (function (param) {
                                  f_gen(undefined);
                                  
                                })).suite("g", (function (param) {
                                f_g(undefined);
                                
                              })).suite("g_exn", (function (param) {
                              f_g_exn(undefined);
                              
                            })).suite("core.sequence", (function (param) {
                            f_core(undefined);
                            
                          })).suite("cps", (function (param) {
                          f_cps(undefined);
                          
                        })).suite("cps2", (function (param) {
                        f_cps2(undefined);
                        
                      })).suite("fold", (function (param) {
                      f_fold(undefined);
                      
                    })).suite("sequence", (function (param) {
                    f_seq(undefined);
                    
                  })).suite("list", (function (param) {
                  f_list(undefined);
                  
                })).suite("lazy_list", (function (param) {
                f_llist(undefined);
                
              })).suite("ulist", (function (param) {
              f_ulist(undefined);
              
            })).suite("uncons", (function (param) {
            f_uncons(undefined);
            
          })).suite("cycle", (function ($$event) {
          console.log(String($$event.target));
          
        })).suite();

exports.G = G;
exports.G_exn = G_exn;
exports.CPS = CPS;
exports.CPS2 = CPS2;
exports.Fold = Fold;
exports.LList = LList;
exports.UList = UList;
exports.UnCons = UnCons;
exports.Gen = Gen;
exports.Sequence = Sequence;
exports.CCList = CCList;
exports.Core_kernel_sequence = Core_kernel_sequence;
exports.f_gen = f_gen;
exports.f_g = f_g;
exports.f_g_exn = f_g_exn;
exports.f_seq = f_seq;
exports.f_cps = f_cps;
exports.f_cps2 = f_cps2;
exports.f_fold = f_fold;
exports.f_list = f_list;
exports.f_llist = f_llist;
exports.f_ulist = f_ulist;
exports.f_uncons = f_uncons;
exports.f_core = f_core;
/*  Not a pure module */
