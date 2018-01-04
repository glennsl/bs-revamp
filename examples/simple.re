
"baNAna" |> Revamp.matches("(na)+", ~flags=[Revamp.IgnoreCase])
          |> Rebase.Seq.forEach(Js.log);
