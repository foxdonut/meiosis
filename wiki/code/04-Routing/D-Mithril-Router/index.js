/* global m, createApp, prefix, HomePage */

// Meiosis Setup
const update = m.stream();
const App = createApp(update);
const models = m.stream.scan((model, func) => func(model),
  { pageId: HomePage }, update);

// Rendering
const element = document.getElementById("app");
m.route.prefix(prefix);
m.route(element, "/", Object.keys(App.navigator.routes).reduce(
  (result, route) => {
    result[route] = {
      onmatch: params =>
        App.navigator.navigateTo(App.navigator.routes[route], params),
      render: () => m(App, { model: models() })
    };
    return result;
  },
  {}
));
