(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.hyphenate-style-name"],{MAmL:
/*!****************************************************!*\
  !*** ./node_modules/hyphenate-style-name/index.js ***!
  \****************************************************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval("\n\nvar uppercasePattern = /[A-Z]/g;\nvar msPattern = /^ms-/;\nvar cache = {};\n\nfunction hyphenateStyleName(string) {\n    return string in cache\n    ? cache[string]\n    : cache[string] = string\n      .replace(uppercasePattern, '-$&')\n      .toLowerCase()\n      .replace(msPattern, '-ms-');\n}\n\nmodule.exports = hyphenateStyleName;\n\n\n//# sourceURL=webpack:///./node_modules/hyphenate-style-name/index.js?")}}]);