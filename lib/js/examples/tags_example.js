'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Revamp = require("../src/Revamp.js");

var input = "\n  <html>\n    <head>\n      <title>A Simple HTML Document</title>\n    </head>\n    <body>\n      <p>This is a very simple HTML document</p>\n      <p>It only has two paragraphs</p>\n    </body>\n  </html>\n";

Rebase.Seq.forEach((function (prim) {
        console.log(prim);
        
      }), Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", {
          hd: /* IgnoreCase */0,
          tl: /* [] */0
        }, input));

exports.input = input;
/*  Not a pure module */
