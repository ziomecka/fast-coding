(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.keycode"],{"3zPy":
/*!***************************************!*\
  !*** ./node_modules/keycode/index.js ***!
  \***************************************/
/*! no static exports found */function(module,exports){eval("// Source: http://jsfiddle.net/vWx8V/\n// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes\n\n/**\n * Conenience method returns corresponding value for given keyName or keyCode.\n *\n * @param {Mixed} keyCode {Number} or keyName {String}\n * @return {Mixed}\n * @api public\n */\n\nfunction keyCode(searchInput) {\n  // Keyboard Events\n  if (searchInput && 'object' === typeof searchInput) {\n    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode\n    if (hasKeyCode) searchInput = hasKeyCode\n  }\n\n  // Numbers\n  if ('number' === typeof searchInput) return names[searchInput]\n\n  // Everything else (cast to string)\n  var search = String(searchInput)\n\n  // check codes\n  var foundNamedKey = codes[search.toLowerCase()]\n  if (foundNamedKey) return foundNamedKey\n\n  // check aliases\n  var foundNamedKey = aliases[search.toLowerCase()]\n  if (foundNamedKey) return foundNamedKey\n\n  // weird character?\n  if (search.length === 1) return search.charCodeAt(0)\n\n  return undefined\n}\n\n/**\n * Compares a keyboard event with a given keyCode or keyName.\n *\n * @param {Event} event Keyboard event that should be tested\n * @param {Mixed} keyCode {Number} or keyName {String}\n * @return {Boolean}\n * @api public\n */\nkeyCode.isEventKey = function isEventKey(event, nameOrCode) {\n  if (event && 'object' === typeof event) {\n    var keyCode = event.which || event.keyCode || event.charCode\n    if (keyCode === null || keyCode === undefined) { return false; }\n    if (typeof nameOrCode === 'string') {\n      // check codes\n      var foundNamedKey = codes[nameOrCode.toLowerCase()]\n      if (foundNamedKey) { return foundNamedKey === keyCode; }\n    \n      // check aliases\n      var foundNamedKey = aliases[nameOrCode.toLowerCase()]\n      if (foundNamedKey) { return foundNamedKey === keyCode; }\n    } else if (typeof nameOrCode === 'number') {\n      return nameOrCode === keyCode;\n    }\n    return false;\n  }\n}\n\nexports = module.exports = keyCode;\n\n/**\n * Get by name\n *\n *   exports.code['enter'] // => 13\n */\n\nvar codes = exports.code = exports.codes = {\n  'backspace': 8,\n  'tab': 9,\n  'enter': 13,\n  'shift': 16,\n  'ctrl': 17,\n  'alt': 18,\n  'pause/break': 19,\n  'caps lock': 20,\n  'esc': 27,\n  'space': 32,\n  'page up': 33,\n  'page down': 34,\n  'end': 35,\n  'home': 36,\n  'left': 37,\n  'up': 38,\n  'right': 39,\n  'down': 40,\n  'insert': 45,\n  'delete': 46,\n  'command': 91,\n  'left command': 91,\n  'right command': 93,\n  'numpad *': 106,\n  'numpad +': 107,\n  'numpad -': 109,\n  'numpad .': 110,\n  'numpad /': 111,\n  'num lock': 144,\n  'scroll lock': 145,\n  'my computer': 182,\n  'my calculator': 183,\n  ';': 186,\n  '=': 187,\n  ',': 188,\n  '-': 189,\n  '.': 190,\n  '/': 191,\n  '`': 192,\n  '[': 219,\n  '\\\\': 220,\n  ']': 221,\n  \"'\": 222\n}\n\n// Helper aliases\n\nvar aliases = exports.aliases = {\n  'windows': 91,\n  '⇧': 16,\n  '⌥': 18,\n  '⌃': 17,\n  '⌘': 91,\n  'ctl': 17,\n  'control': 17,\n  'option': 18,\n  'pause': 19,\n  'break': 19,\n  'caps': 20,\n  'return': 13,\n  'escape': 27,\n  'spc': 32,\n  'spacebar': 32,\n  'pgup': 33,\n  'pgdn': 34,\n  'ins': 45,\n  'del': 46,\n  'cmd': 91\n}\n\n/*!\n * Programatically add the following\n */\n\n// lower case chars\nfor (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32\n\n// numbers\nfor (var i = 48; i < 58; i++) codes[i - 48] = i\n\n// function keys\nfor (i = 1; i < 13; i++) codes['f'+i] = i + 111\n\n// numpad keys\nfor (i = 0; i < 10; i++) codes['numpad '+i] = i + 96\n\n/**\n * Get by code\n *\n *   exports.name[13] // => 'Enter'\n */\n\nvar names = exports.names = exports.title = {} // title for backward compat\n\n// Create reverse mapping\nfor (i in codes) names[codes[i]] = i\n\n// Add aliases\nfor (var alias in aliases) {\n  codes[alias] = aliases[alias]\n}\n\n\n//# sourceURL=webpack:///./node_modules/keycode/index.js?")}}]);