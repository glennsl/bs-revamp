open Jest;

let () =
  describe("Compiled", () => {
    open Expect;
    open Rebase;
    test("make - flags", () => {
      let result =
        {js|
        One Møøse
        Two Møøse
      |js}
        |> Revamp.Compiled.matches(
             Revamp.Compiled.make(
               ~flags=Revamp.[IgnoreCase, Unicode, MultiLine],
               {js|o\\w+ møøse$|js},
             ),
           )
        |> List.fromSeq;

      expect(result) |> toEqual([{js|One Møøse|js}]);
    });

    test("make - no flags", () => {
      let result =
        {js|
        One Møøse
        Two Møøse
      |js}
        |> Revamp.Compiled.matches(
             Revamp.Compiled.make({js|\\w+ Møøse|js}),
           )
        |> List.fromSeq;

      expect(result) |> toEqual([{js|One Møøse|js}, {js|Two Møøse|js}]);
    });

    test("test - raise Invalid_argument if given non-global regexp object", () =>
      expect(() =>
        "" |> Revamp.Compiled.test([%re "/foo/"] |> Obj.magic)
      )
      |> toThrow
    );

    test(
      "test - raise Invalid_argument if given partially used global regexp object",
      () => {
      let re = [%re "/o/g"];
      re->Js.Re.exec_("foo") |> ignore;

      expect(() =>
        "" |> Revamp.Compiled.test(re |> Obj.magic)
      )
      |> toThrow
    });

    let re = Revamp.Compiled.make("(an)+([^d])");

    describe("test", () => {
      test("match", () =>
        expect(Revamp.Compiled.test(re, "mangos and bananas")) |> toBe(true)
      );

      test("no match", () =>
        expect(Revamp.Compiled.test(re, "apples and pears")) |> toBe(false)
      );
    });

    describe("count", () => {
      test("match", () =>
        expect(Revamp.Compiled.count(re, "mangos and bananas")) |> toBe(2)
      );

      test("no match", () =>
        expect(Revamp.Compiled.count(re, "apples and pears")) |> toBe(0)
      );
    });

    describe("find", () => {
      test("match", () =>
        expect(Revamp.Compiled.find(re, "mangos and bananas"))
        |> toEqual(Some("ang"))
      );

      test("no match", () =>
        expect(Revamp.Compiled.find(re, "apples and pears")) |> toBe(None)
      );
    });

    describe("findIndex", () => {
      test("match", () =>
        expect(Revamp.Compiled.findIndex(re, "mangos and bananas"))
        |> toEqual(Some((1, 4)))
      );

      test("no match", () =>
        expect(Revamp.Compiled.findIndex(re, "apples and pears"))
        |> toBe(None)
      );
    });

    describe("replace", () => {
      test("match", () =>
        expect(
          Revamp.Compiled.replace(re, _x => "foo", "mangos and bananas"),
        )
        |> toEqual("mfooos and bfoos")
      );

      test("no match", () =>
        expect(Revamp.Compiled.replace(re, _x => "foo", "apples and pears"))
        |> toEqual("apples and pears")
      );
    });

    describe("replaceByString", () => {
      test("match", () =>
        expect(
          Revamp.Compiled.replaceByString(re, "[$1]", "mangos and bananas"),
        )
        |> toEqual("m[an]os and b[an]s")
      );

      test("no match", () =>
        expect(
          Revamp.Compiled.replaceByString(re, "[$1]", "apples and pears"),
        )
        |> toEqual("apples and pears")
      );
    });

    describe("split", () => {
      let re = Revamp.Compiled.make(" |!");

      test("match", () =>
        expect(Revamp.Compiled.split(re, "bang bang bananabatman!"))
        |> toEqual([|
             Some("bang"),
             Some("bang"),
             Some("bananabatman"),
             Some(""),
           |])
      );
      // expect(Revamp.Compiled.split(re, "bang bang bananabatman!")) |> toEqual(([|"bang", "bang", "bananabatman", ""|])));

      test("no match", () =>
        expect(Revamp.Compiled.split(re, "apples"))
        |> toEqual([|Some("apples")|])
      );
    });
  });

