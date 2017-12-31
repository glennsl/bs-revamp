open Jest;
open Expect;

let pattern = "(an)+([^d])";

let () =

describe("compile", () => {
  () /* TODO */
});

describe("matches", () => {
  let run = input =>
    input |> Revamp.matches(pattern)
          |> Sequence.toList;

  test("match", () =>
    expect(run("mangos and bananas")) |> toEqual(["ang", "anana"]));

  test("no match", () =>
    expect(run("apples and pears")) |> toEqual([]));
});

describe("indices", () => {
  let run = input =>
    input |> Revamp.indices(pattern)
          |> Sequence.toList;

  test("match", () =>
    expect(run("mangos and bananas")) |> toEqual([(1, 4), (12, 17)]));

  test("no match", () =>
    expect(run("apples and pears")) |> toEqual([]));
});

describe("captures", () => {
  let run = input =>
    input |> Revamp.captures(pattern)
          |> Sequence.toList;

  test("match", () =>
    expect(run("mangos and bananas")) |> toEqual([[Some("an"), Some("g")], [Some("an"), Some("a")]]));

  test("no match", () =>
    expect(run("apples and pears")) |> toEqual([]));

  test("match - empty capture", () =>
    expect(
      "3-" |> Revamp.captures("(.)-(.)?")
           |> Sequence.toList)
      |> toEqual([[Some("3"), None]]));
});

describe("test", () => {
  test("match", () => 
    expect(Revamp.test(pattern, "mangos and bananas")) |> toBe(true));

  test("no match", () => 
    expect(Revamp.test(pattern, "apples and pears")) |> toBe(false));
});

describe("count", () => {
  test("match", () => 
    expect(Revamp.count(pattern, "mangos and bananas")) |> toBe(2));

  test("no match", () => 
    expect(Revamp.count(pattern, "apples and pears")) |> toBe(0));
});

describe("find", () => {
  test("match", () => 
    expect(Revamp.find(pattern, "mangos and bananas")) |> toEqual(Some("ang")));

  test("no match", () => 
    expect(Revamp.find(pattern, "apples and pears")) |> toBe(None));
});

describe("findIndex", () => {
  test("match", () => 
    expect(Revamp.findIndex(pattern, "mangos and bananas")) |> toEqual(Some((1, 4))));

  test("no match", () => 
    expect(Revamp.findIndex(pattern, "apples and pears")) |> toBe(None));
});

describe("replace", () => {
  test("match", () => 
    expect(Revamp.replace(pattern, _x => "foo", "mangos and bananas")) |> toEqual("mfooos and bfoos"));

  test("no match", () => 
    expect(Revamp.replace(pattern, _x => "foo", "apples and pears")) |> toEqual("apples and pears"));
});

describe("replaceByString", () => {
  test("match", () => 
    expect(Revamp.replaceByString(pattern, "[$1]", "mangos and bananas")) |> toEqual("m[an]os and b[an]s"));

  test("no match", () => 
    expect(Revamp.replaceByString(pattern, "[$1]", "apples and pears")) |> toEqual("apples and pears"));
});

describe("split", () => {
  test("match", () => 
    expect(Revamp.split(" |!", "bang bang bananabatman!")) |> toEqual(([|"bang", "bang", "bananabatman", ""|])));

  test("no match", () => 
    expect(Revamp.split(" |!", "apples")) |> toEqual([|"apples"|]));
});
