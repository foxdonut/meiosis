/*global process*/
var isProd = process.env.NODE_ENV === "prod";
var isDev = process.env.NODE_ENV === "dev";
var isLib = !(isProd || isDev);

var webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: isLib ? "./lib" : "./dist",
    filename: isProd ? "meiosis.min.js" : "meiosis.js",
    library: "meiosis",
    libraryTarget: isLib ? "commonjs2" : "var"
  },
  resolve: {
    extensions: ["", ".js", ".ts"]
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: "ts",
        test: /\.ts$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