describe("Match", () => {
  open Rebase;
  open Expect;
  // test("matches", () =>
  // expect(
  //   Revamp.exec("a(n?)", "banana") |> List.fromSeq
  //                                  |> List.map(Revamp.Match.matches)
  //                                  |> List.map(Js.Array.copy)) /* matches has some extra properties attached, so to be able to compare it we need to convert it into a normal array */
  //   |> toEqual([[|"an", "n"|], [|"an", "n"|], [|"a", ""|]]));

  test("matches", () =>
    expect(
      Revamp.exec("a(n?)", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.captures)
      |> List.map(Rebase.Array.fromList)
      // |> List.map(Js.Array.copy)
      //  |> Rebase.Array.copy
    )  /* matches has some extra properties attached, so to be able to compare it we need to convert it into a normal array */
    |> toEqual([
         [|Some("an"), Some("n")|],
         [|Some("an"), Some("n")|],
         [|Some("a"), Some("")|],
       ])
  );

  test("match", () =>
    expect(
      Revamp.exec("a(n?)", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.match),
    )
    |> toEqual(["an", "an", "a"])
  );

  test("captures", () =>
    expect(
      Revamp.exec("a(n?)", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.captures),
    )
    |> toEqual([[Some("n")], [Some("n")], [Some("")]])
  );

  test("captures - empty", () =>
    expect(
      Revamp.exec("a(n)?", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.captures),
    )
    |> toEqual([[Some("n")], [Some("n")], [None]])
  );

  test("index", () =>
    expect(
      Revamp.exec("a(n?)", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.index),
    )
    |> toEqual([1, 3, 5])
  );

  test("input", () =>
    expect(
      Revamp.exec("a(n?)", "banana")
      |> List.fromSeq
      |> List.map(Revamp.Match.input),
    )
    |> toEqual(["banana", "banana", "banana"])
  );
});

