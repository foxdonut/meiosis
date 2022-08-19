# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-services.html:Services
@nav-setup-ts-toc
@nav-next:setup-ts-stream-implementation.html:Stream Implementation
@docs-nav-end

## Nested Components

### Nested Cell TypeScript Support

`meiosis-setup` automatically sets up Meiosis with Nesting (explained in the Meiosis Documentation:
[reference](https://meiosis.js.org/docs/09-nesting.html)), so that you can call `cell.nest` to get a
nested cell:

```js
cell.nest('someProperty')
```

With TypeScript support, when entering a string within `nest('')`, auto-suggest indicates valid
properties. Moreover, specifying an invalid property results in an error.

Once we have a nested cell, `cell.state.x..` auto-suggested nested properties, as does
`cell.update({ x: ... })`.

Try experimenting with the code below.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/snippets/nested-cells.ts" style="width:100%;height:500px"></iframe>

### Nested Components

`meiosis-setup` also provides **nested components**. This conveniently combines nesting of:
- initial state
- services
- views

into **components**. Components can operate on their `cell.state` without being "aware" of how their
state is nested within the application state.

Also, a component can be reused multiple times simply by nesting it again with a different property.

To specify nested components, use the `nested` property of `app`:

```js
const app = {
  nested: {
    ...
  }
};

const cells = meiosisSetup({ app });
```

Within `nested`, specify properties on the application state where components will be nested. For
each property, specify an object with the same structure as an `app` object, that is, with
`initial` and/or `services`. Moreover, you can also specify a `view`. For example:

```js
const oneComponent = {
  initial: {
    counter: 0
  },
  services: [...],
  view: (cell) => ...
};

const twoComponent = {
  initial: {
    duck: 'yellow'
  },
  view: (cell) => ...
};

const app = {
  nested: {
    one: oneComponent,
    two: twoComponent
  }
}
```

### Initial State

In the example above, the initial state will be:

```js
{
  one: {
    counter: 0
  },
  two: {
    duck: 'yellow'
  }
}
```

### Services

For the `onchange` and `run` functions of the services in `oneComponent`:

```js
{
  onchange: (state) => ...
  run: (cell) => ...
}
```

The `state` passed the `onchange` function will be

```js
{
  counter: 0
}
```

And `cell.nest('one')` will be passed to the `run` function.

### View

To call the `view` function of `oneComponent`, use the following code from the parent view:

```js
cell.nested.one.view(cell)
```

the parent view. This will automatically pass `cell.nest('one')` to the `view` function of
`oneComponent`.

### Passing Additional Parameters

If you need to pass more parameters to the view, add them and they will be passed along. For
example:

```js
cell.nested.one.view(cell, cell.state.loggedInUser)
```

The first parameter, `cell`, will pass the **nested** cell to the view. If we also need data from
the parent state, we can pass it in the additional parameters, as shown above.

### Updating Parent State

Besides passing parent state to a nested component, we may sometimes need to update a parent state
property from a nested component.

Let's say we have a component that is nested within `login`, and we want to update the parent state
by setting the `loggedInUser` property using the `onLogin` action below:

```js
const actions = {
  onLogin: (cell, loggedInUser) => {
    cell.update({ loggedInUser });
  }
};
```

Again we can simply pass an additional property to the view, this time passing a function that calls
`actions.onLogin`:

```js
cell.nested.login.view(cell,
  (loggedInUser) => actions.onLogin(cell, loggedInUser))
```

The nested `login` view can then get `onLogin` as a parameter:

```js
const login = {
  view: (cell, onLogin) => ...
};
```

The view can then call `onLogin` at the appropriate time, passing the logged in user.

### Deep Nesting

Finally, note that nested components can in turn have a `nested` property and themselves use nested
components. Thus you can nest components at deeper levels within your application.

### Example

Below is an example of using nested components.

Notice how the `login` and `data` components can focus on their state without being "aware" of where
their state is nested within the application state.

Also note how the application view can call nested views with `view(cell)`, which will automatically
pass the nested cell to the view.

The `login` component shows how to update the parent state by passing an additional callback
parameter that calls `actions.onLogin.

The `data` component exemplifies passing parent state to the component, in this case the logged in
user.

Finally, you can see that the `data` component is reused as-is simply by nesting it with different
properties, `data1` and `data2`.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples/nested-components?embed=1&terminalHeight=0&ctl=1&view=both&file=src/index.ts" style="width:100%;height:600px"></iframe>

@docs-nav-start
@nav-prev:setup-ts-services.html:Services
@nav-setup-ts-toc
@nav-next:setup-ts-stream-implementation.html:Stream Implementation
@docs-nav-end
