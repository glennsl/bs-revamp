'use strict';

var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.js");
var Revamp = require("../src/Revamp.js");
var Benchmark = require("benchmark");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var input = "\n  <html>\n    <head>\n      <title>A Simple HTML Document</title>\n    </head>\n    <body>\n      <p>This is a very simple HTML document</p>\n      <p>It only has two paragraphs</p>\n    </body>\n  </html>\n";

new Benchmark.Suite("tags").add("Sequence", (function (param) {
              return Rebase.Seq.forEach((function (prim) {
                            
                          }), Revamp.matches("<p\\b[^>]*>(.*?)<\\/p>", {
                              hd: /* IgnoreCase */0,
                              tl: /* [] */0
                            }, input));
            })).add("Array", (function (param) {
            var result = input.match(/<p\b[^>]*>(.*?)<\/p>/gi);
            if (result !== null) {
              (
                  result === null ? undefined : Caml_option.some(result)
                ).forEach(function (prim) {
                    
                  });
              return ;
            }
            
          })).on("cycle", (function ($$event) {
          console.log(String($$event.target));
          
        })).run();

exports.input = input;
/*  Not a pure module */
