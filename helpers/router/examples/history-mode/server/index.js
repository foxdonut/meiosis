/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const { html, mount, send } = require('paperplane');
const fs = require('fs');

const FILES = [
  '/build/generated-app.js',
  '/public/css/bootstrap-simplex.min.css'
];

const PORT = 9000;

const getHtmlContents = () =>
  new Promise((resolve) => {
    fs.readFile('./index.html', function(error, data) {
      if (error) {
        resolve(html('<html><body>An error occurred: ' + error + '</body></html>'));
      } else {
        resolve(html(data));
      }
    });
  });

const getFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(`.${file}`, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(file.indexOf('css') > 0
          ? ({ body: data, headers: { 'content-type': 'text/css' } })
          : send(data));
      }
    });
  });

const app = (req) =>
  req.url === '/favicon.ico'
    ? { body: '' }
    : FILES.includes(req.url)
    ? getFile(req.url)
    : getHtmlContents();

http.createServer(mount({ app })).listen(PORT);
console.log('listening on port', PORT);
