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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3099;
    app.enableCors();
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    await app.listen(port);
    console.log(`Listening on port ${port}`);
}
bootstrap();


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("578740e15b703dbf16ad")
/******/ })();
/******/ 
/******/ }
;