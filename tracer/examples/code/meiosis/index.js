/*global m, meiosisTracer*/

const actions = {
  increase: (cell) => cell.update((model) => {
    model.value = model.value + 1;
    return model;
  }),
  editName: (cell, value) => cell.update((model) => {
    model.name = value;
    return model;
  })
};

const view = (cell) =>
  m('div',
    m('div',
      m('span', 'Counter: ', cell.state.value, ' '),
      m('button.btn.btn-primary.btn-sm.ms-2',
        { onclick: () => actions.increase(cell) },
        'Increase')
    ),
    m('div.mt-3',
      m('span', 'Name: '),
      m('input', {
        type: 'text', value: cell.state.name,
        oninput: (evt) => actions.editName(cell, evt.target.value)
      })
    ),
    m('div.mt-2',
      m('span', 'Hello, ', cell.state.name)
    )
  );

const initial = { value: 0, name: '' };
const update = m.stream();
const states = m.stream.scan((state, fn) => fn(state),
  initial, update);
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);

const element = document.getElementById('app');
cells.map((cell) => { m.render(element, view(cell)); });

meiosisTracer({ selector: '#tracer', streams: [states] });
