/* global m, O */

// -- Utility code

const nestPatch = (patch, prop) => ({ [prop]: O(patch) });

const nestUpdate = (update, prop) => patch => update(nestPatch(patch, prop));

const nest = (create, update, prop) => {
  const component = create(nestUpdate(update, prop));
  const result = O({}, component);
  if (component.model) {
    result.model = () => nestPatch(component.model(), prop);
  }
  if (component.view) {
    result.view = model => component.view(O(
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
  const increase = amount => _event => update({
    value: O(value => value + amount)
  });
  const changeUnits = _event =>
    update(model => {
      const newUnits = model.units === "C" ? "F" : "C";
      const newValue = convert(model.value, newUnits);
      return O(model, { units: newUnits, value: newValue });
    });

  const model = () => O({ value: 22, units: "C" }, init);

  const view = model => {
    const btn = "button." + (model.context.theme === "dark" ? "btn-primary" : "btn-default");
    return m("div.temperature", [
      label, " Temperature: ", model.value, m.trust("&deg;"), model.units,
      m("div",
        m(btn, { onclick: increase( 1) }, "Increase"),
        m(btn, { onclick: increase(-1) }, "Decrease")
      ),
      m("div",
        m(btn, { onclick: changeUnits }, "Change Units")
      )
    ]);
  };
  return { model, view };
};

const createTemperaturePair = update => {
  const air = nest(createTemperature("Air"), update, "air");
  const water = nest(createTemperature("Water", { value: 84, units: "F" }),
    update, "water");

  const model = () => O(air.model(), water.model());

  const view = model => [
    air.view(model),
    water.view(
      O({}, model, { context: { theme: "light" } })
    )
  ];
  return { model, view };
};

const createThemeChanger = update => {
  const changeTheme = _event => {
    update({
      context: O({ theme: O(previous => previous === "light" ? "dark" : "light") })
    });
  };
  const view = model =>
    m("div", [
      m("div", "Theme: " + model.context.theme),
      m("button." + (model.context.theme === "dark" ? "btn-primary" : "btn-default"),
        { onclick: changeTheme }, "Change Theme")
    ]);

  return { view };
};

const createApp = update => {
  const temperaturePair = nest(createTemperaturePair, update, "temperatures");
  const themeChanger = createThemeChanger(update);
  const view = model => [
    temperaturePair.view(model),
    themeChanger.view(model)
  ];
  return {
    model: () => O(
      { context: { theme: "light" } },
      temperaturePair.model()
    ),
    view
  };
};

// -- Meiosis pattern setup code

const update = m.stream();
const app = createApp(update);

const models = m.stream.scan(O, app.model(), update);

const element = document.getElementById("app");

models.map(model => { m.render(element, app.view(model)); });
