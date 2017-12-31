
let () =
  "baNAna" |> Revamp.matches("(na)+", ~flags=[Revamp.IgnoreCase])
           |> Sequence.forEach(Js.log);
