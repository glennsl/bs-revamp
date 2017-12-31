'use strict';

var $$Array   = require("bs-platform/lib/js/array.js");
var Revamp    = require("../src/revamp.js");
var Sequence  = require("../src/sequence.js");
var Benchmark = require("benchmark");

var input = "\n  <html>\n    <head>\n      <title>A Simple HTML Document</title>\n    </head>\n    <body>\n      <p>This is a very simple HTML document</p>\n      <p>It only has two paragraphs</p>\n    </body>\n  </html>\n";

new Benchmark.Suite("tags").add("Sequence", (function () {
              return Sequence.forEach((function () {
                            return /* () */0;
                          }), Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", /* Some */[/* :: */[
                                /* IgnoreCase */0,
                                /* [] */0
                              ]], input));
            })).add("Array", (function () {
            var param = input.match((/<p\b[^>]*>(.*?)<\/p>/gi));
            if (param !== null) {
              return $$Array.iter((function () {
                            return /* () */0;
                          }), param);
            } else {
              return /* () */0;
            }
          })).on("cycle", (function ($$event) {
          console.log(String($$event.target));
          return /* () */0;
        })).run();

exports.input = input;
/*  Not a pure module */