describe("Uncompiled", () => {
  open Rebase;
  open Expect;
  let pattern = "(an)+([^d])";

  describe("exec", () => {
    let run = input =>
      input
      |> Revamp.exec(pattern, _)
      |> Seq.map(Revamp.Match.match)
      |> List.fromSeq;

    test("match", () =>
      expect(run("mangos and bananas")) |> toEqual(["ang", "anana"])
    );

    test("no match", () =>
      expect(run("apples and pears")) |> toEqual([])
    );

    test("flags", () =>
      expect(
        Revamp.exec(pattern, ~flags=[IgnoreCase], "Mangos and Bananas")
        |> Seq.map(Revamp.Match.match)
        |> List.fromSeq,
      )
      |> toEqual(["ang", "anana"])
    );
  });

  describe("matches", () => {
    let run = input => input |> Revamp.matches(pattern, _) |> List.fromSeq;

    test("match", () =>
      expect(run("mangos and bananas")) |> toEqual(["ang", "anana"])
    );

    test("no match", () =>
      expect(run("apples and pears")) |> toEqual([])
    );

    test("flags", () =>
      expect(
        Revamp.matches(pattern, ~flags=[IgnoreCase], "Mangos and Bananas")
        |> List.fromSeq,
      )
      |> toEqual(["ang", "anana"])
    );
  });

  describe("indices", () => {
    let run = input => input |> Revamp.indices(pattern, _) |> List.fromSeq;

    test("match", () =>
      expect(run("mangos and bananas")) |> toEqual([(1, 4), (12, 17)])
    );

    test("no match", () =>
      expect(run("apples and pears")) |> toEqual([])
    );

    test("flags", () =>
      expect(
        Revamp.indices(pattern, ~flags=[IgnoreCase], "Mangos and Bananas")
        |> List.fromSeq,
      )
      |> toEqual([(1, 4), (12, 17)])
    );
  });

  describe("captures", () => {
    let run = input => input |> Revamp.captures(pattern, _) |> List.fromSeq;

    test("match", () =>
      expect(run("mangos and bananas"))
      |> toEqual([[Some("an"), Some("g")], [Some("an"), Some("a")]])
    );

    test("no match", () =>
      expect(run("apples and pears")) |> toEqual([])
    );

    test("match - empty capture", () =>
      expect("3-" |> Revamp.captures("(.)-(.)?", _) |> List.fromSeq)
      |> toEqual([[Some("3"), None]])
    );

    test("flags", () =>
      expect(
        Revamp.captures(pattern, ~flags=[IgnoreCase], "Mangos and Bananas")
        |> List.fromSeq,
      )
      |> toEqual([[Some("an"), Some("g")], [Some("an"), Some("a")]])
    );
  });

  describe("test", () => {
    test("match", () =>
      expect(Revamp.test(pattern, "mangos and bananas")) |> toBe(true)
    );

    test("no match", () =>
      expect(Revamp.test(pattern, "apples and pears")) |> toBe(false)
    );

    test("flags", () =>
      expect(
        Revamp.test(pattern, ~flags=[IgnoreCase], "Mangos and Bananas"),
      )
      |> toBe(true)
    );
  });

  describe("count", () => {
    test("match", () =>
      expect(Revamp.count(pattern, "mangos and bananas")) |> toBe(2)
    );

    test("no match", () =>
      expect(Revamp.count(pattern, "apples and pears")) |> toBe(0)
    );

    test("flags", () =>
      expect(
        Revamp.count(pattern, ~flags=[IgnoreCase], "Mangos and Bananas"),
      )
      |> toBe(2)
    );
  });

  describe("find", () => {
    test("match", () =>
      expect(Revamp.find(pattern, "mangos and bananas"))
      |> toEqual(Some("ang"))
    );

    test("no match", () =>
      expect(Revamp.find(pattern, "apples and pears")) |> toBe(None)
    );

    test("flags", () =>
      expect(
        Revamp.find(pattern, ~flags=[IgnoreCase], "Mangos and Bananas"),
      )
      |> toEqual(Some("ang"))
    );
  });

  describe("findIndex", () => {
    test("match", () =>
      expect(Revamp.findIndex(pattern, "mangos and bananas"))
      |> toEqual(Some((1, 4)))
    );

    test("no match", () =>
      expect(Revamp.findIndex(pattern, "apples and pears")) |> toBe(None)
    );

    test("findIndex", () =>
      expect(
        Revamp.findIndex(pattern, ~flags=[IgnoreCase], "Mangos and Bananas"),
      )
      |> toEqual(Some((1, 4)))
    );
  });

  describe("replace", () => {
    test("match", () =>
      expect(Revamp.replace(pattern, _x => "foo", "mangos and bananas"))
      |> toEqual("mfooos and bfoos")
    );

    test("no match", () =>
      expect(Revamp.replace(pattern, _x => "foo", "apples and pears"))
      |> toEqual("apples and pears")
    );

    test("flags", () =>
      expect(
        Revamp.replace(
          pattern,
          _x => "foo",
          ~flags=[IgnoreCase],
          "Mangos and Bananas",
        ),
      )
      |> toEqual("Mfooos and Bfoos")
    );
  });

  describe("replaceByString", () => {
    test("match", () =>
      expect(Revamp.replaceByString(pattern, "[$1]", "mangos and bananas"))
      |> toEqual("m[an]os and b[an]s")
    );

    test("no match", () =>
      expect(Revamp.replaceByString(pattern, "[$1]", "apples and pears"))
      |> toEqual("apples and pears")
    );

    test("flags", () =>
      expect(
        Revamp.replaceByString(
          pattern,
          "[$1]",
          ~flags=[IgnoreCase],
          "Mangos and Bananas",
        ),
      )
      |> toEqual("M[an]os and B[an]s")
    );
  });

  describe("split", () => {
    // open Rebase;
    test("match", () =>
      expect(Revamp.split(" |!", "bang bang bananabatman!"))
      |> toEqual([|
           Some("bang"),
           Some("bang"),
           Some("bananabatman"),
           Some(""),
         |])
    );

    test("no match", () =>
      expect(Revamp.split(" |!", "apples")) |> toEqual([|Some("apples")|])
    );

    test("flags", () =>
      expect(
        Revamp.split(" |!", ~flags=[IgnoreCase], "bang bang bananabatman!"),
      )
      |> toEqual([|
           Some("bang"),
           Some("bang"),
           Some("bananabatman"),
           Some(""),
         |])
    );
  });
});
