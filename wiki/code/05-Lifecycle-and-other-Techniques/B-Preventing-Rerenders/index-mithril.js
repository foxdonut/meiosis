/* global m, O */

const get = (object, path, defaultValue) =>
  object == null
    ? defaultValue
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1));

const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
});

const nestUpdate = (update, path) => patch =>
  update(nestPatch(patch, path));

const nestComponent = (create, update, path) => {
  const Component = create(nestUpdate(update, path));
  const result = O({}, Component);

  if (Component.model) {
    result.model = () => nestPatch(Component.model(), path);
  }
  if (Component.view) {
    result.view = vnode => m(Component, { model: get(vnode.attrs.model, path) });
  }
  return result;
};

const createEntryNumber = update => {
  const actions = {
    editEntryValue: evt => update({ value: evt.target.value })
  };

  return {
    model: () => ({
      value: ""
    }),
    view: vnode => {
      // eslint-disable-next-line no-console
      console.log("render Entry");
      const model = vnode.attrs.model;

      return (
        m("div",
          m("span", { style: { "margin-right": "8px" } }, "Entry number:"),
          m("input[type=text][size=2]", { value: model.value, oninput: actions.editEntryValue })
        )
      );
    },
    onbeforeupdate: (next, prev) => next.attrs.model !== prev.attrs.model
  };
};

const createEntryDate = update => {
  const actions = {
    editDateValue: evt => update({ value: evt.target.value })
  };

  return {
    model: () => ({
      value: ""
    }),
    view: vnode => {
      // eslint-disable-next-line no-console
      console.log("render Date");
      const model = vnode.attrs.model;

      return (
        m("div", { style: { "margin-top": "8px" } },
          m("span", { style: { "margin-right": "8px" } }, "Date:"),
          m("input[type=text][size=10]",
            { value: model.value, oninput: actions.editDateValue })
        )
      );
    },
    onbeforeupdate: (next, prev) => next.attrs.model !== prev.attrs.model
  };
};

const createTemperature = label => update => {
  const actions = {
    increase: value => evt => {
      evt.preventDefault();
      update({ value: O(previous => previous + value) });
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        if (model.units === "C") {
          model.units = "F";
          model.value = Math.round( model.value * 9 / 5 + 32 );
        }
        else {
          model.units = "C";
          model.value = Math.round( (model.value - 32) / 9 * 5 );
        }
        return model;
      });
    }
  };

  return {
    model: () => ({
      label,
      value: 20,
      units: "C"
    }),
    view: vnode => {
      const model = vnode.attrs.model;
      // eslint-disable-next-line no-console
      console.log("render Temperature", model.label);

      return (
        m("div.row", { style: { "margin-top": "8px" } },
          m("div.col-md-3",
            m("span", model.label, " Temperature: ", model.value, m.trust("&deg;"), model.units)
          ),
          m("div.col-md-6",
            m("button.btn.btn-sm.btn-default", {onclick: actions.increase(1)}, "Increase"),
            m("button.btn.btn-sm.btn-default", {onclick: actions.increase(-1)}, "Decrease"),
            m("button.btn.btn-sm.btn-info", {onclick: actions.changeUnits}, "Change Units")
          )
        )
      );
    },
    onbeforeupdate: (next, prev) => next.attrs.model !== prev.attrs.model
  };
};


const createApp = update => {
  const displayTemperature = temperature => temperature.label + ": " +
    temperature.value + "\xB0" + temperature.units;

  const actions = {
    save: evt => {
      evt.preventDefault();
      update(model => {
        model.saved = " Entry #" + model.entry.value +
          " on " + model.date.value + ":" +
          " Temperatures: " +
          displayTemperature(model.temperature.air) + " " +
          displayTemperature(model.temperature.water);

        model.entry.value = "";
        model.date.value = "";

        return model;
      });
    }
  };

  const EntryNumber = nestComponent(createEntryNumber, update, ["entry"]);
  const EntryDate = nestComponent(createEntryDate, update, ["date"]);
  const Air = nestComponent(createTemperature("Air"), update, ["temperature", "air"]);
  const Water = nestComponent(createTemperature("Water"), update, ["temperature", "water"]);

  return {
    model: () => O(
      { saved: "" },
      EntryNumber.model(),
      EntryDate.model(),
      Air.model(),
      Water.model()
    ),
    view: model =>
      m("form",
        m(EntryNumber, { model }),
        m(EntryDate, { model }),
        m(Air, { model }),
        m(Water, { model }),
        m("div",
          m("button.btn.btn-primary", {onclick: actions.save}, "Save"),
          m("span", model.saved)
        )
      )
  };
};

const update = m.stream();
const app = createApp(update);
const models = m.stream.scan(O, app.model(), update);

const element = document.getElementById("app");
models.map(model => m.render(element, app.view(model)));
