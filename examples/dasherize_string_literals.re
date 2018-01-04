/**
 * Dasherize camelCased identifiers inside string literals
 */

let code = {|
  let borderLeftColor = "borderLeftColor";
  let borderRightColor = "borderRightColor";
|};

code |> Revamp.replace({|"([^"]+)"|},                /* Matches the content of string literals */
          Revamp.replace("[A-Z]", letter =>          /* Matches uppercase letters */
            "-" ++ letter |> Js.String.toLowerCase)) /* Convert to lower case and prefix with a dash */
     |> Js.log;

/* Outputs:

  let borderLeftColor = "border-left-color";
  let borderRightColor = "border-right-color";
*/