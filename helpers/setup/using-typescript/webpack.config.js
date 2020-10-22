/*global __dirname*/
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "generated-app.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "awesome-typescript-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "source-map-loader"
        }
      }
    ]
  }
};
