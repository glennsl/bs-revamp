'use strict';

var Jest   = require("bs-jest/lib/js/src/jest.js");
var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Revamp = require("../src/Revamp.js");

var pattern = "(an)+([^d])";

describe("compile", (function () {
        return /* () */0;
      }));

describe("matches", (function () {
        var run = function (input) {
          return Rebase.List[/* fromSeq */13]((function (eta) {
                          return Revamp.matches(pattern, /* None */0, eta);
                        })(input));
        };
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* :: */[
                              "ang",
                              /* :: */[
                                "anana",
                                /* [] */0
                              ]
                            ])(Jest.Expect[/* expect */0](run("mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toEqual */11](/* [] */0)(Jest.Expect[/* expect */0](run("apples and pears")));
                    }));
      }));

describe("indices", (function () {
        var run = function (input) {
          return Rebase.List[/* fromSeq */13]((function (eta) {
                          return Revamp.indices(pattern, /* None */0, eta);
                        })(input));
        };
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* :: */[
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
                            ])(Jest.Expect[/* expect */0](run("mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toEqual */11](/* [] */0)(Jest.Expect[/* expect */0](run("apples and pears")));
                    }));
      }));

describe("captures", (function () {
        var run = function (input) {
          return Rebase.List[/* fromSeq */13]((function (eta) {
                          return Revamp.captures(pattern, /* None */0, eta);
                        })(input));
        };
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* :: */[
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
                            ])(Jest.Expect[/* expect */0](run("mangos and bananas")));
              }));
        Jest.test("no match", (function () {
                return Jest.Expect[/* toEqual */11](/* [] */0)(Jest.Expect[/* expect */0](run("apples and pears")));
              }));
        return Jest.test("match - empty capture", (function () {
                      return Jest.Expect[/* toEqual */11](/* :: */[
                                    /* :: */[
                                      /* Some */["3"],
                                      /* :: */[
                                        /* None */0,
                                        /* [] */0
                                      ]
                                    ],
                                    /* [] */0
                                  ])(Jest.Expect[/* expect */0](Rebase.List[/* fromSeq */13]((function (eta) {
                                              return Revamp.captures("(.)-(.)?", /* None */0, eta);
                                            })("3-"))));
                    }));
      }));

describe("test", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toBe */1](/* true */1)(Jest.Expect[/* expect */0](Revamp.test(pattern, /* None */0, "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toBe */1](/* false */0)(Jest.Expect[/* expect */0](Revamp.test(pattern, /* None */0, "apples and pears")));
                    }));
      }));

describe("count", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toBe */1](2)(Jest.Expect[/* expect */0](Revamp.count(pattern, /* None */0, "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toBe */1](0)(Jest.Expect[/* expect */0](Revamp.count(pattern, /* None */0, "apples and pears")));
                    }));
      }));

describe("find", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* Some */["ang"])(Jest.Expect[/* expect */0](Revamp.find(pattern, /* None */0, "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toBe */1](/* None */0)(Jest.Expect[/* expect */0](Revamp.find(pattern, /* None */0, "apples and pears")));
                    }));
      }));

describe("findIndex", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* Some */[/* tuple */[
                                1,
                                4
                              ]])(Jest.Expect[/* expect */0](Revamp.findIndex(pattern, /* None */0, "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toBe */1](/* None */0)(Jest.Expect[/* expect */0](Revamp.findIndex(pattern, /* None */0, "apples and pears")));
                    }));
      }));

describe("replace", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11]("mfooos and bfoos")(Jest.Expect[/* expect */0](Revamp.replace(pattern, /* None */0, (function () {
                                      return "foo";
                                    }), "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toEqual */11]("apples and pears")(Jest.Expect[/* expect */0](Revamp.replace(pattern, /* None */0, (function () {
                                            return "foo";
                                          }), "apples and pears")));
                    }));
      }));

describe("replaceByString", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11]("m[an]os and b[an]s")(Jest.Expect[/* expect */0](Revamp.replaceByString(pattern, /* None */0, "[$1]", "mangos and bananas")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toEqual */11]("apples and pears")(Jest.Expect[/* expect */0](Revamp.replaceByString(pattern, /* None */0, "[$1]", "apples and pears")));
                    }));
      }));

describe("split", (function () {
        Jest.test("match", (function () {
                return Jest.Expect[/* toEqual */11](/* array */[
                              "bang",
                              "bang",
                              "bananabatman",
                              ""
                            ])(Jest.Expect[/* expect */0](Revamp.split(" |!", /* None */0, "bang bang bananabatman!")));
              }));
        return Jest.test("no match", (function () {
                      return Jest.Expect[/* toEqual */11](/* array */["apples"])(Jest.Expect[/* expect */0](Revamp.split(" |!", /* None */0, "apples")));
                    }));
      }));

exports.pattern = pattern;
/*  Not a pure module */
