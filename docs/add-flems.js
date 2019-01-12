/*global process*/
var fs = require("fs");
var fromDir = process.argv[2];
var toDir = process.argv[3];

var linkMap = {
  "bss": "https://unpkg.com/bss@1.3.0/bss.js",
  "datepicker": "https://raw.githubusercontent.com/fengyuanchen/datepicker/master/dist/datepicker.min.js",
  "flyd": "https://unpkg.com/flyd@0.2.8/flyd.js",
  "jquery": "https://unpkg.com/jquery@3.3.1/dist/jquery.js",
  "lodash": "https://unpkg.com/lodash@4.17.10",
  "lodash-fp": "https://cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)",
  "meiosis-tracer": "https://unpkg.com/meiosis-tracer@2.0.2/dist/meiosis-tracer.js",
  "mithril": "https://unpkg.com/mithril@2.0.0-rc.3",
  "mithril-stream": "https://unpkg.com/mithril@2.0.0-rc.3/stream/stream.js",
  "patchinko": "https://unpkg.com/patchinko@4.1.0/explicit.js",
  "ramda": "https://unpkg.com/ramda@0.25.0/dist/ramda.min.js",
  "react": "https://unpkg.com/react@16.7.0/umd/react.development.js",
  "react-dom": "https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js"
};

var filenames = fs.readdirSync(fromDir);

filenames.forEach(source => {
  var input = fs.readFileSync(fromDir + "/" + source, "ascii");
  var lines = input.split("\n");
  var flemNumber = 1;

  lines = lines.map(function(line) {
    if (line.startsWith("@flems")) {
      var parts = line.split(" ");

      var files = parts[1].split(",");
      var fileContents = files.map(longfilename => {
        var filename = null;
        var shortname = null;
        var asIndex = longfilename.indexOf("#as#");
        if (asIndex >= 0) {
          filename = longfilename.substring(0, asIndex);
          shortname = longfilename.substring(asIndex + 4);
        }
        else {
          filename = longfilename;
          shortname = longfilename.substring(longfilename.lastIndexOf("/") + 1);
        }
        var file = JSON.stringify(fs.readFileSync(filename, "ascii"));
        var compiler = "";
        if (shortname.endsWith("jsx")) {
          shortname = shortname.substring(0, shortname.length - 1);
        }
        if (shortname.endsWith("js")) {
          compiler = ", compiler: \"babel\"";
        }
        return `{name: "${shortname}", content: ${file}${compiler}}`;
      });
      var fileString = "[" + fileContents.join(",") + "]";

      var links = parts.length > 2 ? parts[2].split(",") : [];
      if (links.length === 1 && links[0] === "[]") {
        links = [];
      }
      var linkContents = links.map(link => {
        var url = linkMap[link];
        return `{name: "${link}", type: "js", url: "${url}"}`;
      });
      var linkString = "[" + linkContents.join(",") + "]";

      var style = "";
      if (parts.length > 3) {
        style = " style=\"height:" + parts[3] + "px\"";
      }
      var middle = "75";
      if (parts.length > 4) {
        middle = parts[4];
      }
      var selected = "";
      if (parts.length > 5) {
        selected = "selected: '" + parts[5] + "',";
      }

      line = `
  <div id="flems${flemNumber}" class="flemscode"${style}></div>

  <script>
    window.Flems(flems${flemNumber}, {
      files: ${fileString},
      links: ${linkString},
      middle: ${middle},
      ${selected}
      autoFocus: false
    })
  </script>
      `;

      flemNumber++;
    }
    return line;
  });

  var dest = toDir + "/" + source;
  fs.writeFileSync(dest, lines.join("\n"));
});
