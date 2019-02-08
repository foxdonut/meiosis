import { T, caseOf, fold, onChange } from "../util";

export const root = {
  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Request: route => {
          if (route.case !== state.routeCurrent.case) {
            update({
              routeStatus: caseOf("Leaving", {
                from: state.routeCurrent,
                to: route
              })
            });
          }
        },

        Leaving: route => {
          if (!route.from.case) {
            update({
              routeStatus: caseOf("Arriving", route.to)
            });
          }
        }
      }));
    });
  }
};
