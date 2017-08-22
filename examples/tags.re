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
  input |> Revamp.matches "<p\\b[^>]*>(.*?)<\\/p>" flags::[Revamp.IgnoreCase]
        |> Sequence.forEach Js.log;
  