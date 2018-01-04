'use strict';

var Jest                    = require("bs-jest/lib/js/src/jest.js");
var Rebase                  = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Revamp                  = require("../src/Revamp.js");
var Js_primitive            = require("bs-platform/lib/js/js_primitive.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

describe("Compiled", (function () {
        Jest.test("make - flags", (function () {
                var result = Rebase.List[/* fromSeq */13](Revamp.Compiled[/* matches */2](Revamp.Compiled[/* make */0](/* Some */[/* :: */[
                                /* IgnoreCase */0,
                                /* :: */[
                                  /* Unicode */2,
                                  /* :: */[
                                    /* MultiLine */1,
                                    /* [] */0
                                  ]
                                ]
                              ]], "o\\w+ møøse$"), "\n        One Møøse\n        Two Møøse\n      "));
                return Jest.Expect[/* toEqual */12](/* :: */[
                            "One Møøse",
                            /* [] */0
                          ], Jest.Expect[/* expect */0](result));
              }));
        Jest.test("make - no flags", (function () {
                var result = Rebase.List[/* fromSeq */13](Revamp.Compiled[/* matches */2](Revamp.Compiled[/* make */0](/* None */0, "\\w+ Møøse"), "\n        One Møøse\n        Two Møøse\n      "));
                return Jest.Expect[/* toEqual */12](/* :: */[
                            "One Møøse",
                            /* :: */[
                              "Two Møøse",
                              /* [] */0
                            ]
                          ], Jest.Expect[/* expect */0](result));
              }));
        Jest.test("test - raise Invalid_argument if given non-global regexp object", (function () {
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.invalid_argument,
                            ""
                          ], Jest.Expect[/* expect */0]((function () {
                                  return Revamp.Compiled[/* test */5]((/foo/), "");
                                })));
              }));
        Jest.test("test - raise Invalid_argument if given partially used global regexp object", (function () {
                var re = (/o/g);
                Js_primitive.null_to_opt(re.exec("foo"));
                return Jest.Expect[/* toThrowException */20]([
                            Caml_builtin_exceptions.invalid_argument,
                            ""
                          ], Jest.Expect[/* expect */0]((function () {
                                  return Revamp.Compiled[/* test */5](re, "");
                                })));
              }));
        var re = Revamp.Compiled[/* make */0](/* None */0, "(an)+([^d])");
        describe("test", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toBe */2](/* true */1, Jest.Expect[/* expect */0](Revamp.Compiled[/* test */5](re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toBe */2](/* false */0, Jest.Expect[/* expect */0](Revamp.Compiled[/* test */5](re, "apples and pears")));
                            }));
              }));
        describe("count", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toBe */2](2, Jest.Expect[/* expect */0](Revamp.Compiled[/* count */8](re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](Revamp.Compiled[/* count */8](re, "apples and pears")));
                            }));
              }));
        describe("find", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* Some */["ang"], Jest.Expect[/* expect */0](Revamp.Compiled[/* find */6](re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toBe */2](/* None */0, Jest.Expect[/* expect */0](Revamp.Compiled[/* find */6](re, "apples and pears")));
                            }));
              }));
        describe("findIndex", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* Some */[/* tuple */[
                                      1,
                                      4
                                    ]], Jest.Expect[/* expect */0](Revamp.Compiled[/* findIndex */7](re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toBe */2](/* None */0, Jest.Expect[/* expect */0](Revamp.Compiled[/* findIndex */7](re, "apples and pears")));
                            }));
              }));
        describe("replace", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12]("mfooos and bfoos", Jest.Expect[/* expect */0](Revamp.Compiled[/* replace */9](re, (function () {
                                              return "foo";
                                            }), "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toEqual */12]("apples and pears", Jest.Expect[/* expect */0](Revamp.Compiled[/* replace */9](re, (function () {
                                                    return "foo";
                                                  }), "apples and pears")));
                            }));
              }));
        describe("replaceByString", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12]("m[an]os and b[an]s", Jest.Expect[/* expect */0](Revamp.Compiled[/* replaceByString */10](re, "[$1]", "mangos and bananas")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toEqual */12]("apples and pears", Jest.Expect[/* expect */0](Revamp.Compiled[/* replaceByString */10](re, "[$1]", "apples and pears")));
                            }));
              }));
        describe("split", (function () {
                var re = Revamp.Compiled[/* make */0](/* None */0, " |!");
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* array */[
                                    "bang",
                                    "bang",
                                    "bananabatman",
                                    ""
                                  ], Jest.Expect[/* expect */0](Revamp.Compiled[/* split */11](re, "bang bang bananabatman!")));
                      }));
                return Jest.test("no match", (function () {
                              return Jest.Expect[/* toEqual */12](/* array */["apples"], Jest.Expect[/* expect */0](Revamp.Compiled[/* split */11](re, "apples")));
                            }));
              }));
        return /* () */0;
      }));

