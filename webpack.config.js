module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    filename: "meiosis.js"
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
