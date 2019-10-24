"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var path_1 = tslib_1.__importDefault(require("path"));
var webpack_1 = tslib_1.__importDefault(require("webpack"));
var webpack_dev_middleware_1 = tslib_1.__importDefault(require("webpack-dev-middleware"));
function setupFrontendMiddleware(app, pathToIndex, pathToAssets, webpackConfig) {
    if (process.env.NODE_ENV === 'production') {
        app.use('/', express_1["default"].static(pathToAssets));
        app.get('*', function (req, res) {
            res.sendFile(pathToIndex);
        });
    }
    else {
        var compiler_1 = webpack_1["default"](tslib_1.__assign({}, webpackConfig));
        var middleware = webpack_dev_middleware_1["default"](compiler_1, {
            logLevel: 'trace',
            publicPath: '/',
            stats: 'minimal'
        });
        app.use(middleware);
        var fs_1 = middleware.fileSystem;
        app.get('*', function (req, res) {
            fs_1.readFile(path_1["default"].join(compiler_1.outputPath, 'index.html'), function (err, file) {
                if (err) {
                    res.sendStatus(404);
                }
                else {
                    res.send(file.toString());
                }
            });
        });
    }
}
exports["default"] = setupFrontendMiddleware;