describe("Match", (function () {
        Jest.test("matches", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            /* array */[
                              "an",
                              "n"
                            ],
                            /* :: */[
                              /* array */[
                                "an",
                                "n"
                              ],
                              /* :: */[
                                /* array */[
                                  "a",
                                  ""
                                ],
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Rebase.List[/* map */0]((function (prim) {
                                      return prim.slice();
                                    }), Rebase.List[/* map */0](Revamp.Match[/* matches */0], Rebase.List[/* fromSeq */13](Revamp.exec("a(n?)", /* None */0, "banana"))))));
              }));
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            "an",
                            /* :: */[
                              "an",
                              /* :: */[
                                "a",
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Rebase.List[/* map */0](Revamp.Match[/* match_ */1], Rebase.List[/* fromSeq */13](Revamp.exec("a(n?)", /* None */0, "banana")))));
              }));
        Jest.test("captures", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            /* :: */[
                              /* Some */["n"],
                              /* [] */0
                            ],
                            /* :: */[
                              /* :: */[
                                /* Some */["n"],
                                /* [] */0
                              ],
                              /* :: */[
                                /* :: */[
                                  /* Some */[""],
                                  /* [] */0
                                ],
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Rebase.List[/* map */0](Revamp.Match[/* captures */2], Rebase.List[/* fromSeq */13](Revamp.exec("a(n?)", /* None */0, "banana")))));
              }));
        Jest.test("captures - empty", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            /* :: */[
                              /* Some */["n"],
                              /* [] */0
                            ],
                            /* :: */[
                              /* :: */[
                                /* Some */["n"],
                                /* [] */0
                              ],
                              /* :: */[
                                /* :: */[
                                  /* None */0,
                                  /* [] */0
                                ],
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Rebase.List[/* map */0](Revamp.Match[/* captures */2], Rebase.List[/* fromSeq */13](Revamp.exec("a(n)?", /* None */0, "banana")))));
              }));
        Jest.test("index", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* :: */[
                              3,
                              /* :: */[
                                5,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Rebase.List[/* map */0](Revamp.Match[/* index */3], Rebase.List[/* fromSeq */13](Revamp.exec("a(n?)", /* None */0, "banana")))));
              }));
        return Jest.test("input", (function () {
                      return Jest.Expect[/* toEqual */12](/* :: */[
                                  "banana",
                                  /* :: */[
                                    "banana",
                                    /* :: */[
                                      "banana",
                                      /* [] */0
                                    ]
                                  ]
                                ], Jest.Expect[/* expect */0](Rebase.List[/* map */0](Revamp.Match[/* input */4], Rebase.List[/* fromSeq */13](Revamp.exec("a(n?)", /* None */0, "banana")))));
                    }));
      }));

