import { teaMap } from "./data";
import { allRoutes } from "../routes";
import { path } from "../util";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: () => (state.tea ? { tea: undefined } : null),
  TeaDetails: ({ id }) =>
    !path(["tea", id], state) ? { tea: { [id]: teaMap[id].description } } : null
});
