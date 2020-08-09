/* global __dirname */
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "no-deps": "./src/index-no-deps.js",
    "with-lib": "./src/index-with-lib.js"
  },
  output: {
    path: __dirname,
    filename: "build-[name]/generated-app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ["no-deps"],
      template: "../../index-template.html",
      filename: "index-no-deps.html",
      mode: "Hash",
      title: "Pattern Setup",
      type: "no-deps"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ["with-lib"],
      template: "../../index-template.html",
      filename: "index-with-lib.html",
      mode: "Hash",
      title: "Pattern Setup",
      type: "with-lib"
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