describe("Uncompiled", (function () {
        var pattern = "(an)+([^d])";
        describe("exec", (function () {
                var run = function (input) {
                  var partial_arg = (function (eta) {
                        return Revamp.exec(pattern, /* None */0, eta);
                      })(input);
                  var partial_arg$1 = Revamp.Match[/* match_ */1];
                  var partial_arg$2 = Rebase.Seq[/* map */0];
                  return Rebase.List[/* fromSeq */13]((function (param) {
                                return partial_arg$2(partial_arg$1, partial_arg, param);
                              }));
                };
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* :: */[
                                    "ang",
                                    /* :: */[
                                      "anana",
                                      /* [] */0
                                    ]
                                  ], Jest.Expect[/* expect */0](run("mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](run("apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              var partial_arg = Revamp.exec(pattern, /* Some */[/* :: */[
                                      /* IgnoreCase */0,
                                      /* [] */0
                                    ]], "Mangos and Bananas");
                              var partial_arg$1 = Revamp.Match[/* match_ */1];
                              var partial_arg$2 = Rebase.Seq[/* map */0];
                              return Jest.Expect[/* toEqual */12](/* :: */[
                                          "ang",
                                          /* :: */[
                                            "anana",
                                            /* [] */0
                                          ]
                                        ], Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13]((function (param) {
                                                    return partial_arg$2(partial_arg$1, partial_arg, param);
                                                  }))));
                            }));
              }));
        describe("matches", (function () {
                var run = function (input) {
                  return Rebase.List[/* fromSeq */13]((function (eta) {
                                  return Revamp.matches(pattern, /* None */0, eta);
                                })(input));
                };
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* :: */[
                                    "ang",
                                    /* :: */[
                                      "anana",
                                      /* [] */0
                                    ]
                                  ], Jest.Expect[/* expect */0](run("mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](run("apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12](/* :: */[
                                          "ang",
                                          /* :: */[
                                            "anana",
                                            /* [] */0
                                          ]
                                        ], Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13](Revamp.matches(pattern, /* Some */[/* :: */[
                                                        /* IgnoreCase */0,
                                                        /* [] */0
                                                      ]], "Mangos and Bananas"))));
                            }));
              }));
        describe("indices", (function () {
                var run = function (input) {
                  return Rebase.List[/* fromSeq */13]((function (eta) {
                                  return Revamp.indices(pattern, /* None */0, eta);
                                })(input));
                };
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* :: */[
                                    /* tuple */[
                                      1,
                                      4
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        12,
                                        17
                                      ],
                                      /* [] */0
                                    ]
                                  ], Jest.Expect[/* expect */0](run("mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](run("apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12](/* :: */[
                                          /* tuple */[
                                            1,
                                            4
                                          ],
                                          /* :: */[
                                            /* tuple */[
                                              12,
                                              17
                                            ],
                                            /* [] */0
                                          ]
                                        ], Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13](Revamp.indices(pattern, /* Some */[/* :: */[
                                                        /* IgnoreCase */0,
                                                        /* [] */0
                                                      ]], "Mangos and Bananas"))));
                            }));
              }));
        describe("captures", (function () {
                var run = function (input) {
                  return Rebase.List[/* fromSeq */13]((function (eta) {
                                  return Revamp.captures(pattern, /* None */0, eta);
                                })(input));
                };
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* :: */[
                                    /* :: */[
                                      /* Some */["an"],
                                      /* :: */[
                                        /* Some */["g"],
                                        /* [] */0
                                      ]
                                    ],
                                    /* :: */[
                                      /* :: */[
                                        /* Some */["an"],
                                        /* :: */[
                                          /* Some */["a"],
                                          /* [] */0
                                        ]
                                      ],
                                      /* [] */0
                                    ]
                                  ], Jest.Expect[/* expect */0](run("mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](run("apples and pears")));
                      }));
                Jest.test("match - empty capture", (function () {
                        return Jest.Expect[/* toEqual */12](/* :: */[
                                    /* :: */[
                                      /* Some */["3"],
                                      /* :: */[
                                        /* None */0,
                                        /* [] */0
                                      ]
                                    ],
                                    /* [] */0
                                  ], Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13]((function (eta) {
                                                return Revamp.captures("(.)-(.)?", /* None */0, eta);
                                              })("3-"))));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12](/* :: */[
                                          /* :: */[
                                            /* Some */["an"],
                                            /* :: */[
                                              /* Some */["g"],
                                              /* [] */0
                                            ]
                                          ],
                                          /* :: */[
                                            /* :: */[
                                              /* Some */["an"],
                                              /* :: */[
                                                /* Some */["a"],
                                                /* [] */0
                                              ]
                                            ],
                                            /* [] */0
                                          ]
                                        ], Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13](Revamp.captures(pattern, /* Some */[/* :: */[
                                                        /* IgnoreCase */0,
                                                        /* [] */0
                                                      ]], "Mangos and Bananas"))));
                            }));
              }));
        describe("test", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toBe */2](/* true */1, Jest.Expect[/* expect */0](Revamp.test(pattern, /* None */0, "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toBe */2](/* false */0, Jest.Expect[/* expect */0](Revamp.test(pattern, /* None */0, "apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toBe */2](/* true */1, Jest.Expect[/* expect */0](Revamp.test(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "Mangos and Bananas")));
                            }));
              }));
        describe("count", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toBe */2](2, Jest.Expect[/* expect */0](Revamp.count(pattern, /* None */0, "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](Revamp.count(pattern, /* None */0, "apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toBe */2](2, Jest.Expect[/* expect */0](Revamp.count(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "Mangos and Bananas")));
                            }));
              }));
        describe("find", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* Some */["ang"], Jest.Expect[/* expect */0](Revamp.find(pattern, /* None */0, "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toBe */2](/* None */0, Jest.Expect[/* expect */0](Revamp.find(pattern, /* None */0, "apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12](/* Some */["ang"], Jest.Expect[/* expect */0](Revamp.find(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "Mangos and Bananas")));
                            }));
              }));
        describe("findIndex", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* Some */[/* tuple */[
                                      1,
                                      4
                                    ]], Jest.Expect[/* expect */0](Revamp.findIndex(pattern, /* None */0, "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toBe */2](/* None */0, Jest.Expect[/* expect */0](Revamp.findIndex(pattern, /* None */0, "apples and pears")));
                      }));
                return Jest.test("findIndex", (function () {
                              return Jest.Expect[/* toEqual */12](/* Some */[/* tuple */[
                                            1,
                                            4
                                          ]], Jest.Expect[/* expect */0](Revamp.findIndex(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "Mangos and Bananas")));
                            }));
              }));
        describe("replace", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12]("mfooos and bfoos", Jest.Expect[/* expect */0](Revamp.replace(pattern, /* None */0, (function () {
                                              return "foo";
                                            }), "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12]("apples and pears", Jest.Expect[/* expect */0](Revamp.replace(pattern, /* None */0, (function () {
                                              return "foo";
                                            }), "apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12]("Mfooos and Bfoos", Jest.Expect[/* expect */0](Revamp.replace(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], (function () {
                                                    return "foo";
                                                  }), "Mangos and Bananas")));
                            }));
              }));
        describe("replaceByString", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12]("m[an]os and b[an]s", Jest.Expect[/* expect */0](Revamp.replaceByString(pattern, /* None */0, "[$1]", "mangos and bananas")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12]("apples and pears", Jest.Expect[/* expect */0](Revamp.replaceByString(pattern, /* None */0, "[$1]", "apples and pears")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12]("M[an]os and B[an]s", Jest.Expect[/* expect */0](Revamp.replaceByString(pattern, /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "[$1]", "Mangos and Bananas")));
                            }));
              }));
        describe("split", (function () {
                Jest.test("match", (function () {
                        return Jest.Expect[/* toEqual */12](/* array */[
                                    "bang",
                                    "bang",
                                    "bananabatman",
                                    ""
                                  ], Jest.Expect[/* expect */0](Revamp.split(" |!", /* None */0, "bang bang bananabatman!")));
                      }));
                Jest.test("no match", (function () {
                        return Jest.Expect[/* toEqual */12](/* array */["apples"], Jest.Expect[/* expect */0](Revamp.split(" |!", /* None */0, "apples")));
                      }));
                return Jest.test("flags", (function () {
                              return Jest.Expect[/* toEqual */12](/* array */[
                                          "bang",
                                          "bang",
                                          "bananabatman",
                                          ""
                                        ], Jest.Expect[/* expect */0](Revamp.split(" |!", /* Some */[/* :: */[
                                                    /* IgnoreCase */0,
                                                    /* [] */0
                                                  ]], "bang bang bananabatman!")));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
