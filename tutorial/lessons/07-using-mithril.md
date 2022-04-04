# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](06-components.html) |
[Next >](08-using-preact.html) |
[Table of Contents](toc.html)

## 07 - Using Mithril

In the [06 - Components](06-components.html) lesson, we created the state management code for an
example with a `conditions` component and two temperature components, `temperature:air` and
`temperature:water`.

In this section, we'll wire this up to [Mithril](http://mithril.js.org/).

<a name="mithril_stream"></a>
### [Mithril Stream](#mithril_stream)

First, we can use [Mithril Stream](https://mithril.js.org/stream.html) as a stream library. For our
purposes, it works just like `flyd`. The only difference is that you call `m.stream()` instead of
`flyd.stream()`, and `m.stream.scan` instead of `flyd.scan`.

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Next, remember that we had an `actions` object and a `states` stream:

```js
var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
});
```

Now, we'll use `m.mount` and a minimal Mithril component to render the view. We'll pass the
`actions` and `state` attributes to a top-level `App` component:

```js
m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
```

We are calling `states()` to get the latest from the stream and pass it as the `state` attribute.

With Mithril's [auto-redraw system](https://mithril.js.org/autoredraw.html), the view is
automatically re-rendered after user interaction.

<a name="the_app_component"></a>
### [The App Component](#the_app_component)

The `App` component retrieves `state` and `actions` from the passed-in attributes. We pass these on
to other components, in this case `Conditions` and `Temperature`. Notice that we have two instances
of `Temperature`, and we pass a different `id` to each one.

```js
var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div",
      m(Conditions, { state, id: "conditions", actions }),
      m(Temperature, { state, id: "temperature:air", actions }),
      m(Temperature, { state, id: "temperature:water", actions }),
      m("pre", JSON.stringify(state, null, 4))
    );
  }
};
```

<a name="the_conditions_component"></a>
### [The Conditions Component](#the_conditions_component)

The `Conditions` component displays a checkbox for "precipitations" and a series of radio butons for
the sky (Sunny, Cloudy, Mix of sun/clouds). The `state` is used to reflect the current state, and
`actions` are called to update the state when the user changes the checkbox and radio buttons:

```js
var skyOption = function({ state, id, actions, value, label }) {
  return m("label",
    m("input", { type: "radio", id: value, name: "sky",
      value, checked: state[id].sky === value,
      onchange: evt => actions.changeSky(id, evt.target.value)
    }),
    label
  );
};

var Conditions = {
  view: function(vnode) {
    var { state, id, actions } = vnode.attrs;
    return m("div",
      m("label",
        m("input", {
          type: "checkbox",
          checked: state[id].precipitations,
          onchange: evt =>
            actions.togglePrecipitations(id, evt.target.checked)
        }),
        "Precipitations"
      ),
      m("div",
        skyOption({ state, id, actions, value: "SUNNY",
          label: "Sunny"}),
        skyOption({ state, id, actions, value: "CLOUDY",
          label: "Cloudy"}),
        skyOption({ state, id, actions, value: "MIX",
          label: "Mix of sun/clouds"})
      )
    );
  }
};
```

<a name="the_temperature_component"></a>
### [The Temperature Component](#the_temperature_component)

The `Temperature` component is similar:

```js
var Temperature = {
  view: function(vnode) {
    var { state, id, actions } = vnode.attrs;
    return m("div",
      state[id].label, " Temperature: ",
      state[id].value, m.trust("&deg;"), state[id].units,
      m("div",
        m("button",
          { onclick: () => actions.increment(id, 1) },
          "Increment"),
        m("button",
          { onclick: () => actions.increment(id,-1) },
          "Decrement")
      ),
      m("div",
        m("button",
          { onclick: () => actions.changeUnits(id) },
          "Change Units")
      )
    );
  }
};
```

You can see the complete example below.

@flems code/07-using-mithril-01.js,app.html,app.css mithril,mithril-stream,mergerino 800 shown 60

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to Mithril using `m.mount` and passing `state` from the latest value of the
`states` stream, along with `actions`, to the top-level Mithril component.

Then, all Mithril components in the application are consistent: they all receive `state` and
`actions`. When rendering other components, `state` and `actions` are passed along. When a component
is used multiple times, or when you want to define the state property outside of the component, you
also pass the `id`.

Components can then use the `state` to render the view according to the current application state,
and call `actions` to trigger changes. Because of Mithril's
[auto-redraw system](https://mithril.js.org/autoredraw.html), the view is automatically re-rendered.
Of course, if you trigger state changes outside of Mithril's auto-redraw (see [When Mithril does not
redraw](https://mithril.js.org/autoredraw.html#when-mithril-does-not-redraw)) you have to call
`m.redraw()` yourself.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

This concludes the Meiosis tutorial. See [10 - What's Next?](10-whats-next.html) for ideas on where
to go from here.

[< Previous](06-components.html) |
[Next >](08-using-preact.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
