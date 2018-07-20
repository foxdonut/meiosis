/* global React */

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const createActions = update => ({
  editDate: evt =>
    update(model => {
      model.date = evt.target.value;
      return model;
    }),

  increase: amount => _evt =>
    update(model => {
      model.value = model.value + amount;
      return model;
    }),

  changeUnits: _evt => update(model => {
    const newUnits = model.units === "C" ? "F" : "C";
    const newValue = convert(model.value, newUnits);
    return Object.assign(model, { units: newUnits, value: newValue });
  })
});

const computed = model => {
  let temp = model.value;

  if (model.units === "F") {
    temp = Math.round((temp - 32) * 5 / 9);
  }
  model.comment = (temp < 10) ? "COLD!" : (temp > 40) ? "HOT" : "";

  return model;
};

const createView = actions => model => (
  <div>
    <div>Date: <input type="text" size="10" value={model.date} onChange={actions.editDate}/></div>
    <span>Temperature: {model.value}&deg;{model.units} {model.comment}</span>
    <div>
      <button onClick={actions.increase(1)}>Increase</button>
      <button onClick={actions.increase(-1)}>Decrease</button>
    </div>
    <div>
      <button onClick={actions.changeUnits}>Change Units</button>
    </div>
  </div>
);


// eslint-disable-next-line no-unused-vars
const createTemperature = update => {
  const view = createView(createActions(update));

  return {
    model: () => ({
      date: "",
      value: 20,
      units: "C"
    }),

    view: model => view(computed(model))
  };
};
