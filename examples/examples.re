
let () =
  "baNAna" 
  |> Revamp.matches "(na)+" flags::[Revamp.IgnoreCase]
  |> Sequence.forEach (fun m _ _ => Js.log m);