/*global React, ReactDOM, flyd, mergerino*/
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

var SkyOption = function({ state, id, actions, value, label }) {
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

class Conditions extends React.Component {
  render() {
    var { state, id, actions } = this.props;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={state[id].precipitations}
            onChange={evt =>
              actions.togglePrecipitations(
                id,
                evt.target.checked
              )
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
  }
}

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

class Temperature extends React.Component {
  render() {
    var { state, id, actions } = this.props;
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
  }
}

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states();
  }
  componentDidMount() {
    var setState = this.setState.bind(this);
    this.props.states.map(function(state) {
      setState(state);
    });
  }
  render() {
    var state = this.state;
    var { actions } = this.props;
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
  }
}

var update = flyd.stream();
var states = flyd.scan(merge, app.Initial(), update);
var actions = app.Actions(update);

ReactDOM.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);
