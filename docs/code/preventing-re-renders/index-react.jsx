/* global React, ReactDOM, flyd, P, PS, S */
const entryNumber = {
  initialState: () => ({
    value: ""
  }),
  actions: update => ({
    editEntryValue: (id, value) => update({ [id]: PS({}, { value }) })
  })
};

class EntryNumber extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state[nextProps.id] !==
      this.props.state[this.props.id];
  }
  render() {
    const { state, id, actions } = this.props;
    // eslint-disable-next-line no-console
    console.log("render Entry");

    return (
      <div>
        <span
          style={{marginRight: 8}}>
          Entry number:
        </span>
        <input type="text" size="2" value={state[id].value}
          onChange={evt => actions.editEntryValue(id, evt.target.value)} />
      </div>
    );
  }
}

const entryDate = {
  initialState: () => ({
    value: ""
  }),
  actions: update => ({
    editDateValue: (id, value) => update({ [id]: PS({}, { value }) })
  })
};

class EntryDate extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state[nextProps.id] !==
      this.props.state[this.props.id];
  }
  render() {
    const { state, id, actions } = this.props;
    // eslint-disable-next-line no-console
    console.log("render Date");

    return (
      <div style={{marginTop: 8}}>
        <span style={{marginRight: 8}}>Date:</span>
        <input type="text" size="10" value={state[id].value}
          onChange={evt => actions.editDateValue(id, evt.target.value)}/>
      </div>
    );
  }
}

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
);

const temperature = {
  initialState: label => ({
    label,
    value: 20,
    units: "C"
  }),
  actions: update => ({
    increment: (id, amount) => evt => {
      evt.preventDefault();
      update({ [id]: PS({}, { value: S(value => value + amount) }) });
    },
    changeUnits: id => evt => {
      evt.preventDefault();
      update({ [id]: S(state => {
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(state.value, newUnits);
        return P({}, state, { units: newUnits, value: newValue });
      }) });
    }
  })
};

class Temperature extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state[nextProps.id] !==
      this.props.state[this.props.id];
  }
  render() {
    const { state, id, actions } = this.props;
    // eslint-disable-next-line no-console
    console.log("render Temperature", state[id].label);

    return (
      <div className="row" style={{marginTop: 8}}>
        <div className="col-md-3">
          <span>
            {state[id].label} Temperature:
            {state[id].value}&deg; {state[id].units}
          </span>
        </div>
        <div className="col-md-6">
          <button className="btn btn-sm btn-default"
            onClick={actions.increment(id, 1)}>Increment</button>
          <button className="btn btn-sm btn-default"
            onClick={actions.increment(id,-1)}>Decrement</button>
          <button className="btn btn-sm btn-info"
            onClick={actions.changeUnits(id)}>Change Units</button>
        </div>
      </div>
    );
  }
}

const displayTemperature = temperature => temperature.label + ": " +
  temperature.value + "\xB0" + temperature.units;

const app = {
  initialState: () => ({
    saved: "",
    entry: entryNumber.initialState(),
    date: entryDate.initialState(),
    air: temperature.initialState("Air"),
    water: temperature.initialState("Water")
  }),
  actions: update => P({
    save: state => evt => {
      evt.preventDefault();
      update({
        saved: " Entry #" + state.entry.value +
          " on " + state.date.value + ":" +
          " Temperatures: " +
          displayTemperature(state.air) + " " +
          displayTemperature(state.water),

        entry: PS({}, { value: "" }),
        date: PS({}, { value: "" })
      });
    }
  },
  entryNumber.actions(update),
  entryDate.actions(update),
  temperature.actions(update))
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states();
    this.skippedFirst = false;
  }
  componentDidMount() {
    const setState = this.setState.bind(this);
    this.props.states.map(state => {
      if (this.skippedFirst) {
        setState(state);
      }
      else {
        this.skippedFirst = true;
      }
    });
  }
  render() {
    const state = this.state;
    const { actions } = this.props;
    return (
      <form>
        <EntryNumber state={state} id="entry" actions={actions} />
        <EntryDate state={state} id="date" actions={actions} />
        <Temperature state={state} id="air" actions={actions} />
        <Temperature state={state} id="water" actions={actions} />
        <div>
          <button className="btn btn-primary" onClick={actions.save(state)}>
            Save
          </button>
          <span>{state.saved}</span>
        </div>
      </form>
    );
  }
}

const update = flyd.stream();
const states = flyd.scan((state, patch) => P({}, state, patch),
  app.initialState(), update);
const actions = app.actions(update);

ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
