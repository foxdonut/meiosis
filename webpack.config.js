/*global process*/
var isProduction = process.env.NODE_ENV === "production";
var webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: isProduction ? "meiosis.min.js" : "meiosis.js",
    library: "meiosis",
    libraryTarget: "commonjs2"
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
  plugins: isProduction ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
