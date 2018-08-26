/* global m, O, createApp, prefix, HomePage */

// Meiosis Pattern Setup
const update = m.stream();
const App = createApp(update);
const models = m.stream.scan(O, { pageId: HomePage }, update);

const element = document.getElementById("app");
m.route.prefix(prefix);
m.route(element, "/", Object.keys(App.navigator.routes).reduce((result, route) => {
  result[route] = {
    onmatch: (params, url) =>
      App.navigator.onnavigate(App.navigator.routes[route], params, url),
    render: () => m(App, { model: models() })
  };
  return result;
}, {}));
