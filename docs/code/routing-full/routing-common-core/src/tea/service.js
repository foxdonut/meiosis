export const service = state => {
  if (state.routeTransition.leave.Tea) {
    return { teas: null };
  }
};
