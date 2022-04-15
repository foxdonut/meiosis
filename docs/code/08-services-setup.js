/* global m, mergerino */
const merge = mergerino;

const app = {
  initial: {},
  services: [],
  view: (_cell) => []
};

const dropRepeats = (states, onchange = (state) => state) => {
  let prev = undefined;
  const result = m.stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

const update = m.stream();
const states = m.stream.scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });

app.services.forEach((service) => {
  dropRepeats(states, service.onchange).map((state) =>
    service.run(createCell(state))
  );
});

const cells = dropRepeats(states).map(createCell);

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
