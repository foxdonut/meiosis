// @ts-check

export default ({ React, Root }) => ({ states, update, actions }) => {
  const [init, setInit] = React.useState(false);
  const [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return React.createElement(Root, { state, update, actions });
};
