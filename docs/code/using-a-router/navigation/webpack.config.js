/*global __dirname*/
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "generated-app.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    // This is so that routing-common can find peerDependencies
    alias: {
      "patchinko": path.resolve("./node_modules/patchinko"),
      "static-tagged-union": path.resolve("./node_modules/static-tagged-union")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
