/* global flyd, createApp, HomePage, ReactDOM */

// Meiosis Pattern Setup
const update = flyd.stream();
const App = createApp(update);
const models = flyd.scan((model, func) => func(model),
  { pageId: HomePage }, update);

const element = document.getElementById("app");
models.map(model => { ReactDOM.render(App.view(model), element); });
