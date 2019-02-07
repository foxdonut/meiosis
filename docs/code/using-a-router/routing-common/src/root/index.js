import { T, caseOf, fold, onChange } from "../util";

export const root = {
  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Request: route => {
          if (route.case !== state.routeCurrent.case) {
            update({
              routeStatus: caseOf("Change", {
                leave: state.routeCurrent,
                destination: route
              })
            });
          }
        },

        Change: change => {
          if (!change.leave.case) {
            update({
              routeStatus: caseOf("Arrive", change.destination)
            });
          }
        }
      }));
    });
  }
};
