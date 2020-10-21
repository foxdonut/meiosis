// @ts-check

/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @function meiosis.preact.setup
 *
 * @param {preact.h} h - the Preact h function.
 * @param {*} useState - the Preact hooks useState function.
 * @param {preact.AnyComponent} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {preact.FunctionalComponent} - the top-level component to which you pass `states`, and
 * either `update`, `actions`, or both.
 */
export default preactSetup => ({ states, update, actions }) => {
  const { h, useState, Root } = preactSetup;
  const [state, setState] = useState(states());
  states.map(setState);

  return h(Root, { state, update, actions });
};
