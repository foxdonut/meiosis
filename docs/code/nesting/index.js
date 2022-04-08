/* global flyd, preact */
const app = {
  initial: {},
  view: (cell) => cell
};

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

const update = flyd.stream();
const states = flyd.scan(
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

const element = document.getElementById("app");
cells.map((cell) => preact.render(app.view(cell), element));
