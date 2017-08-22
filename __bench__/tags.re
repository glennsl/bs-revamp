let input = {|
  <html>
    <head>
      <title>A Simple HTML Document</title>
    </head>
    <body>
      <p>This is a very simple HTML document</p>
      <p>It only has two paragraphs</p>
    </body>
  </html>
|};
  
let () =
  Benchmark.(
    makeSuite "tags"
    |> add "Sequence" (fun () =>
      input |> Revamp.matches "<p\\b[^>]*>(.*?)<\\/p>" flags::[Revamp.IgnoreCase]
            |> Sequence.forEach ignore
    )
    |> add "Array" (fun () =>
      input |> Js.String.match_ [%re "/<p\\b[^>]*>(.*?)<\\/p>/gi"]
            |> fun | Some result => result |> Array.iter ignore
                   | None => ()
    )
    |> on "cycle" (fun event => 
      Js.log (Js.String.make event##target)
    )
    |> run ()
  );