import { fold, cases } from "static-tagged-union";

export const service = ({ state }) =>
  fold(
    cases(["Tea", "TeaDetails"])(() => {
      if (!state.teas) {
        return { loadTeas: true };
      }
    }),
    {
      _: () => {
        if (state.teas) {
          return { teas: undefined };
        }
      }
    }
  )(state.route);
