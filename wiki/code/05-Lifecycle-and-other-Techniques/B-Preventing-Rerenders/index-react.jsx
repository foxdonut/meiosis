/* global React, ReactDOM, flyd, _ */
const nestUpdate = (update, path) => func =>
  update(model => _.update(model, path, func));

const nestComponent = (createComponent, update, path) => {
  const Component = createComponent(nestUpdate(update, path));
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    static model() {
      return _.set({}, path, Component.model());
    }

    render() {
      return (<Component model={_.get(this.props.model, path)} />);
    }
  };
};

const createEntryNumber = update => {
  const actions = {
    editEntryValue: evt => update(model => Object.assign({}, _.set(model, "value", evt.target.value)))
  };

  return class extends React.PureComponent {
    static model() {
      return {
        value: ""
      };
    }

    render() {
      // eslint-disable-next-line no-console
      console.log("render Entry");
      const model = this.props.model;

      return (
        <div>
          <span style={{marginRight: 8}}>Entry number:</span>
          <input type="text" size="2" value={model.value} onChange={actions.editEntryValue}/>
        </div>
      );
    }
  };
};

const createEntryDate = update => {
  const actions = {
    editDateValue: evt => update(model => Object.assign({}, _.set(model, "value", evt.target.value)))
  };

  return class extends React.PureComponent {
    static model() {
      return {
        value: ""
      };
    }

    render() {
      // eslint-disable-next-line no-console
      console.log("render Date");
      const model = this.props.model;

      return (
        <div style={{marginTop: 8}}>
          <span style={{marginRight: 8}}>Date:</span>
          <input type="text" size="10" value={model.value}
            onChange={actions.editDateValue}/>
        </div>
      );
    }
  };
};

const createTemperature = label => update => {
  const actions = {
    increase: value => evt => {
      evt.preventDefault();
      update(model => Object.assign({}, _.update(model, "value", previous => _.add(previous, value))));
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        if (model.units === "C") {
          model.units = "F";
          model.value = Math.round( model.value * 9 / 5 + 32 );
        }
        else {
          model.units = "C";
          model.value = Math.round( (model.value - 32) / 9 * 5 );
        }
        return Object.assign({}, model);
      });
    }
  };

  return class extends React.PureComponent {
    static model() {
      return {
        label,
        value: 20,
        units: "C"
      };
    }

    render() {
      const model = this.props.model;
      // eslint-disable-next-line no-console
      console.log("render Temperature", model.label);

      return (
        <div className="row" style={{marginTop: 8}}>
          <div className="col-md-3">
            <span>{model.label} Temperature: {model.value}&deg;{model.units} </span>
          </div>
          <div className="col-md-6">
            <button className="btn btn-sm btn-default" onClick={actions.increase(1)}>Increase</button>{" "}
            <button className="btn btn-sm btn-default" onClick={actions.increase(-1)}>Decrease</button>{" "}
            <button className="btn btn-sm btn-info" onClick={actions.changeUnits}>Change Units</button>
          </div>
        </div>
      );
    }
  };
};

const createApp = update => {
  const displayTemperature = temperature => temperature.label + ": " +
    temperature.value + "\xB0" + temperature.units;

  const actions = {
    save: evt => {
      evt.preventDefault();
      update(model => {
        model.saved = " Entry #" + model.entry.value +
          " on " + model.date.value + ":" +
          " Temperatures: " +
          displayTemperature(model.temperature.air) + " " +
          displayTemperature(model.temperature.water);

        model.entry.value = "";
        model.date.value = "";

        return Object.assign({}, model);
      });
    }
  };

  const EntryNumber = nestComponent(createEntryNumber, update, ["entry"]);
  const EntryDate = nestComponent(createEntryDate, update, ["date"]);
  const Air = nestComponent(createTemperature("Air"), update, ["temperature", "air"]);
  const Water = nestComponent(createTemperature("Water"), update, ["temperature", "water"]);

  return class extends React.Component {
    static model() {
      return _.merge(
        { saved: "" },
        EntryNumber.model(),
        EntryDate.model(),
        Air.model(),
        Water.model()
      );
    }

    render() {
      const model = this.props.model;

      return (
        <form>
          <EntryNumber model={model} />
          <EntryDate model={model} />
          <Air model={model} />
          <Water model={model} />
          <div>
            <button className="btn btn-primary" onClick={actions.save}>Save</button>
            <span>{model.saved}</span>
          </div>
        </form>
      );
    }
  };
};

const update = flyd.stream();
const App = createApp(update);
const models = flyd.scan((model, func) => func(model),
  App.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(<App model={model} />, element));
