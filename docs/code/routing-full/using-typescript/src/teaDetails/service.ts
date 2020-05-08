import { teaMap } from "./data";

export const service = (state): any => {
  const patches = [];

  if (state.routeTransition.arrive.TeaDetails) {
    const id = state.routeTransition.arrive.TeaDetails.params.id;
    const description = teaMap[id].description;
    patches.push({ tea: { [id]: description } });
  }

  if (state.routeTransition.leave.TeaDetails) {
    const id = state.routeTransition.leave.TeaDetails.params.id;
    patches.push({ tea: { [id]: undefined } });
  }

  return patches;
};
