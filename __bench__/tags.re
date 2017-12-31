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
    makeSuite("tags")
    |> add("Sequence", () =>
         input |> Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", ~flags=[Revamp.IgnoreCase])
               |> Rebase.Seq.forEach(ignore)
       )
    |> add("Array", () =>
         input |> Js.String.match([%re "/<p\\b[^>]*>(.*?)<\\/p>/gi"])
                |> fun | Some(result) => result |> Js.Array.forEach(ignore)
                       | None => ()
       )
    |> on("cycle", event => Js.log(Js.String.make(event##target)))
    |> run()
  );
