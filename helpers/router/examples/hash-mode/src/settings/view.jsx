/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { actions } from './actions';

export const Settings = ({ cell }) => (
  <>
    <h4>Settings Page</h4>
    <button class="btn btn-primary" onClick={() => actions.logout(cell)}>
      Logout
    </button>
  </>
);
