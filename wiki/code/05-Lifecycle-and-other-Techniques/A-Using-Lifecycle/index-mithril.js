/* global m, O, $ */

// Using recursion
const get = (object, path, defaultValue) =>
  object == null
    ? defaultValue
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1), defaultValue);

const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
});

const nestUpdate = (update, path) => patch =>
  update(nestPatch(patch, path));

const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = O({}, component);
  if (component.model) {
    result.model = () => nestPatch(component.model(), path);
  }
  if (component.view) {
    result.view = model => component.view(get(model, path));
  }
  return result;
};

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

    view: model =>
      m("div",
        m("span", { style: { "margin-right": "8px" } }, "Entry number:"),
        m("input[type=text][size=2]",
          { value: model.value, oninput: actions.editEntryValue })
      )
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

    oncreate: vnode => {
      const $datepicker = $(vnode.dom).find(".dateField");

      $datepicker
        .datepicker({ autoHide: true })
        .on("pick.datepicker", _evt =>
          update({ value: $datepicker.datepicker("getDate", true) })
        );
    },

    view: vnode => {
      const model = vnode.attrs.model;

      return (
        m("div", { style: { "margin-top": "8px" } },
          m("span", { style: { "margin-right": "8px" } }, "Date:"),
          m("input[type=text][size=10].dateField",
            { value: model.value, oninput: actions.editDateValue })
        )
      );
    },

    onremove: vnode => {
      $(vnode.dom).find(".dateField").datepicker("destroy");
    }
  };
};

const createTemperature = label => update => {
  const actions = {
    increase: amount => evt => {
      evt.preventDefault();
      update({ value: O(value => value + amount) });
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        if (model.units === "C") {
          return O(model, {
            units: "F",
            value: Math.round( model.value * 9 / 5 + 32 )
          });
        }
        else {
          return O(model, {
            units: "C",
            value: Math.round( (model.value - 32) / 9 * 5 )
          });
        }
      });
    }
  };

  return {
    model: () => ({
      label,
      value: 20,
      units: "C"
    }),

    view: model =>
      m("div.row", { style: { "margin-top": "8px" } },
        m("div.col-md-3",
          m("span", model.label, " Temperature: ", model.value,
            m.trust("&deg;"), model.units)
        ),
        m("div.col-md-6",
          m("button.btn.btn-sm.btn-default", { onclick: actions.increase(1) },
            "Increase"),

          m("button.btn.btn-sm.btn-default", { onclick: actions.increase(-1) },
            "Decrease"),

          m("button.btn.btn-sm.btn-info", { onclick: actions.changeUnits },
            "Change Units")
        )
      )
  };
};

const createApp = update => {
  const displayTemperature = temperature => temperature.label + ": " +
    temperature.value + "\xB0" + temperature.units;

  const actions = {
    save: model => evt => {
      evt.preventDefault();
      update({
        saved: " Entry #" + model.entry.value +
          " on " + model.date.value + ":" +
          " Temperatures: " +
          displayTemperature(model.temperature.air) + " " +
          displayTemperature(model.temperature.water),

        entry: O({ value: "" }),
        date: O({ value: "" })
      });
    }
  };

  const entryNumber = nest(createEntryNumber, update, ["entry"]);
  const EntryDate = nestComponent(createEntryDate, update, ["date"]);

  const air = nest(createTemperature("Air"), update,
    ["temperature", "air"]);

  const water = nest(createTemperature("Water"), update,
    ["temperature", "water"]);

  return {
    model: () => O(
      { saved: "" },
      entryNumber.model(),
      EntryDate.model(),
      air.model(),
      water.model()
    ),

    view: model =>
      m("form",
        entryNumber.view(model),
        m(EntryDate, { model }),
        air.view(model),
        water.view(model),
        m("div",
          m("button.btn.btn-primary", { onclick: actions.save(model) }, "Save"),
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
