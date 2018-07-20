/* global R, React */

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const createActions = update => ({
  editDate: evt =>
    update(R.assoc("date", evt.target.value)),

  increase: amount => _evt =>
    update(R.over(R.lensProp("value"), R.add(amount))),

  changeUnits: _evt => update(model => {
    const newUnits = model.units === "C" ? "F" : "C";
    const newValue = convert(model.value, newUnits);
    return R.merge(model, { units: newUnits, value: newValue });
  })
});

const createView = actions => model => (
  <div>
    <div>Date: <input type="text" size="10" value={model.date} onChange={actions.editDate}/></div>
    <span>Temperature: {model.value}&deg;{model.units} </span>
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
const createTemperature = update => ({
  model: () => ({
    date: "",
    value: 20,
    units: "C"
  }),

  view: createView(createActions(update))
});
