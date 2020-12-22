/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const modes = ["hash", "history"];
const types = ["no-lib", "with-lib"];
const examples = [
  "pattern-setup",
  "query-string",
  "programmatic-url",
  "mithril-router",
  "superouter"
];
const configs = [];

const createConfig = (mode, type, example) => ({
  mode: "development",
  entry: `./${mode}-mode/${example}/src/index-${type}.js`,
  output: {
    path: path.join(__dirname, `${mode}-mode/${example}/build-${type}`),
    filename: `generated-app.js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "./index-template.html",
      filename: "index.html",
      chunks: [],
      mode,
      type,
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

modes.forEach(mode =>
  types.forEach(type =>
    examples.forEach(example => configs.push(createConfig(mode, type, example)))
  )
);

configs.push(
  Object.assign(createConfig("hash", "with-lib", "using-typescript"), {
    entry: "./hash-mode/using-typescript/src/index-with-lib.ts",
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
