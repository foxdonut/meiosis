/*global React, ReactDOM, flyd, mergerino*/
const merge = mergerino;

var conditions = {
  initial: {
    precipitations: false,
    sky: "Sunny"
  },
  Actions: function (update) {
    return {
      togglePrecipitations: function (id, value) {
        update({ [id]: { precipitations: value } });
      },
      changeSky: function (id, value) {
        update({ [id]: { sky: value } });
      }
    };
  }
};

var SkyOption = function ({
  state,
  id,
  actions,
  value,
  label
}) {
  return (
    <label>
      <input
        type="radio"
        id={value}
        name="sky"
        value={value}
        checked={state[id].sky === value}
        onChange={evt =>
          actions.changeSky(id, evt.target.value)
        }
      />
      {label}
    </label>
  );
};

var Conditions = function ({ state, id, actions }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={state[id].precipitations}
          onChange={evt =>
            actions.togglePrecipitations(id, evt.target.checked)
          }
        />
        Precipitations
      </label>
      <div>
        <SkyOption
          state={state}
          id={id}
          actions={actions}
          value="SUNNY"
          label="Sunny"
        />
        <SkyOption
          state={state}
          id={id}
          actions={actions}
          value="CLOUDY"
          label="Cloudy"
        />
        <SkyOption
          state={state}
          id={id}
          actions={actions}
          value="MIX"
          label="Mix of sun/clouds"
        />
      </div>
    </div>
  );
};

var convert = function (value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  Initial: function (label) {
    return {
      label,
      value: 22,
      units: "C"
    };
  },
  Actions: function (update) {
    return {
      increment: function (id, amount) {
        update({ [id]: { value: x => x + amount } });
      },
      changeUnits: function (id) {
        update({
          [id]: state => {
            var value = state.value;
            var newUnits = state.units === "C" ? "F" : "C";
            var newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
            return state;
          }
        });
      }
    };
  }
};

var Temperature = function ({ state, id, actions }) {
  return (
    <div>
      {state[id].label} Temperature:
      {state[id].value} &deg; {state[id].units}
      <div>
        <button onClick={() => actions.increment(id, 1)}>
          Increment
        </button>
        <button onClick={() => actions.increment(id, -1)}>
          Decrement
        </button>
      </div>
      <div>
        <button onClick={() => actions.changeUnits(id)}>
          Change Units
        </button>
      </div>
    </div>
  );
};

var app = {
  initial: {
    conditions: conditions.initial,
    "temperature:air": temperature.Initial("Air"),
    "temperature:water": temperature.Initial("Water")
  },
  Actions: function (update) {
    return Object.assign(
      {},
      conditions.Actions(update),
      temperature.Actions(update)
    );
  }
};

var App = function ({ states, actions }) {
  var [init, setInit] = React.useState(false);
  var [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return (
    <div>
      <Conditions
        state={state}
        id="conditions"
        actions={actions}
      />
      <Temperature
        state={state}
        id="temperature:air"
        actions={actions}
      />
      <Temperature
        state={state}
        id="temperature:water"
        actions={actions}
      />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};

var update = flyd.stream();
var states = flyd.scan(merge, app.initial, update);
var actions = app.Actions(update);

ReactDOM.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);
