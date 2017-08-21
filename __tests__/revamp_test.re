open Jest;
open Expect;

let re = Revamp.compile "(an)+([^d])";

let () =

describe "compile" (fun () => {
  () /* TODO */
});

describe "matches" (fun () => {
  let run input =>
    re |> Revamp.matches input
       |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual ["ang", "anana"]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "indices" (fun () => {
  let run input =>
    re |> Revamp.indices input
       |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual [(1, 4), (12, 17)]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "captures" (fun () => {
  let run input =>
    re |> Revamp.captures input
       |> Sequence.toList;

  test "match" (fun () =>
    expect (run "mangos and bananas") |> toEqual [[|"an", "g"|], [|"an", "a"|]]);

  test "no match" (fun () =>
    expect (run "apples and pears") |> toEqual []);
});

describe "test" (fun () => {
  test "match" (fun () => 
    expect (Revamp.test "mangos and bananas" re) |> toBe true);

  test "no match" (fun () => 
    expect (Revamp.test "apples and pears" re) |> toBe false);
});

describe "count" (fun () => {
  test "match" (fun () => 
    expect (Revamp.count "mangos and bananas" re) |> toBe 2);

  test "no match" (fun () => 
    expect (Revamp.count "apples and pears" re) |> toBe 0);
});

describe "find" (fun () => {
  test "match" (fun () => 
    expect (Revamp.find "mangos and bananas" re) |> toEqual (Some "ang"));

  test "no match" (fun () => 
    expect (Revamp.find "apples and pears" re) |> toBe None);
});

describe "findIndex" (fun () => {
  test "match" (fun () => 
    expect (Revamp.findIndex "mangos and bananas" re) |> toEqual (Some (1, 4)));

  test "no match" (fun () => 
    expect (Revamp.findIndex "apples and pears" re) |> toBe None);
});

describe "replace" (fun () => {
  test "match" (fun () => 
    expect (Revamp.replace (fun _ => "foo") "mangos and bananas" re) |> toEqual "mfooos and bfoos");

  test "no match" (fun () => 
    expect (Revamp.replace (fun _ => "foo") "apples and pears" re) |> toEqual "apples and pears");

  test "capture" (fun () => 
    expect (Revamp.replace (fun _ => "[$1]") "mangos and bananas" re) |> toEqual "mfooos and bfoos");

});

describe "split" (fun () => {
  let re = Revamp.compile " |!";
  test "match" (fun () => 
    expect (Revamp.split "bang bang bananabatman!" re) |> toEqual ([|"bang", "bang", "bananabatman", ""|]));

  test "no match" (fun () => 
    expect (Revamp.split "apples" re) |> toEqual [|"apples"|]);
});
