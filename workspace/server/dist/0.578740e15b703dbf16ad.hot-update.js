"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const httpException_filter_1 = __webpack_require__(18);
const success_interceptor_1 = __webpack_require__(19);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3099;
    app.enableCors();
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new success_interceptor_1.SuccessInterceptor());
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    await app.listen(port);
    console.log(`Listening on port ${port}`);
}
bootstrap();


/***/ }),

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
        console.log(response.get("statusCode"));
        console.log(response.get("status"));
        return next.handle().pipe((0, rxjs_1.map)((data) => ({ data, error: null, statusCode: 200 })));
    }
};
SuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], SuccessInterceptor);
exports.SuccessInterceptor = SuccessInterceptor;


/***/ }),

/***/ 20:
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("87ac63443336db6ac52b")
/******/ })();
/******/ 
/******/ }
;