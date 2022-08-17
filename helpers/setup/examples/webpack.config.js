/*global __dirname*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require('path');

var directories = ['nested-components', 'view-mithril', 'view-preact', 'view-react'];

module.exports = directories.map((directory) => (
  {
    mode: 'development',
    entry: `./src/${directory}/index.ts`,
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'build'),
      filename: `${directory}-generated-app.js`
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'source-map-loader'
          }
        }
      ]
    }
  }
));
