open Jest;
open Expect;

let seq = Sequence.(fun () => Cons 876 (fun () => Cons 564 (fun () => Nil)));

let () =

describe "forEach" (fun () => {
  test "..." (fun () => {
    let results = [||];

    Sequence.forEach (fun elt => Js.Array.push elt results) seq;

    expect results |> toEqual [|876, 564|]
  });
});