/*global process*/
var isProd = process.env.NODE_ENV === "prod";

var webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: isProd ? "meiosis.min.js" : "meiosis.js",
    library: "meiosis",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ] : []
};
