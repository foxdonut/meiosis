# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | | |
| ---- | ---- | ---- |
| [&rarrhk; TypeScript Support](setup-typescript-support.html) | [&larrhk; Services](setup-services.html) | [&#8673; Table of Contents](setup-toc.html) |

## Nested Components

`meiosis-setup` automatically sets up Meiosis with Nesting (explained in the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/09-nesting.html)), so that you can call `cell.nest` to get a
nested cell:

```js
cell.nest('someProperty')
```

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
`oneComponent`. If you need to pass more parameters to the view, add them and they will be passed
along. For example:

```js
cell.nested.one.view(cell, 'more', 'parameters')
```

### Example

Below is an example of using nested components.

Notice how the `login` and `data` components can focus on their state without being "aware" of where
their state is nested within the application state.

Also note how the application view can call `cell.nested[cell.state.page].view(cell)`, and
`.view(cell)` will automatically pass the nested cell to the view.

Finally, you can see that the `data` component is reused as-is simply by nesting it with different
properties, `data1` and `data2`.

@flems {"files":"code/setup-nested-components.js,code/home.js,code/login.js,code/data.js,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,mithril,mergerino","middle":65,"height":800}

| | | |
| ---- | ---- | ---- |
| [&rarrhk; TypeScript Support](setup-typescript-support.html) | [&larrhk; Services](setup-services.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
