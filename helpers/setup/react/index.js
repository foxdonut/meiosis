/**
 * Helper to setup the Meiosis pattern with [React](https://reactjs.org/).
 *
 * @function meiosis.react.setup
 *
 * @param {React} React - the React instance.
 * @param {React.Component} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {React.Component} - the top-level component to which you pass `states`, and either
 * `update`, `actions`, or both.
 */
export default ({ React, Root }) => ({ states, update, actions }) => {
  const [init, setInit] = React.useState(false);
  const [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return React.createElement(Root, { state, update, actions });
};
