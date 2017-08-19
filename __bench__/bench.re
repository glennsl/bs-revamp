
let re = Revamp.compile "(na)+";

let () = Benchmark.(
  makeSuite "iterate"
  |> add "Revamp.forEach" (fun () => {
    re |> Revamp.matches "bananas"
       |> Sequence.forEach ignore
  })
  |> add "Imperative" (fun () => {
    let break = ref false;
    while (not !break) {
      switch (re |> Js.Re.exec "bananas") {
      | None => break := true
      | Some result =>
        let _ = (Js.Re.matches result).(0);
      }
    }
  })
  |> on "cycle" (fun event => 
    Js.log (Js.String.make event##target)
  )
  |> run ()
);