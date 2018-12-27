/*global React, ReactDOM, flyd, P, S, PS*/
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
        update({ conditions: PS({ precipitations: value }) });
      },
      changeSky: function(value) {
        update({ conditions: PS({ sky: value }) });
      }
    };
  }
};

var skyOption = function({ state, actions, value, label }) {
  return (<label>
    <input type="radio" id={value} name="sky"
      value={value} checked={state.conditions.sky === value}
      onChange={evt => actions.changeSky(evt.target.value)}/>
    {label}
  </label>);
};

class Conditions extends React.Component {
  render() {
    var { state, actions } = this.props;
    return (<div>
      <label>
        <input
          type="checkbox"
          checked={state.conditions.precipitations}
          onChange={evt =>
            actions.togglePrecipitations(evt.target.checked)
          }/>
        Precipitations
      </label>
      <div>
        {skyOption({ state, actions, value: "SUNNY",
          label: "Sunny"})}
        {skyOption({ state, actions, value: "CLOUDY",
          label: "Cloudy"})}
        {skyOption({ state, actions, value: "MIX",
          label: "Mix of sun/clouds"})}
      </div>
    </div>);
  }
}

var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
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
        update({ [id]: PS({ value: S(x => x + amount) }) });
      },
      changeUnits: function(id) {
        update({
          [id]: S(state => {
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

class Temperature extends React.Component {
  render() {
    var { state, id, actions } = this.props;
    return (<div>
      {state[id].label} Temperature:
      {state[id].value} &deg; {state[id].units}
      <div>
        <button
          onClick={() => actions.increment(id, 1)}>
          Increment
        </button>
        <button
          onClick={() => actions.increment(id,-1)}>
          Decrement
        </button>
      </div>
      <div>
        <button
          onClick={() => actions.changeUnits(id)}>
          Change Units
        </button>
      </div>
    </div>);
  }
}

var app = {
  initialState: Object.assign({},
    conditions.initialState,
    { air: temperature.initialState("Air") },
    { water: temperature.initialState("Water") }
  ),
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
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
    return (<div>
      <Conditions state={state} actions={actions} />
      <Temperature state={state} id="air" actions={actions} />
      <Temperature state={state} id="water" actions={actions} />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>);
  }
}

var update = flyd.stream();
var states = flyd.scan(P, app.initialState, update);

var actions = app.actions(update);
ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
