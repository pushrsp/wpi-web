"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 19:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessInterceptor = void 0;
const common_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(20);
let SuccessInterceptor = class SuccessInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, rxjs_1.map)((data) => ({ data: data.data, error: null, statusCode: response.statusCode })));
    }
};
SuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], SuccessInterceptor);
exports.SuccessInterceptor = SuccessInterceptor;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("949a5464caa7efd2fa0b")
/******/ })();
/******/ 
/******/ }
;