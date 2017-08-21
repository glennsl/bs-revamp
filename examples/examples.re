
let () =
  "baNAna" |> Revamp.matches "(na)+" flags::[Revamp.IgnoreCase]
           |> Sequence.forEach (fun m => Js.log m);