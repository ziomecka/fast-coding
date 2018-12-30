(window.webpackJsonp=window.webpackJsonp||[]).push([["app~app_changePasswordForm~app_loginForm~app_newPasswordForm~app_newUserForm~app_remindPasswordForm~~ae3baaaf"],{"9dTN":
/*!******************************************!*\
  !*** ./src/app/Form/_duck/operations.ts ***!
  \******************************************/
/*! exports provided: onFormInvalid, onSendForm */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onFormInvalid", function() { return onFormInvalid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSendForm", function() { return onSendForm; });\n/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "UXZV");\n/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "ln6h");\n/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "eVuF");\n/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _FormHelperText_duck_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../FormHelperText/_duck/actions */ "xqdV");\n/* harmony import */ var _api___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api/ */ "p6Hd");\n/* harmony import */ var _applicationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @applicationTypes */ "GBKU");\n/* harmony import */ var _appTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @appTypes */ "NUGd");\n/* harmony import */ var _Notification_duck_operations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Notification/_duck/operations */ "SwzA");\n/* harmony import */ var _shared_history__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/history */ "cRQp");\n\n\n\n\nvar _this = undefined;\n\nvar __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {\n  return new (P || (P = _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator["throw"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : new P(function (resolve) {\n        resolve(result.value);\n      }).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\n\n\n\n\n\n\nvar app = _applicationTypes__WEBPACK_IMPORTED_MODULE_5__["ApplicationContainersEnum"].app;\nvar user = _appTypes__WEBPACK_IMPORTED_MODULE_6__["AppContainersEnum"].user;\nvar onFormInvalid = function onFormInvalid() {\n  return function (dispatch) {\n    return __awaiter(_this, void 0, void 0,\n    /*#__PURE__*/\n    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              return _context.abrupt("return", dispatch(Object(_FormHelperText_duck_actions__WEBPACK_IMPORTED_MODULE_3__["setFormHelperText"])(\'formInvalid\')));\n\n            case 1:\n            case "end":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n  };\n};\nvar onSendForm = function onSendForm(options) {\n  return function (dispatch, getState) {\n    return __awaiter(_this, void 0, void 0,\n    /*#__PURE__*/\n    _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {\n      var login, _options$success, success, redirectUrl, successNotification, errorNotifications, response, _ref, result;\n\n      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              /** Add login to each request */\n              // @ts-ignore\n              login = options.request.body.login, _options$success = options.success, success = _options$success.value, redirectUrl = _options$success.redirectUrl, successNotification = _options$success.successNotification, errorNotifications = _options$success.errorNotifications;\n\n              _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()(options.request.body, {\n                login: login || getState()[app][user].login\n              });\n              /** removes formInvalid message */\n\n\n              dispatch(Object(_FormHelperText_duck_actions__WEBPACK_IMPORTED_MODULE_3__["setFormHelperText"])(\'formBeingSent\'));\n              _context2.next = 5;\n              return Object(_api___WEBPACK_IMPORTED_MODULE_4__["post"])(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, options.request));\n\n            case 5:\n              response = _context2.sent;\n              _ref = response || null, result = _ref.result;\n\n              if (!(result === success)) {\n                _context2.next = 11;\n                break;\n              }\n\n              if (redirectUrl) _shared_history__WEBPACK_IMPORTED_MODULE_8__["default"].push(redirectUrl);\n              dispatch(Object(_Notification_duck_operations__WEBPACK_IMPORTED_MODULE_7__["onOpenNotification"])({\n                text: successNotification\n              }));\n              return _context2.abrupt("return", response);\n\n            case 11:\n              return _context2.abrupt("return", dispatch(Object(_FormHelperText_duck_actions__WEBPACK_IMPORTED_MODULE_3__["setFormHelperText"])(errorNotifications[result] || \'ERROR\')));\n\n            case 12:\n            case "end":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, this);\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/app/Form/_duck/operations.ts?')},C5Fv:
/*!********************************!*\
  !*** ./src/app/Form/styles.ts ***!
  \********************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "SUMQ");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "pu/U");\n\n\nvar styles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createStyles"])(function (theme) {\n  return {\n    FCForm: {\n      minWidth: _constants__WEBPACK_IMPORTED_MODULE_1__["FC_FORM_WIDTH"],\n      \'& div\': {\n        width: \'100%\'\n      }\n    },\n    FCFormButton: {\n      width: \'100%\'\n    }\n  };\n});\n/* harmony default export */ __webpack_exports__["default"] = (styles);\n\n//# sourceURL=webpack:///./src/app/Form/styles.ts?')},"pu/U":
/*!***********************************!*\
  !*** ./src/app/Form/constants.ts ***!
  \***********************************/
/*! exports provided: FC_FORM_WIDTH */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FC_FORM_WIDTH\", function() { return FC_FORM_WIDTH; });\nvar FC_FORM_WIDTH = '400px';\n\n//# sourceURL=webpack:///./src/app/Form/constants.ts?")},xqdV:
/*!*************************************************!*\
  !*** ./src/app/FormHelperText/_duck/actions.ts ***!
  \*************************************************/
/*! exports provided: setFormHelperText, actions */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFormHelperText", function() { return setFormHelperText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "e0OZ");\n\nvar APP_FORM_HELPER_TEXT_SET = _types__WEBPACK_IMPORTED_MODULE_0__["FormHelperTextActionsEnum"].APP_FORM_HELPER_TEXT_SET;\nvar setFormHelperText = function setFormHelperText(formHelperText) {\n  return {\n    type: APP_FORM_HELPER_TEXT_SET,\n    formHelperText: formHelperText\n  };\n};\nvar actions = {\n  setFormHelperText: setFormHelperText\n};\n;\n\n//# sourceURL=webpack:///./src/app/FormHelperText/_duck/actions.ts?')}}]);