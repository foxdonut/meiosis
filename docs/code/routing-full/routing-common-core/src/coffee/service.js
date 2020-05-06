export const service = state => {
  if (state.routeTransition.arrive.Coffee) {
    return { pleaseWait: true };
  }
  if (state.routeTransition.leave.Coffee) {
    return { coffees: null };
  }
};
