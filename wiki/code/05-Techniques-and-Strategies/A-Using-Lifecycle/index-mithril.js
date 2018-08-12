/* global m, O, $ */

// Using recursion
const get = (object, path) =>
  object == undefined
    ? undefined
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
    result.view = vnode => m(Component,
      { model: get(vnode.attrs.model, path) });
  }
  return result;
};

// This is our stateful component. It manages its internal state using the "closure component"
// technique, and relies on Mithril's autoredraw. This works with Meiosis by using m.mount in
// the Meiosis setup.
// The component provides getEntryNumber to retrieve the value of the entry number.
const createEntryNumber = () => {
  let entryNumber = "";
  const actions = {
    editEntryNumber: evt => {
      entryNumber = evt.target.value;
    }
  };

  return {
    getEntryNumber: () => entryNumber,

    view: () => m("div",
      m("span", { style: { "margin-right": "8px" } }, "Entry number:"),
      m("input[type=text][size=2]",
        { value: entryNumber, oninput: actions.editEntryNumber })
    )
  };
};

// This uses a 3rd party date picker,
// https://fengyuanchen.github.io/datepicker/
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

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const createTemperature = label => update => {
  const actions = {
    increase: amount => evt => {
      evt.preventDefault();
      update({ value: O(value => value + amount) });
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        const newUnits = model.units === "C" ? "F" : "C";
        const newValue = convert(model.value, newUnits);
        return O(model, { units: newUnits, value: newValue });
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
          m("button.btn.btn-sm.btn-default",
            { onclick: actions.increase(1) }, "Increase"),

          m("button.btn.btn-sm.btn-default",
            { onclick: actions.increase(-1) }, "Decrease"),

          m("button.btn.btn-sm.btn-info",
            { onclick: actions.changeUnits }, "Change Units")
        )
      )
  };
};

const createApp = update => {
  const displayTemperature = temperature => temperature.label + ": " +
    temperature.value + "\xB0" + temperature.units;

  const EntryNumber = createEntryNumber();
  const EntryDate = nestComponent(createEntryDate, update, ["date"]);

  const air = nest(createTemperature("Air"), update,
    ["temperature", "air"]);

  const water = nest(createTemperature("Water"), update,
    ["temperature", "water"]);

  const actions = {
    save: model => evt => {
      evt.preventDefault();
      update({
        saved: " Entry #" + EntryNumber.getEntryNumber() +
          " on " + model.date.value + ":" +
          " Temperatures: " +
          displayTemperature(model.temperature.air) + " " +
          displayTemperature(model.temperature.water),

        entry: O({ value: "" }),
        date: O({ value: "" })
      });
    }
  };

  return {
    model: () => O(
      { saved: "" },
      EntryDate.model(),
      air.model(),
      water.model()
    ),

    view: vnode => {
      const model = vnode.attrs.models();

      return m("form",
        m(EntryNumber, { }),
        m(EntryDate, { model: model }),
        air.view(model),
        water.view(model),
        m("div",
          m("button.btn.btn-primary", { onclick: actions.save(model) },
            "Save"),
          m("span", model.saved)
        )
      );
    }
  };
};

const update = m.stream();
const App = createApp(update);
const models = m.stream.scan(O, App.model(), update);

const element = document.getElementById("app");
// Meiosis setup with m.mount
m.mount(element, { view: () => m(App, { models }) });
