/* global m, createApp, HomePage */

// Meiosis Setup
const update = m.stream();
const App = createApp(update);
const models = m.stream.scan((model, func) => func(model),
  { pageId: HomePage, tab: HomePage }, update);

// Rendering
const element = document.getElementById("app");
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

// The url is part of the view. Display it in the browser's location bar.
/*
models.map(model => {
  const url = model.url;
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});
*/