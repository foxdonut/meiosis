// @ts-check

export default ({ h, useState, Root }) => ({ states, ...props }) => {
  const [state, setState] = useState(states());
  states.map(setState);

  return h(Root, Object.assign({ state }, props));
};
