# Meiosis Wiki

[Table of Contents](toc.html)

## Components

In this section, we'll look at structuring code into components.

### Components are plain objects and functions

I use the term "components", which means many different things to different people, contexts,
frameworks, and libraries.

I want to make it clear before going further that what I refer to in Meiosis as "components" are really just
plain objects and functions. Simple functions, or functions that return other functions, but just functions
nonetheless. There's no hidden behaviour and nothing magical. Most importantly, _you_ decide how you want to
structure components.

I use "components" because "objects" and "functions" are too generic. I call "components" the building
blocks that are assembled together to create a web application.

### Component

Here is a temperature component:

```javascript
import { createActions } from "./actions";
import { createView } from "./view";

export const createTemperature = update => ({
  model: () => ({
    date: "",
    value: 20,
    units: "C"
  }),

  view: createView(createActions(update))
});
```

We have a function to create the component, which receives `update`. We return an object with a
`model` function that returns the component's initial model, and a `view` function to render the
view. The view gets created from actions; actions are created by passing in `update`.

### Actions

Actions call `update` to update the model:

```javascript
export const createActions = update => ({
  editDate: evt =>
    update(model => {
      model.date = evt.target.value;
      return model;
    }),

  increase: amount => _evt =>
    update(model => {
      model.value = model.value + amount;
      return model;
    }),

  changeUnits: _evt => update(model => {
    if (model.units === "C") {
      model.units = "F";
      model.value = Math.round( model.value * 9 / 5 + 32 );
    }
    else {
      model.units = "C";
      model.value = Math.round( (model.value - 32) / 9 * 5 );
    }
    return model;
  })
});
```

We have actions for:
- Editing the date.
- Increasing the temperature. We can also decrease simply by passing a negative amount.
- Changing the units between Celsius and Farenheit.

The view can conveniently call these actions.

### View

The view is straightforward:

```javascript
export const createView = actions => model => (
  <div>
    <div>Date: <input type="text" size="10" value={model.date}
                 onChange={actions.editDate}/></div>
    <span>Temperature: {model.value}&deg;{model.units} </span>
    <div>
      <button onClick={actions.increase(1)}>Increase</button>
      <button onClick={actions.increase(-1)}>Decrease</button>
    </div>
    <div>
      <button onClick={actions.changeUnits}>Change Units</button>
    </div>
  </div>
);
```

The view simply renders the values from the model and calls actions when the user interacts
with the UI.

### The Meiosis Pattern

We can now set up and use our component with the Meiosis Pattern:

```javascript
import flyd from "flyd";
import { createTemperature } from "./temperature";

const update = flyd.stream();
const temperature = createTemperature(update);
const models = flyd.scan((model, func) => func(model),
  temperature.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(temperature.view(model), element));
```

Notice that the pattern works the same as before. After creating the `temperature` component,
we can get the initial model from its `model()` function, and render the view by calling
`temperature.view(model)`.

You can see the full code example and experiment with it below:

@flems code/01-Fundamentals/C-Components/temperature.jsx,code/01-Fundamentals/C-Components/index.js,app.html,app.css react,react-dom,flyd 700

### Principles / Takeaways

- We can create components with plain objects and functions.
- Having `model` and `view` functions is one way to structure components, but not the only way.
Ultimately, you are in control of how you want to structure your components.

### Up Next

Before continuing to discuss components, we'll look at the time-travel development tool that Meiosis
provides, the [Meiosis Tracer](01-Fundamentals-D-Using-the-Tracer.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
