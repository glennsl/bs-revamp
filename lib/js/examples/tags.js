'use strict';

var Revamp   = require("../src/revamp.js");
var Sequence = require("../src/sequence.js");

var input = "\n  <html>\n    <head>\n      <title>A Simple HTML Document</title>\n    </head>\n    <body>\n      <p>This is a very simple HTML document</p>\n      <p>It only has two paragraphs</p>\n    </body>\n  </html>\n";

Sequence.forEach((function (prim) {
        console.log(prim);
        return /* () */0;
      }), Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", /* Some */[/* :: */[
            /* IgnoreCase */0,
            /* [] */0
          ]], input));

exports.input = input;
/*  Not a pure module */
