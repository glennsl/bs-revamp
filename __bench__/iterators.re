[@bs.set] external _setLastIndex : (Js.Re.t, int) => unit = "lastIndex";

let re = [%re "/(na)+/g"];

module Seq = {
  open Sequence;

  let rec forEach = (f, seq) =>
    switch (seq()) {
    | Nil => ()
    | Cons(element, next) =>
      f(element);
      forEach(f, next);
    };

  let rec map = (f, seq) =>
    switch (seq()) {
    | Nil => () => Nil
    | Cons(element, next) => () => Cons(f(element), map(f, next))
    };

  let exec = (input, re) => {
    let rec next = start => () => {
      _setLastIndex(re, start);
      switch (re |> Js.Re.exec(input)) {
      | None => Nil
      | Some(result) =>
        let nextIndex = Js.Re.lastIndex(re);
        _setLastIndex(re, 0);
        Cons(result, next(nextIndex));
      };
    };
    next(0);
  };

  let matches = (input, re) =>
    re |> exec(input)
       |> map(result => Array.unsafe_get(result |> Js.Re.matches, 0));
};

module Gen = {
  type t('a) = unit => option('a);

  let exec = (input, re) => {
    let nextIndex = ref(0);
    () => {
      _setLastIndex(re, nextIndex^);
      switch (re |> Js.Re.exec(input)) {
      | None => None
      | Some(result) =>
        nextIndex := Js.Re.lastIndex(re);
        _setLastIndex(re, 0);
        Some(result);
      };
    };
  };

  let rec forEach = (f, gen) =>
    switch (gen()) {
    | None => ()
    | Some(element) =>
      f(element);
      forEach(f, gen);
    };
};

module Internal = {
  let rec forEach = (f, input, re) =>
    switch (re |> Js.Re.exec("bananas")) {
    | None => ()
    | Some(result) =>
      f(result);
      forEach(f, input, re);
    };
};

let run = () => Benchmark.(
  makeSuite("iterators")
  |> add("Imperative (baseline)", () => {
      let break = ref(false);
      while (!break^) {
        switch (re |> Js.Re.exec("bananas")) {
        | None => break := true
        | Some(result) =>
          let _: string = Js.Re.matches(result)[0]
        }
      }
    })
  |> add("Seq", () =>
      re |> Seq.exec("bananas")
         |> Seq.forEach(ignore)
     )
  |> add("Seq + map", () =>
      re |> Seq.matches("bananas")
         |> Seq.forEach(ignore)
     )
  |> add("Gen", () =>
      re |> Gen.exec("bananas")
         |> Gen.forEach(ignore)
     )
  |> add("Internal", () =>
      re |> Internal.forEach(ignore, "bananas")
  )
  |> on("cycle", event => Js.log(Js.String.make(event##target)))
  |> run()
);
