"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var express_1 = tslib_1.__importDefault(require("express"));
var frontendMiddleware_1 = tslib_1.__importDefault(require("./middlewares/frontendMiddleware"));
var webpack_front_dev_1 = tslib_1.__importDefault(require("../../webpack/webpack.front.dev"));
var runningDir = process.cwd();
var app = express_1["default"]();
frontendMiddleware_1["default"](app, path_1["default"].join(runningDir, 'build/front/index.html'), path_1["default"].join(runningDir, 'build/front/'), webpack_front_dev_1["default"]);
var port = Number(process.env.PORT) || 8080;
var server = app.listen(port, function () {
    console.log("Server started and listening on port:" + port);
});
function shutdown() {
    server.close(function () {
        console.log('Server successfully closed');
    });
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
