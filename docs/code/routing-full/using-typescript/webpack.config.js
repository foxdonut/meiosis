/*global __dirname*/
// eslint-disable-next-line
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "generated-app.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
