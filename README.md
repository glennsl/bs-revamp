
# bs-re:vamp

An experimental safe and functional API for JavaScript regexes

## Example

```reason
let () =
  "baNAna" |> Revamp.matches "(na)+" flags::[Revamp.IgnoreCase]
           |> Sequence.forEach (fun m => Js.log m);
```

## Goals

* A sane, safe API
* Low performance overhead (secondary)

## Non-goals

* Full feature parity

## Changes

### Next
* Changed type of `captures` from `Sequence.t(array(string))` to `Sequence.t(list(option(string)))` because the former was unsound.
* Added `Match.match` and `Match.captures`
* Deprecated `Match.matches` due to being unsound
