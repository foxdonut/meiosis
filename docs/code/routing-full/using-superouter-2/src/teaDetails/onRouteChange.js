import { teaMap } from "./data";
import { path } from "../util";

export const onRouteChange = ({ state }) => [
  () => (state.tea ? { tea: undefined } : null),
  {
    TeaDetails: ({ id }) =>
      !path(["tea", id], state) ? { tea: { [id]: teaMap[id].description } } : null
  }
];
