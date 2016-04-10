module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    filename: "meiosis.js",
    library: "meiosis",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
