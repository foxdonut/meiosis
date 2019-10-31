import { beverageMap } from "./data";

export const service = ({ state }) => {
  const patches = [];

  if (state.routeTransition.arrive.Beverage) {
    const id = state.routeTransition.arrive.Beverage.params.id;
    const description = beverageMap[id].description;
    patches.push({ beverage: { [id]: description } });
  }

  if (state.routeTransition.leave.Beverage) {
    const id = state.routeTransition.leave.Beverage.params.id;
    patches.push({ beverage: { [id]: undefined } });
  }

  return { state: patches };
};
