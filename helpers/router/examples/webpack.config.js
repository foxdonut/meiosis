/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const modes = ["hash", "history"];
const examples = ["generic-router", "mithril-router"];
const configs = [];

const createConfig = (mode, example) => ({
  mode: "development",
  entry: `./${mode}-mode/${example}/src/index.js`,
  output: {
    path: path.join(
      __dirname,
      `${mode}-mode/${example}/build`
    ),
    filename: `generated-app.js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "./index-template.html",
      filename: "index.html",
      chunks: [],
      mode,
      example
    })
  ],
  resolve: {
    extensions: [".js"],
    // This is so that router-setup-common can find peerDependencies
    alias: {
      mithril: path.resolve("./node_modules/mithril")
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
});

modes.forEach((mode) =>
  examples.forEach((example) => {
    configs.push(createConfig(mode, example));
  })
);

configs.push(
  Object.assign(createConfig("hash", "using-typescript"), {
    entry: "./hash-mode/using-typescript/src/index.ts",
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        mithril: path.resolve("./node_modules/mithril")
      }
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
  })
);

module.exports = configs;
