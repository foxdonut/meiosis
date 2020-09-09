/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const modes = ["hash", "history"];
const types = ["no-lib", "with-lib"];
const examples = {
  "no-lib": ["pattern-setup", "query-string", "programmatic-url", "mithril-router", "superouter"],
  "with-lib": ["programmatic-url", "mithril-router", "superouter"]
};
const configs = [];

modes.forEach(mode =>
  types.forEach(type =>
    examples[type].forEach(example =>
      configs.push({
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
          // This is so that routing-common can find peerDependencies
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
      })
    )
  )
);

module.exports = configs;
