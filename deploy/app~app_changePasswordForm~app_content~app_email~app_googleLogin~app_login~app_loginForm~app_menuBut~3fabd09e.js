(window.webpackJsonp=window.webpackJsonp||[]).push([["app~app_changePasswordForm~app_content~app_email~app_googleLogin~app_login~app_loginForm~app_menuBut~3fabd09e"],{m7QI:
/*!***************************************!*\
  !*** ./src/shared/get.translation.ts ***!
  \***************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_localize_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-localize-redux */ "umvX");\n\n\nvar getTranslation = function getTranslation(localize, id, missingTranslationString) {\n  try {\n    return Object(react_localize_redux__WEBPACK_IMPORTED_MODULE_0__["getTranslations"])(localize)[id][Object(react_localize_redux__WEBPACK_IMPORTED_MODULE_0__["getLanguages"])(localize).findIndex(function (lang) {\n      return lang.code === Object(react_localize_redux__WEBPACK_IMPORTED_MODULE_0__["getActiveLanguage"])(localize).code;\n    })];\n  } catch (err) {\n    return missingTranslationString || \'Missing translation\';\n  }\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (getTranslation);\n\n//# sourceURL=webpack:///./src/shared/get.translation.ts?')}}]);