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
    if (model.units === "C") {
      model.units = "F";
      model.value = Math.round( model.value * 9 / 5 + 32 );
    }
    else {
      model.units = "C";
      model.value = Math.round( (model.value - 32) / 9 * 5 );
    }
    return model;
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
