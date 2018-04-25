const nestUpdate = (update, prop) => func =>
  update(R.over(R.lensProp(prop), func));

const nestComponent = (create, update, prop) => {
  const Component = create(nestUpdate(update, prop));
  const Result = R.merge({}, Component);
  if (Component.model) {
    Result.model = () => R.assoc(prop, Component.model(), {});
  }
  if (Component.view) {
    Result.view = vnode => m(Component, { model: R.prop(prop, vnode.attrs.model) });
  }
  return Result;
};

const createEntryNumber = update => {
  const actions = {
    editEntryValue: evt => update(R.assoc("value", evt.target.value))
  };

  return {
    model: () => ({
      value: ""
    }),
    view: vnode => {
      console.log("render Entry");
      const model = vnode.attrs.model;

      return (
        m("div",
          m("span", "Entry number:"),
          m("input[type=text][size=2]",
            { value: model.value, oninput: actions.editEntryValue })
        )
      );
    },
    onbeforeupdate: (next, prev) => next.attrs.model !== prev.attrs.model
  };
};

const createEntryDate = update => {
  const actions = {
    editDateValue: evt => update(R.assoc("value", evt.target.value))
  };

  return {
    model: () => ({
      value: ""
    }),
    view: vnode => {
      console.log("render Date");
      const model = vnode.attrs.model;

      return (
        m("div",
          m("span", "Date:"),
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
      update(R.over(R.lensProp("value"), R.add(value)))
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        if (model.units === "C") {
          return R.merge(model, {
            units: "F",
            value: Math.round( model.value * 9 / 5 + 32 )
          });
        }
        else {
          return R.merge(model, {
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
    view: vnode => {
      const model = vnode.attrs.model;
      console.log("render Temperature", model.label);

      return (
        m(".row",
          m(".col-md-3",
            m("span", model.label + " Temperature: " + model.value + "\xB0" + model.units)
          ),
          m(".col-md-6",
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
  const displayTemperature = temperature =>
    temperature.label + ": " +
    temperature.value + "\xB0" + temperature.units;

  const actions = {
    save: evt => {
      evt.preventDefault();
      update(model => Object.assign(model,
        { saved: "Entry #" + model.entry.value +
            " on " + model.date.value + ":" +
            " Temperatures: " +
            displayTemperature(model.airTemperature) + " " +
            displayTemperature(model.waterTemperature),
          entry: Object.assign(model.entry, { value: "" }),
          date: Object.assign(model.date, { value: "" })
        }
      ));
    }
  };

  const EntryNumber = nestComponent(createEntryNumber, update, "entry");
  const EntryDate = nestComponent(createEntryDate, update, "date");
  const Air = nestComponent(createTemperature("Air"), update, "airTemperature");
  const Water = nestComponent(createTemperature("Water"), update, "waterTemperature");

  return {
    model: () => R.mergeAll([
      { saved: "" },
      EntryNumber.model(),
      EntryDate.model(),
      R.merge(
        Air.model(),
        Water.model()
      )
    ]),
    view: model =>
      m("form",
        m(EntryNumber, { model }),
        m(EntryDate, { model }),
        m(Air, { model }),
        m(Water, { model }),
        m("div",
          m("button.btn.btn-primary", {onclick: actions.save}, "Save"),
          m("span", " "),
          m("span", model.saved)
        )
      )
  };
};

const update = m.stream();
const app = createApp(update);
const models = m.stream.scan((model, func) => func(model),
  app.model(), update);

const element = document.getElementById("app");
models.map(model => m.render(element, app.view(model)));
