import { assoc, dissoc, identity as I, path } from "ramda";
import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { teaMap } from "./data";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.tea ? dissoc("tea") : I)),
      TeaDetails: ({ id }) =>
        !path(["tea", id], state) ? assoc("tea", { [id]: teaMap[id].description }) : I
    })
  );
