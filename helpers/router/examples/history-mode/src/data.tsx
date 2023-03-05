import { MeiosisCell, MeiosisViewComponent, Service } from 'meiosis-setup/types';
import { Data, DataProp, State } from './types';

const dataActions = {
  loadData: (cell: MeiosisCell<State>, prop: DataProp) => {
    const nestedCell = cell.nest(prop);
    nestedCell.update({ loading: true });

    setTimeout(
      () => {
        if (cell.state.route.value === prop) {
          nestedCell.update({
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

export const createDataService: (prop: DataProp) => Service<State> = (prop) => ({
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === prop) {
      dataActions.loadData(cell, prop);
    } else {
      dataActions.clearData(cell.nest(prop));
    }
  }
});

export const data: MeiosisViewComponent<Data> = {
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
