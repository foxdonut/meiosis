export const service = ({ state }) => {
  if (state.route.page === "Tea") {
    if (!state.teas) {
      return { loadTeas: true };
    } else if (
      Object.keys(state.filter).length === 0 &&
      Object.keys(state.route.queryParams).length > 0
    ) {
      return { filter: state.route.queryParams };
    }
  } else if (state.teas) {
    return { teas: undefined, filter: () => ({}) };
  }
};
