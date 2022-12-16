/** @jsxImportSource preact */
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
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
  view: (cell, loggedInUser) => (
    <div>
      <h4>Data page</h4>
      <div>Logged in user: {loggedInUser}</div>
      {cell.state.loading
        ? <div>Loading, please wait...</div>
        : <ul>{cell.state.items.map((item) => <li>{item}</li>)}</ul>}
    </div>
  )
};
