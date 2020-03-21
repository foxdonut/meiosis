/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @function meiosis.preact.setup
 *
 * @param {preact.h} - the Preact h function.
 * @param {preact.useState} - the Preact useState function.
 * @param {preact.Component} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {preact.Component} - the top-level component to which you pass `states`, and either
 * `update`, `actions`, or both.
 */
export default ({ h, useState, Root }) => ({ states, update, actions }) => {
  const [state, setState] = useState(states());
  states.map(setState);

  return h(Root, { state, update, actions });
};
