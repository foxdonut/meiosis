/*global process*/
const fs = require('fs');
const fromDir = process.argv[2];
const toDir = process.argv[3];

const libMap = {
  flyd: 'https://unpkg.com/flyd@0.2.8/flyd.js',
  'lodash-fp': 'https://cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)',
  'meiosis-setup': 'https://unpkg.com/meiosis-setup',
  mergerino: 'https://unpkg.com/mergerino@0.4.0',
  mithril: 'https://unpkg.com/mithril@2.0.4',
  'mithril-stream': 'https://unpkg.com/mithril@2.0.4/stream/stream.js',
  preact: 'https://unpkg.com/preact@10.7.2/dist/preact.umd.js',
  react: 'https://unpkg.com/react@18.1.0/umd/react.development.js',
  'react-dom': 'https://unpkg.com/react-dom@18.1.0/umd/react-dom.development.js'
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
      const config = JSON.parse(parts[1]);

      const files = config.files.split(',');
      const fileContents = files.map((longfilename) => {
        let filename = null;
        let shortname = null;
        const asIndex = longfilename.indexOf('#as#');
        if (asIndex >= 0) {
          filename = longfilename.substring(0, asIndex);
          shortname = longfilename.substring(asIndex + 4);
        } else {
          filename = longfilename;
          shortname = longfilename.substring(
            longfilename.lastIndexOf('/') + 1
          );
        }
        const file = JSON.stringify(
          fs.readFileSync(filename, 'ascii')
        );
        let compiler = '';
        if (shortname.endsWith('jsx')) {
          shortname = shortname.substring(
            0,
            shortname.length - 1
          );
        }
        if (shortname.endsWith('js')) {
          compiler = ', compiler: "babel"';
        }
        return `{name: "${shortname}", content: ${file}${compiler}}`;
      });
      const fileString = '[' + fileContents.join(',') + ']';

      let libs = config.libs ? config.libs.split(',') : [];
      const libContents = libs.map((lib) => {
        const url = libMap[lib];
        return `{name: "${lib}", type: "js", url: "${url}"}`;
      });
      const libString = '[' + libContents.join(',') + ']';

      let style = ' style="';
      if (config.height) {
        style += ' height:' + config.height + 'px;';
      }
      if (config.hidden) {
        style += ' display: none;';
      }
      style += '"';

      const middle = config.middle || 75;

      line =
        (config.hidden
          ? `<div style="margin-bottom: 24px;"><a href="javascript:"
             onclick="this.style.display='none';document.getElementById('flems${flemNumber}').style.display='block'"
             >Show solution</a></div>`
          : '') +
        `<div id="flems${flemNumber}" class="flemscode"${style}></div>
  <script>
    window.Flems(flems${flemNumber}, {
      files: ${fileString},
      links: ${libString},
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
