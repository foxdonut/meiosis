/*global requirejs*/
requirejs.config({
  paths: {
    "classnames": "/public/lib/classnames.min",
    "history": "/public/lib/history.min",
    "meiosis": "/public/lib/meiosis.min",
    "meiosis-mithril": "/public/lib/meiosis-mithril.min",
    "meiosis-react": "/public/lib/meiosis-react.min",
    "meiosis-snabbdom": "/public/lib/meiosis-snabbdom.min",
    "meiosis-vanillajs": "/public/lib/meiosis-vanillajs.min",
    "meiosis-tracer": "/public/lib/meiosis-tracer.min",
    "mithril": "/public/lib/mithril.min",
    "union-type": "/public/lib/union-type"
  },
  map: {
    "*": {
      "m": "mithril"
    }
  }
});
