/*global process*/
const fs = require('fs');
const fromDir = process.argv[2];
const toDir = process.argv[3];

const linkMap = {
  flyd: 'https://unpkg.com/flyd@0.2.8/flyd.js',
  lodash: 'https://unpkg.com/lodash@4.17.10',
  mergerino: 'https://unpkg.com/mergerino@0.4.0',
  mithril: 'https://unpkg.com/mithril@2.0.0-rc.3',
  'mithril-stream':
    'https://unpkg.com/mithril@2.0.0-rc.3/stream/stream.js',
  preact: 'https://unpkg.com/preact@10.3.4/dist/preact.umd.js',
  preactHooks:
    'https://unpkg.com/preact@10.3.4/hooks/dist/hooks.umd.js',
  react:
    'https://unpkg.com/react@16.13.1/umd/react.development.js',
  'react-dom':
    'https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js'
};

const filenames = fs.readdirSync(fromDir);

filenames.forEach((source) => {
  const input = fs.readFileSync(
    fromDir + '/' + source,
    'ascii'
  );
  let lines = input.split('\n');
  let flemNumber = 1;

  lines = lines.map(function (line) {
    if (line.startsWith('@flems')) {
      const parts = line.split(' ');

      const files = parts[1].split(',');
      const fileContents = files.map((filename) => {
        const file = JSON.stringify(
          fs.readFileSync(filename, 'ascii')
        );
        let shortname = filename.substring(
          filename.lastIndexOf('/') + 1
        );
        let compiler = '';
        if (shortname.endsWith('jsx')) {
          compiler = ', compiler: "babel"';
          shortname = shortname.substring(
            0,
            shortname.length - 1
          );
        }
        return `{name: "${shortname}", content: ${file}${compiler}}`;
      });
      const fileString = '[' + fileContents.join(',') + ']';

      let links = parts.length > 2 ? parts[2].split(',') : [];
      if (links.length === 1 && links[0] === '[]') {
        links = [];
      }
      const linkContents = links.map((link) => {
        const url = linkMap[link];
        return `{name: "${link}", type: "js", url: "${url}"}`;
      });
      const linkString = '[' + linkContents.join(',') + ']';

      let style = ' style="';
      if (parts.length > 3) {
        style += ' height:' + parts[3] + 'px;';
      }

      const hidden = parts.length > 4 && parts[4] === 'hidden';
      if (hidden) {
        style += ' display: none;';
      }
      style += '"';

      let middle = '75';
      if (parts.length > 5) {
        middle = parts[5];
      }

      line =
        (hidden
          ? `<div style="margin-bottom: 24px;"><a href="javascript:"
             onclick="this.style.display='none';document.getElementById('flems${flemNumber}').style.display='block'"
             >Show solution</a></div>`
          : '') +
        `<div id="flems${flemNumber}" class="flemscode"${style}></div>
  <script>
    window.Flems(flems${flemNumber}, {
      files: ${fileString},
      links: ${linkString},
      middle: ${middle}
    })
  </script>
      `;

      flemNumber++;
    }
    return line;
  });

  const dest = toDir + '/' + source;
  fs.writeFileSync(dest, lines.join('\n'));
});
