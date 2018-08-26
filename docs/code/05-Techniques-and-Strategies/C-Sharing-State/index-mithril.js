/* global m, O */

// -- Utility code

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
});

const nestUpdate = (update, path) => patch => {
  update(patch.context ? patch : nestPatch(patch, path));
};

const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = O({}, component);
  if (component.model) {
    result.model = () => nestPatch(component.model(), path);
  }
  if (component.view) {
    result.view = model => component.view(
      O({ context: model.context }, get(model, path)));
  }
  return result;
};

// -- Application code

const createThemeChanger = update => {
  const changeTheme = _event => {
    update({
      context: O({ theme: O(previous => previous === "light" ?
        "dark" : "light") })
    });
  };
  const view = model =>
    m("div",
      m("button." +
        (model.context.theme === "dark" ?
          "btn-primary" : "btn-default"),
      { onclick: changeTheme }, "Change Theme")
    );

  return { view };
};

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const createTemperature = label => update => {
  const increase = amount => _event => update({
    value: O(value => value + amount)
  });
  const changeUnits = _event =>
    update(model => {
      const newUnits = model.units === "C" ? "F" : "C";
      const newValue = convert(model.value, newUnits);
      return O(model, { units: newUnits, value: newValue });
    });

  const model = () => ({ value: 20, units: "C" });

  const themeChanger = createThemeChanger(update);

  const view = model => {
    const btn = "button." + (model.context.theme === "dark" ?
      "btn-primary" : "btn-default");
    return m("div.temperature", [
      label, " Temperature: ", model.value, m.trust("&deg;"), model.units,
      m("div",
        m(btn, { onclick: increase( 1) }, "Increase"),
        m(btn, { onclick: increase(-1) }, "Decrease")
      ),
      m("div",
        m(btn, { onclick: changeUnits }, "Change Units")
      ),
      themeChanger.view(model)
    ]);
  };
  return { model, view };
};

const createTemperaturePair = update => {
  const air = nest(createTemperature("Air"), update, ["air"]);
  const water = nest(createTemperature("Water"), update, ["water"]);

  const model = () => O(air.model(), water.model());

  const view = model => [
    air.view(model),
    water.view(model)
  ];
  return { model, view };
};

const createApp = update => {
  const temperaturePair = nest(createTemperaturePair, update,
    ["temperatures"]);

  const themeChanger = createThemeChanger(update);

  const view = model => [
    m("div", "Theme: " + model.context.theme),
    themeChanger.view(model),
    temperaturePair.view(model)
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
