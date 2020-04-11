export const service = ({ state }) => {
  if (state.route.page === "Tea") {
    if (!state.teas) {
      return { loadTeas: true };
    }
  } else if (state.teas) {
    return { teas: undefined };
  }
};
