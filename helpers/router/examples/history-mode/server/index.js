const http = require('http');
const { html, mount, send } = require('paperplane');
const fs = require('fs');

const PORT = 8000;

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

const getGeneratedApp = () =>
  new Promise((resolve, reject) => {
    fs.readFile('./build/generated-app.js', function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(send(data));
      }
    });
  });

const app = (req) =>
  req.url === '/favicon.ico'
    ? { body: '' }
    : req.url === '/build/generated-app.js'
    ? getGeneratedApp()
    : getHtmlContents();

http.createServer(mount({ app })).listen(PORT);
console.log('listening on port', PORT);
