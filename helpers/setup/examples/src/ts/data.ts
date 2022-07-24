import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import m from 'mithril';
import { Data } from './types';

const dataActions = {
  loadData: (cell: MeiosisCell<Data>) => {
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
  clearData: (cell: MeiosisCell<Data>) => {
    cell.update({ loading: false, items: undefined });
  }
};

export const data: MeiosisViewComponent<Data> = {
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
  view: (cell) => [
    m('h4', 'Data page'),
    cell.state.loading
      ? m('div', 'Loading, please wait...')
      : m(
        'ul',
        cell.state.items.map((item) => m('li', item))
      )
  ]
};
