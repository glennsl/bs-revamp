'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Revamp = require("../src/Revamp.js");

Rebase.Seq.forEach((function (prim) {
        console.log(prim);
        
      }), Revamp.matches("(na)+", {
          hd: /* IgnoreCase */0,
          tl: /* [] */0
        }, "baNAna"));

/*  Not a pure module */
