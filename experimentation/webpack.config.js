/*global process*/
module.exports = {
  entry: "./src/experimentation.js",
  output: {
    path: "./public",
    devtool: "source-map",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
