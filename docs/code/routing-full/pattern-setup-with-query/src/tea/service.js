export const service = ({ state }) => {
  if (state.route.page === "Tea" || state.route.page === "TeaDetails") {
    if (!state.teas) {
      return { loadTeas: true };
    }
  } else if (state.teas) {
    return { teas: undefined };
  }
};
