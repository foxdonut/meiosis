import {
  html,
  render
} from "https://unpkg.com/lit-html?module";

/*global flyd, mergerino*/
const merge = mergerino;

var conditions = {
  Initial: function() {
    return {
      precipitations: false,
      sky: "Sunny"
    };
  },
  Actions: function(update) {
    return {
      togglePrecipitations: function(id, value) {
        update({ [id]: { precipitations: value } });
      },
      changeSky: function(id, value) {
        update({ [id]: { sky: value } });
      }
    };
  }
};

var skyOption = function({ state, id, actions, value, label }) {
  return html`
    <label>
      <input
        type="radio"
        id=${value}
        name="sky"
        value=${value}
        .checked=${state[id].sky === value}
        @change=${evt =>
          actions.changeSky(id, evt.target.value)}
      />
      ${label}
    </label>
  `;
};

var Conditions = function({ state, id, actions }) {
  return html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${state[id].precipitations}
          @change=${evt =>
            actions.togglePrecipitations(
              id,
              evt.target.checked
            )}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({
          state,
          id,
          actions,
          value: "SUNNY",
          label: "Sunny"
        })}
        ${skyOption({
          state,
          id,
          actions,
          value: "CLOUDY",
          label: "Cloudy"
        })}
        ${skyOption({
          state,
          id,
          actions,
          value: "MIX",
          label: "Mix of sun/clouds"
        })}
      </div>
    </div>
  `;
};

var convert = function(value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  Initial: function(label) {
    return {
      label,
      value: 22,
      units: "C"
    };
  },
  Actions: function(update) {
    return {
      increment: function(id, amount) {
        update({ [id]: { value: x => x + amount } });
      },
      changeUnits: function(id) {
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

var Temperature = function({ state, id, actions }) {
  return html`
    <div>
      ${state[id].label} Temperature: ${state[id].value} &deg;
      ${state[id].units}
      <div>
        <button @click=${() => actions.increment(id, 1)}>
          Increment
        </button>
        <button @click=${() => actions.increment(id, -1)}>
          Decrement
        </button>
      </div>
      <div>
        <button @click=${() => actions.changeUnits(id)}>
          Change Units
        </button>
      </div>
    </div>
  `;
};

var app = {
  Initial: function() {
    return {
      conditions: conditions.Initial(),
      "temperature:air": temperature.Initial("Air"),
      "temperature:water": temperature.Initial("Water")
    };
  },
  Actions: function(update) {
    return Object.assign(
      {},
      conditions.Actions(update),
      temperature.Actions(update)
    );
  }
};

var App = function(state, actions) {
  return html`
    <div>
      ${Conditions({ state, id: "conditions", actions })}
      ${Temperature({ state, id: "temperature:air", actions })}
      ${Temperature({
        state,
        id: "temperature:water",
        actions
      })}
      <pre>${JSON.stringify(state, null, 4)}</pre>
    </div>
  `;
};

var update = flyd.stream();
var states = flyd.scan(merge, app.Initial(), update);

var actions = app.Actions(update);
var element = document.getElementById("app");
states.map(state => render(App(state, actions), element));
