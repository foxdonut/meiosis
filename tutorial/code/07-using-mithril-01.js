/*global m, P, S, PS*/
var get = function(object, path) {
  return path.reduce(function(obj, prop) {
    return obj == null ? null : obj[prop];
  }, object);
};

var updatePath = function(update, path) {
  return function(patch) {
    update({
      [path[0]]: path
        .slice(1)
        .reduceRight(function(result, key) {
          return PS({ [key]: result });
        }, patch)
    });
  };
};

var lens = function({ state, update }, path) {
  return {
    state: get(state, path),
    update: updatePath(update, path)
  };
};

var conditions = {
  initialState: {
    precipitations: false,
    sky: "Sunny"
  },
  actions: {
    togglePrecipitations: function(value) {
      return PS({ precipitations: value });
    },
    changeSky: function(value) {
      return PS({ sky: value });
    }
  }
};

var skyOption = function({ local, value, label }) {
  return m(
    "label",
    m("input", {
      type: "radio",
      id: value,
      name: "sky",
      value,
      checked: local.state.sky === value,
      onchange: evt =>
        local.update(
          conditions.actions.changeSky(evt.target.value)
        )
    }),
    label
  );
};

var Conditions = {
  view: function(vnode) {
    var { local } = vnode.attrs;
    return m(
      "div",
      m(
        "label",
        m("input", {
          type: "checkbox",
          checked: local.state.precipitations,
          onchange: evt =>
            local.update(
              conditions.actions.togglePrecipitations(
                evt.target.checked
              )
            )
        }),
        "Precipitations"
      ),
      m(
        "div",
        skyOption({ local, value: "SUNNY", label: "Sunny" }),
        skyOption({ local, value: "CLOUDY", label: "Cloudy" }),
        skyOption({
          local,
          value: "MIX",
          label: "Mix of sun/clouds"
        })
      )
    );
  }
};

var convert = function(value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  initialState: function(label) {
    return {
      label,
      value: 22,
      units: "C"
    };
  },
  actions: {
    increment: function(amount) {
      return PS({ value: S(x => x + amount) });
    },
    changeUnits: function() {
      return S(state => {
        var value = state.value;
        var newUnits = state.units === "C" ? "F" : "C";
        var newValue = convert(value, newUnits);
        state.value = newValue;
        state.units = newUnits;
        return state;
      });
    }
  }
};

var Temperature = {
  view: function(vnode) {
    var { local } = vnode.attrs;
    return m(
      "div",
      local.state.label,
      " Temperature: ",
      local.state.value,
      m.trust("&deg;"),
      local.state.units,
      m(
        "div",
        m(
          "button",
          {
            onclick: () =>
              local.update(temperature.actions.increment(1))
          },
          "Increment"
        ),
        m(
          "button",
          {
            onclick: () =>
              local.update(temperature.actions.increment(-1))
          },
          "Decrement"
        )
      ),
      m(
        "div",
        m(
          "button",
          {
            onclick: () =>
              local.update(temperature.actions.changeUnits())
          },
          "Change Units"
        )
      )
    );
  }
};

var app = {
  initialState: Object.assign(
    {},
    { conditions: conditions.initialState },
    {
      temperature: {
        air: temperature.initialState("Air"),
        water: temperature.initialState("Water")
      }
    }
  )
};

var App = {
  view: function(vnode) {
    var { root } = vnode.attrs;
    return m(
      "div",
      m(Conditions, {
        root,
        local: lens(root, ["conditions"])
      }),

      m(Temperature, {
        root,
        local: lens(root, ["temperature", "air"])
      }),

      m(Temperature, {
        root,
        local: lens(root, ["temperature", "water"])
      }),

      m("pre", JSON.stringify(root.state, null, 4))
    );
  }
};

var update = m.stream();
var states = m.stream.scan(P, app.initialState, update);

m.mount(document.getElementById("app"), {
  view: () => m(App, { root: { state: states(), update } })
});
