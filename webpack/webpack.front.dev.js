/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const runningDir = process.cwd();

module.exports = {
  mode: 'development',
  entry: path.join(process.cwd(), 'src/front/index.tsx'),

  output: {
    publicPath: '/',
    path: path.join(process.cwd(), 'build/front'),
    filename: 'bundle.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  // adding .ts and .tsx to resolve.extensions will
  // help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(runningDir, 'src/front/index.html'),
      favicon: path.join(runningDir, 'src/front/assets/favicon.ico'),
      inject: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
  ],

  devtool: 'eval-source-map',

  target: 'web',

  performance: {
    hints: false,
  },
};
