import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

import { caseOf, fold, get, onChange } from "../util";

const routing = {
  Login: login.routing,
  Settings: settings.routing,
  Coffee: coffee.routing,
  Beer: beer.routing
};

export const root = {
  actions: update => ({
    navigateTo: (id, value) => update({
      routeStatus: caseOf("Request", [caseOf(id, value)])
    }),

    deepLink: (state, id, value) => update({
      routeStatus: caseOf("Request",
        state.routeCurrent.concat([caseOf(id, value)]))
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      fold(state.routeStatus, {
        Request: routes => {
          update({
            routeStatus: caseOf("Leaving", {
              from: state.routeCurrent,
              to: routes
            })
          });
        },

        Leaving: transition => {
          const fn = get(routing, [get(transition.from[0], ["case"]), "Leaving"]);

          if (fn) {
            fn({ transition, state, update });
          }
          else {
            update({
              routeStatus: caseOf("Arriving", transition.to)
            });
          }
        },

        Arriving: routes => {
          const fn = get(routing, [routes[0].case, "Arriving"]);

          if (fn) {
            fn({ routes, state, update });
          }
          else {
            update({
              routeCurrent: routes,
              routeStatus: caseOf("None")
            });
          }
        }
      });
    });
  }
};
