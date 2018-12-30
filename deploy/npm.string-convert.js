(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.string-convert"],{BJfS:
/*!*****************************************************!*\
  !*** ./node_modules/string-convert/camel2hyphen.js ***!
  \*****************************************************/
/*! no static exports found */function(module,exports){eval("var camel2hyphen = function (str) {\n  return str\n          .replace(/[A-Z]/g, function (match) {\n            return '-' + match.toLowerCase();\n          })\n          .toLowerCase();\n};\n\nmodule.exports = camel2hyphen;\n\n//# sourceURL=webpack:///./node_modules/string-convert/camel2hyphen.js?")}}]);