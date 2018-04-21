/*global ReactDOM, flyd*/

const createActions = update => ({
  increase: () => update(model => {
    model.value = model.value + 1;
    return model;
  })
});

const createView = actions => model => (
  <div>
    <span>Temperature: {model.value}&deg;C </span>
    <button className="btn btn-default" onClick={actions.increase}>Increase</button>
  </div>
);

const update = flyd.stream();
const models = flyd.scan((model, func) => func(model),
  { value: 20 }, update);

const view = createView(createActions(update));
const element = document.getElementById("app");
models.map(model => ReactDOM.render(view(model), element));
