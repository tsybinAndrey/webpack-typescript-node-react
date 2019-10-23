"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var app = express_1["default"]();
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
