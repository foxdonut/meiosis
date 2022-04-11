# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](10-services.html) |
[Next >](12-preventing-re-renders.html) |
[Table of Contents](toc.html)

## 11- Nesting

```js
const nestPatch = (patch, prop) => (state) =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

const nestUpdate = (parentUpdate, prop) => (patch) =>
  parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  const nested = {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };

  return nested;
};

const update = stream();
const states = scan(
  (state, patch) => patch(state),
  app.initial,
  update
);
const nest = nestCell(states, update);

const cells = states.map((state) => ({
  state,
  update,
  nest
}));
```

[< Previous](10-services.html) |
[Next >](12-preventing-re-renders.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](https://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
