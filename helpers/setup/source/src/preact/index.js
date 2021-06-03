// @ts-check

export default ({ h, useState, Root }) => ({ states, update, actions }) => {
  const [state, setState] = useState(states());
  states.map(setState);

  return h(Root, { state, update, actions });
};
