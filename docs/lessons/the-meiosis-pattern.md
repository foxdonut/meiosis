# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## The Meiosis Pattern

> IMPORTANT NOTE: For a complete explanation of the Meiosis Pattern,
please see the [Meiosis Tutorial](https://meiosis.js.org/tutorial/toc.html).

This is a quick summary of the Meiosis Pattern:

- Separate state management code from view code.
- Start with an initial state.
- Create an `update` stream of **patches**.
- Patches can be [Patchinko](http://meiosis.js.org/tutorial/05-meiosis-with-patchinko.html)
patches, [Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html),
or your own patches.
- Create an `actions` object of functions that issue patches onto the `update` stream.
- Create a `states` stream by using `scan` on the `update` stream with the initial state and
`P` for Patchinko or `(x, f) => f(x)` for function patches.
- Pass `state` and `actions` to views (see below for details.)

Here is the code to set up the Meiosis Pattern:

```js
const app = {
  initialState: ...,
  actions: function(update) {
    return ...
  }
}

const update = flyd.stream()

// Using Patchinko:
const states = flyd.scan(P, app.initialState, update)

// Using Function Patches:
const states = flyd.scan((x, f) => f(x), app.initialState, update)

const actions = app.actions(update)
```

Then, pass `state` and `actions` to views.

### Using Mithril

```js
const App = {
  view: function({ attrs: { state, actions } }) {
    // render view according to state, call actions to trigger changes
    // pass { state, actions } to other components.
  }
}

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
})
```

### Using React

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.states()
  }
  componentDidMount() {
    const setState = this.setState.bind(this)
    this.props.states.map(state => { setState(state) })
  }
  render() {
    const state = this.state
    const { actions } = this.props
    // render view according to state, call actions to trigger changes
    // pass state={state} actions={actions} to other components.
  }
}

ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"))
```

### Using Preact

```js
class App extends preact.Component {
  componentWillMount() {
    const setState = this.setState.bind(this)
    this.props.states.map(state => { setState(state) })
  }
  render() {
    const state = this.state
    const { actions } = this.props
    // render view according to state, call actions to trigger changes
    // pass state={state} actions={actions} to other components.
  }
}

preact.render(<App states={states} actions={actions} />,
  document.getElementById("app"))
```

### Using lit-html

```js
const App = (state, actions) => {
  // render view according to state, call actions to trigger changes
  // pass (state, actions) to other view functions.
}

const element = document.getElementById("app")
states.map(state => render(App(state, actions), element))
```

### Components

To use multiple instances of a component, or to specify the state property outside of a component,
pass an `id` along with `state` and `actions` to views. Use `state[id]` to read the component's
state, pass the `id` to `actions`, and use the `id` in actions to issue patches that update the
corresponding state property.

See the [Components](http://meiosis.js.org/tutorial/06-components.html) section of the Meiosis
Tutorial for a complete explanation.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
