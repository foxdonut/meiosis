// @ts-check

export default ({ React, Root }) => ({ states, ...props }) => {
  const [init, setInit] = React.useState(false);
  const [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return React.createElement(Root, Object.assign({ state }, props));
};
