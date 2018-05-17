/* global React, ReactDOM, flyd, Immutable */
const nestUpdate = (update, prop) => func =>
  update(model => model.update(prop, func));

const nestComponent = (createComponent, update, prop) => {
  const Component = createComponent(nestUpdate(update, prop));
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    static model() {
      return { [prop]: Component.model() };
    }

    render() {
      return (<Component model={this.props.model.get(prop)} />);
    }
  };
};

const createEntryNumber = update => {
  const actions = {
    editEntryValue: evt => update(model => model.set("value", evt.target.value))
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
          <span>Entry number:</span>
          <input type="text" size="2" value={model.get("value")} onChange={actions.editEntryValue}/>
        </div>
      );
    }
  };
};

const createEntryDate = update => {
  const actions = {
    editDateValue: evt => update(model => model.set("value", evt.target.value))
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
        <div>
          <span>Date:</span>
          <input type="text" size="10" value={model.get("value")} onChange={actions.editDateValue}/>
        </div>
      );
    }
  };
};

const createTemperature = label => update => {
  const actions = {
    increase: value => evt => {
      evt.preventDefault();
      update(model =>
        model.update("value", v => v + value));
    },
    changeUnits: evt => {
      evt.preventDefault();
      update(model => {
        if (model.get("units") === "C") {
          return model.set("units", "F").
            set("value", Math.round( model.get("value") * 9 / 5 + 32 ));
        }
        else {
          return model.set("units", "C").
            set("value", Math.round( (model.get("value") - 32) / 9 * 5 ));
        }
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
      // eslint-disable-next-line no-console
      console.log("render Temperature", this.props.model.get("label"));
      const model = this.props.model;

      return (
        <div className="row">
          <div className="col-md-3">
            <span>
              {model.get("label")} Temperature:
              {model.get("value")}&deg;{model.get("units")}
            </span>
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
  const EntryNumber = nestComponent(createEntryNumber, update, "entry");
  const EntryDate = nestComponent(createEntryDate, update, "date");
  const Air = nestComponent(createTemperature("Air"), update, "airTemperature");
  const Water = nestComponent(createTemperature("Water"), update, "waterTemperature");

  const displayTemperature = temperature =>
    temperature.get("label") + ": " +
    temperature.get("value") + "\xB0" + temperature.get("units");

  const actions = {
    save: evt => {
      evt.preventDefault();
      update(model => {
        return model.
          set("saved", "Entry #" + model.getIn(["entry", "value"]) +
            " on " + model.getIn(["date", "value"]) + ":" +
            " Temperatures: " +
            displayTemperature(model.get("airTemperature")) + " " +
            displayTemperature(model.get("waterTemperature"))).
          setIn(["entry", "value"], "").
          setIn(["date", "value"], "");
      });
    }
  };

  return class extends React.PureComponent {
    static model() {
      return Object.assign(
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
            <button className="btn btn-primary" onClick={actions.save}>Save</button>{" "}
            <span>{model.get("saved")}</span>
          </div>
        </form>
      );
    }
  };
};

const update = flyd.stream();
const App = createApp(update);
const models = flyd.scan((model, func) => func(model),
  Immutable.fromJS(App.model()), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(<App model={model} />, element));
