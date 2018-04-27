/*global ReactDOM, flyd*/

// -- Utility code

// Converts a temperature between Celsius and Farenheit
const convert = (value, to) =>
  (to === "C")
    ? Math.round( (value - 32) / 9 * 5 )
    : Math.round( value * 9 / 5 + 32 );

// -- Application code

// Notice that there is NO library-specific API code in the application. Only plain
// objects and functions.

// Creates our app. Accepts an update function that we can use to update the model,
// which automatically triggers a view refresh.
const createApp = function(update) {
  // Actions call update with a function that receives the current model and returns
  // the updated model.
  const actions = {
    increase: amount =>
      update(function(model) {
        model.value += amount;
        return model;
      }),

    changeUnits: () =>
      update(function(model) {
        const newUnits = model.units === "C" ? "F" : "C";
        model.value = convert(model.value, newUnits);
        model.units = newUnits;
        return model;
      })
  };

  // This is the initial model.
  const model = () => ({ value: 22, units: "C" });

  // The view is a function of the model. Event handlers call actions to trigger updates.
  const view = model => (
    <div className="temperature">
      <span>Temperature: {model.value}&deg;{model.units}</span>
      <div>
        <button onClick={() => actions.increase( 1)}>Increase</button>
        <button onClick={() => actions.increase(-1)}>Decrease</button>
      </div>
      <div>
        <button onClick={actions.changeUnits}>Change Units</button>
      </div>
    </div>
  );

  return { model, view };
};

// -- Meiosis pattern setup code

// Create a stream of updates. This is using Flyd, but you could use any stream library.
// OR you could even implement it yourself with just a handful of lines of code. I explain
// this in the Meiosis tutorial: http://meiosis.js.org/tutorial/toc.html
const update = flyd.stream();
// Pass update to our app so that it can issue updates.
const app = createApp(update);

// By scanning the stream of updates and applying the functions to the model,
// we get a stream of models.
const models = flyd.scan((model, func) => func(model), app.model(), update);

const element = document.getElementById("app");
// Every time we get a new model, we re-render the view. The virtual-DOM engine
// takes care of only making minimal DOM changes.
// You could use any other virtual DOM library (Preact, Inferno, Mithril, etc.)
// or even lit-html, hyperHTML just by changing this one line of code!
models.map(model => ReactDOM.render(app.view(model), element));

// -- Only for using the Meiosis Tracer in development
meiosis.trace({ update, dataStreams: [ models ] });
meiosisTracer({ selector: "#tracer" });
