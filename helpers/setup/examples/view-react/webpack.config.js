/*global __dirname*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require('path');

module.exports = (
  {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'generated-app.js'
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
);
