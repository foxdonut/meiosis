// @ts-check

/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @function meiosis.preact.setup
 *
 * @param {*} h - the Preact h function.
 * @param {*} useState - the Preact hooks useState function.
 * @param {*} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {*} - the top-level component to which you pass `states`, and
 * either `update`, `actions`, or both.
 */
export default ({ h, useState, Root }) => ({ states, update, actions }) => {
  const [state, setState] = useState(states());
  states.map(setState);

  return h(Root, { state, update, actions });
};
