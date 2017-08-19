open Jest;
open Expect;

let re = Revamp.compile "na";

let () =

describe "compile" (fun () => {
  () /* TODO */
});

describe "forEach" (fun () => {
  let run input => {
    let results = [||];
    re |> Revamp.matches input
       |> Sequence.forEach (fun m => Js.Array.push m results);
    results
  };

  test "match" (fun () =>
    expect (run "bananas") |> toEqual [|"na", "na"|]);

  test "no match" (fun () =>
    expect (run "apples") |> toEqual [||]);
});

describe "test" (fun () => {
  test "match" (fun () => 
    expect (Revamp.test "banana" re) |> toBe true);

  test "no match" (fun () => 
    expect (Revamp.test "apples" re) |> toBe false);
});

describe "count" (fun () => {
  test "match" (fun () => 
    expect (Revamp.count "banana" re) |> toBe 2);

  test "no match" (fun () => 
    expect (Revamp.count "apples" re) |> toBe 0);
});

describe "find" (fun () => {
  test "match" (fun () => 
    expect (Revamp.find "banana" re) |> toEqual (Some ("na", 2, [|"na"|])));

  test "no match" (fun () => 
    expect (Revamp.find "apples" re) |> toBe None);
});