'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Revamp = require("../src/Revamp.js");

Rebase.Seq[/* forEach */8]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Revamp.matches("(na)+", /* Some */[/* :: */[
            /* IgnoreCase */0,
            /* [] */0
          ]], "baNAna"));

/*  Not a pure module */
