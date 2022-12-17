/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

export const Home = ({ cell }) => (
  <>
    <h4>Home Page</h4>
    {cell.state.user &&
      <div>You are logged in as: {cell.state.user}</div>}
    {cell.state.message && <div>{cell.state.message}</div>}
  </>
);
