import { fold } from "static-tagged-union";

import { teaMap } from "./data";

export const service = ({ state }) =>
  fold({
    TeaDetails: ({ id }) => {
      if (!state.tea || !state.tea[id]) {
        return { tea: () => ({ [id]: teaMap[id].description }) };
      }
    },
    _: () => {
      if (state.tea) {
        return { tea: undefined };
      }
    }
  })(state.route);
