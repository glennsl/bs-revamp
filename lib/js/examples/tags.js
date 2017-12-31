'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Revamp = require("../src/revamp.js");

var input = "\n  <html>\n    <head>\n      <title>A Simple HTML Document</title>\n    </head>\n    <body>\n      <p>This is a very simple HTML document</p>\n      <p>It only has two paragraphs</p>\n    </body>\n  </html>\n";

Rebase.Seq[/* forEach */8]((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", /* Some */[/* :: */[
            /* IgnoreCase */0,
            /* [] */0
          ]], input));

exports.input = input;
/*  Not a pure module */
