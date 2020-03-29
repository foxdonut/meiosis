import { fold } from "static-tagged-union";
import { G, T } from "ducklings";

import { teaMap } from "./data";

export const service = ({ state }) =>
  T(state.route)(
    fold({
      TeaDetails: ({ id }) =>
        !G(["tea", id])(state) && { tea: () => ({ [id]: teaMap[id].description }) },
      _: () => ({ tea: undefined })
    })
  );
