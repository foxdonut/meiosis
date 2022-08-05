# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-view-library.html:View Library
@nav-setup-toc
@nav-next:setup-nested-components.html:Nested Components
@docs-nav-end

## Services

To set up Meiosis with Services (explained in the Meiosis Documentation:
[reference](https://meiosis.js.org/docs/08-services.html)), use the `services` property of `app`:

```js
const app = {
  services: [...]
};

const cells = meiosisSetup({ app });
```

Each service is an object with a `run` function and, optionally, an `onchange` function.
`meiosis-setup` automatically wires up services, calling `onchange` (if defined) and calling `run`
only when the value returned by `onchange` changes:

```js
const service = {
  onchange: (state) => state.x,
  // run is called only when x changes, thus avoiding infinite loops
  run: (cell) => {
    cell.update({ y: cell.state.x * 10 });
  }
};
```

If a service does not have an `onchange` function, its `run` function will be called for every state
change. Thus it must make sure to avoid an infinite loop:

```js
const service = {
  run: (cell) => {
    if (cell.state.data === undefined) {
      loadData().then(data => {
        cell.update({ data });
      })
    }
  }
}
```

Services can also be nested using nested components, which we will look at next.

@docs-nav-start
@nav-prev:setup-view-library.html:View Library
@nav-setup-toc
@nav-next:setup-nested-components.html:Nested Components
@docs-nav-end

