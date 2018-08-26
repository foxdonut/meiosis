/* global flyd, createApp, HomePage, React, ReactDOM */

// Meiosis Setup
const update = flyd.stream();
const App = createApp(update);
const models = flyd.scan((model, func) => func(model),
  { pageId: HomePage }, update);

// Rendering
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(<App model={model} />, element); });
