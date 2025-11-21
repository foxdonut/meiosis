/* global __dirname */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();
const PORT = 9000;
const ROOT = path.join(__dirname, '..');

// Paths for your static files
/*
const staticDirs = [
  path.join(ROOT, 'build'),
  path.join(ROOT, 'public')
];
*/

// Serve favicon as empty response
app.get('/favicon.ico', (_req, res) => res.status(204).end());
app.use(express.static(ROOT));

// Serve static files (JS, CSS, images, etc.)
/*
staticDirs.forEach((dir) => {
  app.use(express.static(dir));
});
*/

// Serve index.html for all other routes
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
