/*global __dirname*/
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "generated-app.js"
  },
  resolve: {
    extensions: [".js"],
    // This is so that routing-common can find peerDependencies
    alias: {
      "meiosis-routing": path.resolve("./node_modules/meiosis-routing"),
      mergerino: path.resolve("./node_modules/mergerino")
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
