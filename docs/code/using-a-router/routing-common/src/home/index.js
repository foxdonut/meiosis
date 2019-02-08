import { T, caseOf, fold, onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Leaving: route => T(route.from, fold({
          Home: () => {
            update({
              routeStatus: caseOf("Arriving", route.to)
            });
          }
        })),

        Arriving: route => T(route, fold({
          Home: () => {
            update({
              routeCurrent: route,
              routeStatus: caseOf("None")
            });
          }
        }))
      }));
    });
  }
};
