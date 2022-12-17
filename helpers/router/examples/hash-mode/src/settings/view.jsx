/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

export const Settings = ({ actions }) => (
  <>
    <h3>Settings Page</h3>
    <button class="btn btn-danger"
      onClick={() => actions.settings.logout()}>Logout</button>
  </>
);
