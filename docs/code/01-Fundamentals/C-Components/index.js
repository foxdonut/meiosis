/* global ReactDOM, flyd, createTemperature */

const update = flyd.stream();
const temperature = createTemperature(update);
const models = flyd.scan((model, func) => func(model),
  temperature.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(temperature.view(model), element));
