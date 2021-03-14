'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Revamp = require("../src/Revamp.js");

Jest.describe("Compiled", (function (param) {
        Jest.test("make - flags", (function (param) {
                var result = Rebase.List.fromSeq(Revamp.Compiled.matches(Revamp.Compiled.make({
                              hd: /* IgnoreCase */0,
                              tl: {
                                hd: /* Unicode */2,
                                tl: {
                                  hd: /* MultiLine */1,
                                  tl: /* [] */0
                                }
                              }
                            }, "o\\w+ møøse$"), "\n        One Møøse\n        Two Møøse\n      "));
                return Jest.Expect.toEqual({
                            hd: "One Møøse",
                            tl: /* [] */0
                          }, Jest.Expect.expect(result));
              }));
        Jest.test("make - no flags", (function (param) {
                var result = Rebase.List.fromSeq(Revamp.Compiled.matches(Revamp.Compiled.make(undefined, "\\w+ Møøse"), "\n        One Møøse\n        Two Møøse\n      "));
                return Jest.Expect.toEqual({
                            hd: "One Møøse",
                            tl: {
                              hd: "Two Møøse",
                              tl: /* [] */0
                            }
                          }, Jest.Expect.expect(result));
              }));
        Jest.test("test - raise Invalid_argument if given non-global regexp object", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expect(function (param) {
                                return Revamp.Compiled.test(/foo/, "");
                              }));
              }));
        Jest.test("test - raise Invalid_argument if given partially used global regexp object", (function (param) {
                var re = /o/g;
                re.exec("foo");
                return Jest.Expect.toThrow(Jest.Expect.expect(function (param) {
                                return Revamp.Compiled.test(re, "");
                              }));
              }));
        var re = Revamp.Compiled.make(undefined, "(an)+([^d])");
        Jest.describe("test", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toBe(true, Jest.Expect.expect(Revamp.Compiled.test(re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toBe(false, Jest.Expect.expect(Revamp.Compiled.test(re, "apples and pears")));
                            }));
              }));
        Jest.describe("count", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toBe(2, Jest.Expect.expect(Revamp.Compiled.count(re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toBe(0, Jest.Expect.expect(Revamp.Compiled.count(re, "apples and pears")));
                            }));
              }));
        Jest.describe("find", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("ang", Jest.Expect.expect(Revamp.Compiled.find(re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toBe(undefined, Jest.Expect.expect(Revamp.Compiled.find(re, "apples and pears")));
                            }));
              }));
        Jest.describe("findIndex", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual([
                                    1,
                                    4
                                  ], Jest.Expect.expect(Revamp.Compiled.findIndex(re, "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toBe(undefined, Jest.Expect.expect(Revamp.Compiled.findIndex(re, "apples and pears")));
                            }));
              }));
        Jest.describe("replace", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("mfooos and bfoos", Jest.Expect.expect(Revamp.Compiled.replace(re, (function (_x) {
                                              return "foo";
                                            }), "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toEqual("apples and pears", Jest.Expect.expect(Revamp.Compiled.replace(re, (function (_x) {
                                                    return "foo";
                                                  }), "apples and pears")));
                            }));
              }));
        Jest.describe("replaceByString", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("m[an]os and b[an]s", Jest.Expect.expect(Revamp.Compiled.replaceByString(re, "[$1]", "mangos and bananas")));
                      }));
                return Jest.test("no match", (function (param) {
                              return Jest.Expect.toEqual("apples and pears", Jest.Expect.expect(Revamp.Compiled.replaceByString(re, "[$1]", "apples and pears")));
                            }));
              }));
        return Jest.describe("split", (function (param) {
                      var re = Revamp.Compiled.make(undefined, " |!");
                      Jest.test("match", (function (param) {
                              return Jest.Expect.toEqual([
                                          "bang",
                                          "bang",
                                          "bananabatman",
                                          ""
                                        ], Jest.Expect.expect(Revamp.Compiled.split(re, "bang bang bananabatman!")));
                            }));
                      return Jest.test("no match", (function (param) {
                                    return Jest.Expect.toEqual(["apples"], Jest.Expect.expect(Revamp.Compiled.split(re, "apples")));
                                  }));
                    }));
      }));

