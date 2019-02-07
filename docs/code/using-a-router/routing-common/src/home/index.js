import { T, caseOf, fold, onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Change: change => T(change.leave, fold({
          Home: () => {
            update({
              routeStatus: caseOf("Arrive", change.destination)
            });
          }
        })),

        Arrive: route => T(route, fold({
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
