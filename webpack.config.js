/*global process*/
var isProd = process.env.NODE_ENV === "prod";

var webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: isProd ? "meiosis.min.js" : "meiosis.js",
    library: "meiosis",
    libraryTarget: "var"
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
  ts: {
    compilerOptions: {
      declaration: false
    }
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
