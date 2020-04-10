import { teaMap } from "./data";

export const service = ({ state }) => {
  if (state.route.page === "TeaDetails") {
    const id = state.route.params.id;
    if (!state.tea || !state.tea[id]) {
      return { tea: () => ({ [id]: teaMap[id].description }) };
    }
  } else {
    return { tea: undefined };
  }
};
