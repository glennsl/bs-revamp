open Jest;
open Expect;

let seq = Sequence.(() => Cons(876, () => Cons(564, () => Nil)));

let () =

describe("forEach", () =>
  test("...", () => {
    let results = [||];

    Sequence.forEach(elt => Js.Array.push(elt, results), seq);

    expect(results) |> toEqual([|876, 564|]);
  })
);
