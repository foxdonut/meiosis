import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { teaMap } from "./data";
import { path } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.tea ? { tea: undefined } : null)),
      TeaDetails: ({ id }) =>
        !path(["tea", id], state) ? { tea: { [id]: teaMap[id].description } } : null
    })
  );
