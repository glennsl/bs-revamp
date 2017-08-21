
# bs-re:vamp

An experimental safe and functional API for JavaScript regexes

## Example

```reason
let () =
  "baNAna" 
  |> Revamp.matches "(na)+" flags::[Revamp.IgnoreCase]
  |> Sequence.forEach (fun m _ _ => Js.log m);
```

## Goals

* A sane, safe API
* Low performance overhead (secondary)

## Non-goals

* Full feature parity

