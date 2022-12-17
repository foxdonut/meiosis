/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

export const Home = ({ cell }) => (
  <>
    <h3>Home Page</h3>
    {cell.state.user &&
      <div>You are logged in as: {cell.state.user}</div>}
    {cell.state.message && <div>state.message</div>}
  </>
);
