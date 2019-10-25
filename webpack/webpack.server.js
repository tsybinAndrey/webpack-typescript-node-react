const webpack = require('webpack');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const fs = require('fs')
const nodeModules = {}

fs.readdirSync('node_modules').forEach(function (module) {
  if (module !== '.bin') {
    nodeModules[module] = true
  }
})

// this function is made to skip modules that are located in node_modules
const nodeModulesTransform = function(context, request, callback) {
  // search for a '/' indicating a nested module
  const slashIndex = request.indexOf("/");
  let rootModuleName;
  if (slashIndex == -1) {
    rootModuleName = request;
  } else {
    rootModuleName = request.substr(0, slashIndex);
  }

  // Match for root modules that are in our node_modules
  if (nodeModules.hasOwnProperty(rootModuleName)) {
    callback(null, "commonjs " + request);
  } else {
    callback();
  }
}

const runningDir = process.cwd();

module.exports = {
  mode: 'development',
  entry: path.join(runningDir, 'src/server/index.ts'),

  output: {
    path: path.join(runningDir, 'build/server'),
    filename: 'server.bundle.js',
  },

  // adding .ts and .js to resolve.extensions will
  // help babel look for .ts and .js files to transpile
  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      // we use babel-loader to load our ts|js files
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    // works only in webpack watch mode
    new NodemonPlugin(),
  ],

  node: false,

  target: 'node',

  devtool: 'source-map',

  performance: {
    hints: false,
  },

  externals: nodeModulesTransform,
}