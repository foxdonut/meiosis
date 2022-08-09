/* global m */

const dataActions = {
  loadData: (cell) => {
    cell.update({ loading: true });
    setTimeout(
      () => {
        if (cell.getState().active) {
          cell.update({
            loading: false,
            items: ['One', 'Two']
          });
        }
      },
      1500
    );
  },
  clearData: (cell) => {
    cell.update({ loading: false, items: undefined });
  }
};

export const data = {
  services: [
    {
      onchange: (state) => state.active,
      run: (cell) => {
        if (cell.state.active) {
          dataActions.loadData(cell);
        } else {
          dataActions.clearData(cell);
        }
      }
    }
  ],
  view: (cell, loggedInUser) => [
    m('h4', 'Data page'),
    m('div', 'Logged in user: ', loggedInUser),
    cell.state.loading
      ? m('div', 'Loading, please wait...')
      : m('ul', cell.state.items.map((item) => m('li', item)))
  ]
};