Jest.describe("Match", (function (param) {
        Jest.test("matches", (function (param) {
                return Jest.Expect.toEqual({
                            hd: [
                              "an",
                              "n"
                            ],
                            tl: {
                              hd: [
                                "an",
                                "n"
                              ],
                              tl: {
                                hd: [
                                  "a",
                                  ""
                                ],
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Rebase.List.map(Rebase.$$Array.fromList, Rebase.List.map(Revamp.Match.captures, Rebase.List.fromSeq(Revamp.exec("a(n?)", undefined, "banana"))))));
              }));
        Jest.test("match", (function (param) {
                return Jest.Expect.toEqual({
                            hd: "an",
                            tl: {
                              hd: "an",
                              tl: {
                                hd: "a",
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Rebase.List.map(Revamp.Match.match_, Rebase.List.fromSeq(Revamp.exec("a(n?)", undefined, "banana")))));
              }));
        Jest.test("captures", (function (param) {
                return Jest.Expect.toEqual({
                            hd: {
                              hd: "n",
                              tl: /* [] */0
                            },
                            tl: {
                              hd: {
                                hd: "n",
                                tl: /* [] */0
                              },
                              tl: {
                                hd: {
                                  hd: "",
                                  tl: /* [] */0
                                },
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Rebase.List.map(Revamp.Match.captures, Rebase.List.fromSeq(Revamp.exec("a(n?)", undefined, "banana")))));
              }));
        Jest.test("captures - empty", (function (param) {
                return Jest.Expect.toEqual({
                            hd: {
                              hd: "n",
                              tl: /* [] */0
                            },
                            tl: {
                              hd: {
                                hd: "n",
                                tl: /* [] */0
                              },
                              tl: {
                                hd: {
                                  hd: undefined,
                                  tl: /* [] */0
                                },
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Rebase.List.map(Revamp.Match.captures, Rebase.List.fromSeq(Revamp.exec("a(n)?", undefined, "banana")))));
              }));
        Jest.test("index", (function (param) {
                return Jest.Expect.toEqual({
                            hd: 1,
                            tl: {
                              hd: 3,
                              tl: {
                                hd: 5,
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Rebase.List.map(Revamp.Match.index, Rebase.List.fromSeq(Revamp.exec("a(n?)", undefined, "banana")))));
              }));
        return Jest.test("input", (function (param) {
                      return Jest.Expect.toEqual({
                                  hd: "banana",
                                  tl: {
                                    hd: "banana",
                                    tl: {
                                      hd: "banana",
                                      tl: /* [] */0
                                    }
                                  }
                                }, Jest.Expect.expect(Rebase.List.map(Revamp.Match.input, Rebase.List.fromSeq(Revamp.exec("a(n?)", undefined, "banana")))));
                    }));
      }));

Jest.describe("Uncompiled", (function (param) {
        var pattern = "(an)+([^d])";
        Jest.describe("exec", (function (param) {
                var run = function (input) {
                  var partial_arg = Revamp.exec(pattern, undefined, input);
                  return Rebase.List.fromSeq(function (param) {
                              return Rebase.Seq.map(Revamp.Match.match_, partial_arg, param);
                            });
                };
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual({
                                    hd: "ang",
                                    tl: {
                                      hd: "anana",
                                      tl: /* [] */0
                                    }
                                  }, Jest.Expect.expect(run("mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual(/* [] */0, Jest.Expect.expect(run("apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              var partial_arg = Revamp.exec(pattern, {
                                    hd: /* IgnoreCase */0,
                                    tl: /* [] */0
                                  }, "Mangos and Bananas");
                              return Jest.Expect.toEqual({
                                          hd: "ang",
                                          tl: {
                                            hd: "anana",
                                            tl: /* [] */0
                                          }
                                        }, Jest.Expect.expect(Rebase.List.fromSeq(function (param) {
                                                  return Rebase.Seq.map(Revamp.Match.match_, partial_arg, param);
                                                })));
                            }));
              }));
        Jest.describe("matches", (function (param) {
                var run = function (input) {
                  return Rebase.List.fromSeq(Revamp.matches(pattern, undefined, input));
                };
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual({
                                    hd: "ang",
                                    tl: {
                                      hd: "anana",
                                      tl: /* [] */0
                                    }
                                  }, Jest.Expect.expect(run("mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual(/* [] */0, Jest.Expect.expect(run("apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual({
                                          hd: "ang",
                                          tl: {
                                            hd: "anana",
                                            tl: /* [] */0
                                          }
                                        }, Jest.Expect.expect(Rebase.List.fromSeq(Revamp.matches(pattern, {
                                                      hd: /* IgnoreCase */0,
                                                      tl: /* [] */0
                                                    }, "Mangos and Bananas"))));
                            }));
              }));
        Jest.describe("indices", (function (param) {
                var run = function (input) {
                  return Rebase.List.fromSeq(Revamp.indices(pattern, undefined, input));
                };
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual({
                                    hd: [
                                      1,
                                      4
                                    ],
                                    tl: {
                                      hd: [
                                        12,
                                        17
                                      ],
                                      tl: /* [] */0
                                    }
                                  }, Jest.Expect.expect(run("mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual(/* [] */0, Jest.Expect.expect(run("apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual({
                                          hd: [
                                            1,
                                            4
                                          ],
                                          tl: {
                                            hd: [
                                              12,
                                              17
                                            ],
                                            tl: /* [] */0
                                          }
                                        }, Jest.Expect.expect(Rebase.List.fromSeq(Revamp.indices(pattern, {
                                                      hd: /* IgnoreCase */0,
                                                      tl: /* [] */0
                                                    }, "Mangos and Bananas"))));
                            }));
              }));
        Jest.describe("captures", (function (param) {
                var run = function (input) {
                  return Rebase.List.fromSeq(Revamp.captures(pattern, undefined, input));
                };
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual({
                                    hd: {
                                      hd: "an",
                                      tl: {
                                        hd: "g",
                                        tl: /* [] */0
                                      }
                                    },
                                    tl: {
                                      hd: {
                                        hd: "an",
                                        tl: {
                                          hd: "a",
                                          tl: /* [] */0
                                        }
                                      },
                                      tl: /* [] */0
                                    }
                                  }, Jest.Expect.expect(run("mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual(/* [] */0, Jest.Expect.expect(run("apples and pears")));
                      }));
                Jest.test("match - empty capture", (function (param) {
                        return Jest.Expect.toEqual({
                                    hd: {
                                      hd: "3",
                                      tl: {
                                        hd: undefined,
                                        tl: /* [] */0
                                      }
                                    },
                                    tl: /* [] */0
                                  }, Jest.Expect.expect(Rebase.List.fromSeq(Revamp.captures("(.)-(.)?", undefined, "3-"))));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual({
                                          hd: {
                                            hd: "an",
                                            tl: {
                                              hd: "g",
                                              tl: /* [] */0
                                            }
                                          },
                                          tl: {
                                            hd: {
                                              hd: "an",
                                              tl: {
                                                hd: "a",
                                                tl: /* [] */0
                                              }
                                            },
                                            tl: /* [] */0
                                          }
                                        }, Jest.Expect.expect(Rebase.List.fromSeq(Revamp.captures(pattern, {
                                                      hd: /* IgnoreCase */0,
                                                      tl: /* [] */0
                                                    }, "Mangos and Bananas"))));
                            }));
              }));
        Jest.describe("test", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toBe(true, Jest.Expect.expect(Revamp.test(pattern, undefined, "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toBe(false, Jest.Expect.expect(Revamp.test(pattern, undefined, "apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toBe(true, Jest.Expect.expect(Revamp.test(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, "Mangos and Bananas")));
                            }));
              }));
        Jest.describe("count", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toBe(2, Jest.Expect.expect(Revamp.count(pattern, undefined, "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toBe(0, Jest.Expect.expect(Revamp.count(pattern, undefined, "apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toBe(2, Jest.Expect.expect(Revamp.count(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, "Mangos and Bananas")));
                            }));
              }));
        Jest.describe("find", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("ang", Jest.Expect.expect(Revamp.find(pattern, undefined, "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toBe(undefined, Jest.Expect.expect(Revamp.find(pattern, undefined, "apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual("ang", Jest.Expect.expect(Revamp.find(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, "Mangos and Bananas")));
                            }));
              }));
        Jest.describe("findIndex", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual([
                                    1,
                                    4
                                  ], Jest.Expect.expect(Revamp.findIndex(pattern, undefined, "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toBe(undefined, Jest.Expect.expect(Revamp.findIndex(pattern, undefined, "apples and pears")));
                      }));
                return Jest.test("findIndex", (function (param) {
                              return Jest.Expect.toEqual([
                                          1,
                                          4
                                        ], Jest.Expect.expect(Revamp.findIndex(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, "Mangos and Bananas")));
                            }));
              }));
        Jest.describe("replace", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("mfooos and bfoos", Jest.Expect.expect(Revamp.replace(pattern, undefined, (function (_x) {
                                              return "foo";
                                            }), "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual("apples and pears", Jest.Expect.expect(Revamp.replace(pattern, undefined, (function (_x) {
                                              return "foo";
                                            }), "apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual("Mfooos and Bfoos", Jest.Expect.expect(Revamp.replace(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, (function (_x) {
                                                    return "foo";
                                                  }), "Mangos and Bananas")));
                            }));
              }));
        Jest.describe("replaceByString", (function (param) {
                Jest.test("match", (function (param) {
                        return Jest.Expect.toEqual("m[an]os and b[an]s", Jest.Expect.expect(Revamp.replaceByString(pattern, undefined, "[$1]", "mangos and bananas")));
                      }));
                Jest.test("no match", (function (param) {
                        return Jest.Expect.toEqual("apples and pears", Jest.Expect.expect(Revamp.replaceByString(pattern, undefined, "[$1]", "apples and pears")));
                      }));
                return Jest.test("flags", (function (param) {
                              return Jest.Expect.toEqual("M[an]os and B[an]s", Jest.Expect.expect(Revamp.replaceByString(pattern, {
                                                  hd: /* IgnoreCase */0,
                                                  tl: /* [] */0
                                                }, "[$1]", "Mangos and Bananas")));
                            }));
              }));
        return Jest.describe("split", (function (param) {
                      Jest.test("match", (function (param) {
                              return Jest.Expect.toEqual([
                                          "bang",
                                          "bang",
                                          "bananabatman",
                                          ""
                                        ], Jest.Expect.expect(Revamp.split(" |!", undefined, "bang bang bananabatman!")));
                            }));
                      Jest.test("no match", (function (param) {
                              return Jest.Expect.toEqual(["apples"], Jest.Expect.expect(Revamp.split(" |!", undefined, "apples")));
                            }));
                      return Jest.test("flags", (function (param) {
                                    return Jest.Expect.toEqual([
                                                "bang",
                                                "bang",
                                                "bananabatman",
                                                ""
                                              ], Jest.Expect.expect(Revamp.split(" |!", {
                                                        hd: /* IgnoreCase */0,
                                                        tl: /* [] */0
                                                      }, "bang bang bananabatman!")));
                                  }));
                    }));
      }));

/*  Not a pure module */
