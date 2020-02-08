export const service = ({ state }) => {
  const patches = [];

  if (state.routeTransition.arrive.Brewer) {
    const id = state.routeTransition.arrive.Brewer.params.id;
    patches.push({ brewer: { [id]: `Brewer of beverage ${id}` } });
  }

  if (state.routeTransition.leave.Brewer) {
    const id = state.routeTransition.leave.Brewer.params.id;
    patches.push({ brewer: { [id]: undefined } });
  }

  return patches;
};
