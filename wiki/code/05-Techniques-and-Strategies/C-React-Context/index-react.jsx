/* global React, ReactDOM, flyd */

// -- Utility code

const nestUpdate = (update, prop) => func =>
  update(model => {
    model[prop] = func(model[prop]);
    return model;
  });

const nest = function(create, update, prop) {
  const component = create(nestUpdate(update, prop));
  const result = Object.assign({}, component);
  if (component.model) {
    result.model = () => ({ [prop]: component.model() });
  }
  if (component.view) {
    result.view = model => component.view(Object.assign(
      { context: model.context },
      model[prop]
    ));
  }
  return result;
};

// -- Application code

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const createTemperature = (label, init) => update => {
  const increase = amount => _event =>
    update(model => {
      model.value += amount;
      return model;
    });

  const changeUnits = _event =>
    update(model => {
      const newUnits = model.units === "C" ? "F" : "C";
      model.value = convert(model.value, newUnits);
      model.units = newUnits;
      return model;
    });

  const model = () => Object.assign({ value: 22, units: "C" }, init);

  const view = function(model) {
    const btnClass = (model.context.theme === "dark" ? "btn-primary" : "btn-default");
    return (<div className="temperature">
      <span>{label} Temperature: {model.value}&deg;{model.units}</span>
      <div>
        <button className={btnClass}
          onClick={increase( 1)}>Increase</button>
        <button className={btnClass}
          onClick={increase( -1)}>Decrease</button>
      </div>
      <div>
        <button className={btnClass}
          onClick={changeUnits}>Change Units</button>
      </div>
    </div>);
  };

  return { model, view };
};

const createTemperaturePair = update => {
  const air = nest(createTemperature("Air"), update, "air");
  const water = nest(createTemperature("Water", { value: 84, units: "F" }),
    update, "water");

  const model = () => Object.assign(air.model(), water.model());

  const view = model =>
    (<div>
      {air.view(model)}
      {water.view(Object.assign({}, model, { context: { theme: "light" } }))}
    </div>);

  return { model, view };
};

const createThemeChanger = update => {
  const changeTheme = _event =>
    update(model => {
      model.context.theme = model.context.theme === "light" ? "dark" : "light";
      return model;
    });

  const view = model =>
    (<div>
      <div>Theme: {model.context.theme}</div>
      <button className={model.context.theme === "dark" ? "btn-primary" : "btn-default"}
        onClick={changeTheme}>Change Theme</button>
    </div>);

  return { view };
};

const createApp = update => {
  const temperaturePair = nest(createTemperaturePair, update, "temperatures");
  const themeChanger = createThemeChanger(update);
  const view = model =>
    (<div>
      {temperaturePair.view(model)}
      {themeChanger.view(model)}
    </div>);

  return {
    model: () => Object.assign(
      { context: { theme: "light" } },
      temperaturePair.model()
    ),
    view
  };
};

// -- Meiosis pattern setup code

const update = flyd.stream();
const app = createApp(update);

const models = flyd.scan((model, func) => func(model),
  app.model(), update);

const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });
