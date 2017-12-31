'use strict';

var Revamp   = require("../src/revamp.js");
var Sequence = require("../src/sequence.js");

Sequence.forEach((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Revamp.matches("(na)+", /* Some */[/* :: */[
            /* IgnoreCase */0,
            /* [] */0
          ]], "baNAna"));

/*  Not a pure module */
