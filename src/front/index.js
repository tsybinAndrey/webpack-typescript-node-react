"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
require("core-js/stable");
require("regenerator-runtime/runtime");
require("./index.css");
require("!file-loader?name=[name].[ext]!./assets/favicon.ico");
var React = tslib_1.__importStar(require("react"));
var ReactDOM = tslib_1.__importStar(require("react-dom"));
var App_1 = tslib_1.__importDefault(require("./components/App"));
ReactDOM.render(React.createElement(App_1["default"], null), document.getElementById('root'));