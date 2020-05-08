export const service = (state): any => {
  if (state.routeTransition.leave.Tea) {
    return { teas: null };
  }
};
