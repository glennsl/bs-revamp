'use strict';

var Revamp = require("../src/Revamp.js");

var code = "\n  let borderLeftColor = \"borderLeftColor\";\n  let borderRightColor = \"borderRightColor\";\n";

console.log(Revamp.replace("\"([^\"]*)\"", /* None */0, (function (param) {
            return Revamp.replace("[A-Z]", /* None */0, (function (letter) {
                          return ("-" + letter).toLowerCase();
                        }), param);
          }), code));

exports.code = code;
/*  Not a pure module */
