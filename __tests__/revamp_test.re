open Jest;
open Expect;

let pattern = "(an)+([^d])";

let () =

describe "compile" (fun () => {
  () /* TODO */
});

describe "matches" (fun () => {
  let run input =>
    input |> Revamp.matches pattern
          |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual ["ang", "anana"]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "indices" (fun () => {
  let run input =>
    input |> Revamp.indices pattern
          |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual [(1, 4), (12, 17)]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "captures" (fun () => {
  let run input =>
    input |> Revamp.captures pattern
          |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual [[|"an", "g"|], [|"an", "a"|]]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "test" (fun () => {
  test "match" (fun () => 
    expect (Revamp.test pattern "mangos and bananas") |> toBe true);

  test "no match" (fun () => 
    expect (Revamp.test pattern "apples and pears") |> toBe false);
});

describe "count" (fun () => {
  test "match" (fun () => 
    expect (Revamp.count pattern "mangos and bananas") |> toBe 2);

  test "no match" (fun () => 
    expect (Revamp.count pattern "apples and pears") |> toBe 0);
});

describe "find" (fun () => {
  test "match" (fun () => 
    expect (Revamp.find pattern "mangos and bananas") |> toEqual (Some "ang"));

  test "no match" (fun () => 
    expect (Revamp.find pattern "apples and pears") |> toBe None);
});

describe "findIndex" (fun () => {
  test "match" (fun () => 
    expect (Revamp.findIndex pattern "mangos and bananas") |> toEqual (Some (1, 4)));

  test "no match" (fun () => 
    expect (Revamp.findIndex pattern "apples and pears") |> toBe None);
});

describe "replace" (fun () => {
  test "match" (fun () => 
    expect (Revamp.replace pattern (fun _ => "foo") "mangos and bananas") |> toEqual "mfooos and bfoos");

  test "no match" (fun () => 
    expect (Revamp.replace pattern (fun _ => "foo") "apples and pears") |> toEqual "apples and pears");
});

describe "replaceByString" (fun () => {
  test "match" (fun () => 
    expect (Revamp.replaceByString pattern "[$1]" "mangos and bananas") |> toEqual "m[an]os and b[an]s");

  test "no match" (fun () => 
    expect (Revamp.replaceByString pattern "[$1]" "apples and pears") |> toEqual "apples and pears");
});

describe "split" (fun () => {
  test "match" (fun () => 
    expect (Revamp.split " |!" "bang bang bananabatman!") |> toEqual ([|"bang", "bang", "bananabatman", ""|]));

  test "no match" (fun () => 
    expect (Revamp.split " |!" "apples") |> toEqual [|"apples"|]);
});
