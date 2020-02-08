export const service = ({ state }) => {
  if (state.routeTransition.arrive.Beer) {
    return { pleaseWait: true };
  }
  if (state.routeTransition.leave.Beer) {
    return { beers: null };
  }
};
