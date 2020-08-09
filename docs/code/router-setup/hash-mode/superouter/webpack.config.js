/*global __dirname*/
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "no-deps": "./src/index-no-deps.js",
    lib: "./src/index-lib.js"
  },
  output: {
    path: __dirname,
    filename: "build/generated-app-[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ["no-deps"],
      template: "./index.html",
      filename: "./index.html",
      title: "no deps"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ["lib"],
      template: "./index.html",
      filename: "./index-lib.html",
      title: "lib"
    })
  ],
  resolve: {
    extensions: [".js"],
    // This is so that routing-common can find peerDependencies
    alias: {
      mithril: path.resolve("./node_modules/mithril")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
