'use strict';

var Revamp = require("../src/Revamp.js");

var code = "\n  let borderLeftColor = \"borderLeftColor\";\n  let borderRightColor = \"borderRightColor\";\n";

console.log(Revamp.replace("\"([^\"]*)\"", undefined, (function (param) {
            return Revamp.replace("[A-Z]", undefined, (function (letter) {
                          return ("-" + letter).toLowerCase();
                        }), param);
          }), code));

exports.code = code;
/*  Not a pure module */
