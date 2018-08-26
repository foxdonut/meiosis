/* global ReactDOM, flyd, createApp */

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan((model, func) => func(model),
  app.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(app.view(model), element));
