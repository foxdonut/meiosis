import {
  html,
  render
} from "https://unpkg.com/lit-html?module";

/*global flyd, O*/
var conditions = {
  initialState: {
    conditions: {
      precipitations: false,
      sky: "Sunny"
    }
  },
  actions: function(update) {
    return {
      togglePrecipitations: function(value) {
        update({ conditions: O({ precipitations: value }) });
      },
      changeSky: function(value) {
        update({ conditions: O({ sky: value }) });
      }
    };
  }
};

var skyOption = function({ state, actions, value, label }) {
  return html`
    <label>
      <input
        type="radio"
        id=${value}
        name="sky"
        value=${value}
        .checked=${state.conditions.sky === value}
        @change=${evt => actions.changeSky(evt.target.value)}
      />
      ${label}
    </label>
  `;
};

var Conditions = function(state, actions) {
  return html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${state.conditions.precipitations}
          @change=${evt =>
            actions.togglePrecipitations(evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({
          state,
          actions,
          value: "SUNNY",
      label: "Sunny"
        })}
        ${skyOption({
          state,
          actions,
          value: "CLOUDY",
      label: "Cloudy"
        })}
        ${skyOption({
          state,
          actions,
          value: "MIX",
    label: "Mix of sun/clouds"})}
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
  initialState: function(label) {
    return {
      label,
      value: 22,
      units: "C"
    };
  },
  actions: function(update) {
    return {
      increment: function(id, amount) {
        update({ [id]: O({ value: O(x => x + amount) }) });
      },
      changeUnits: function(id) {
        update({
          [id]: O(state => {
            var value = state.value;
            var newUnits = state.units === "C" ? "F" : "C";
            var newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
            return state;
          })
        });
      }
    };
  }
};

var Temperature = function(state, id, actions) {
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
  initialState: Object.assign(
    {},
    conditions.initialState,
    { air: temperature.initialState("Air") },
    { water: temperature.initialState("Water") }
  ),
  actions: function(update) {
    return Object.assign(
      {},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};

var App = function(state, actions) {
  return html`
    <div>
      ${Conditions(state, actions)}
      ${Temperature(state, "air", actions)}
      ${Temperature(state, "water", actions)}
      <pre>${JSON.stringify(state, null, 4)}</pre>
    </div>
  `;
};

var update = flyd.stream();
var states = flyd.scan(O, app.initialState, update);

var actions = app.actions(update);
var element = document.getElementById("app");
states.map(state => render(App(state, actions), element));
