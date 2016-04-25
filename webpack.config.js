module.exports = {
  entry: "./src/index.ts",
  output: {
    path: "./dist",
    filename: "meiosis.js",
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
  }
};
