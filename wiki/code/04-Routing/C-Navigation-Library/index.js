/* global flyd, createApp, HomePage, ReactDOM */

// Meiosis Setup
const update = flyd.stream();
const App = createApp(update);
const models = flyd.scan((model, func) => func(model),
  { pageId: HomePage, tab: HomePage }, update);

// Rendering
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(App.view(model), element); });

// Handle the initial url.
App.navigator.start();