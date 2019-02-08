import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

import { T, caseOf, fold, get, onChange } from "../util";

export const root = {
  service: (states, update) => {
    const routing = {
      Login: login.routing,
      Settings: settings.routing,
      Coffee: coffee.routing,
      CoffeeDetails: coffee.routing,
      Beer: beer.routing,
      BeerDetails: beer.routing,
      BeerBrewer: beer.routing
    };

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
          const fn = get(routing, [route.from.case, "Leaving"]);

          if (fn) {
            fn({ route, state, update });
          }
          else {
            update({
              routeStatus: caseOf("Arriving", route.to)
            });
          }
        },

        Arriving: route => {
          const fn = get(routing, [route.case, "Arriving"]);

          if (fn) {
            fn({ route, state, update });
          }
          else {
            update({
              routeCurrent: route,
              routeStatus: caseOf("None")
            });
          }
        }
      }));
    });
  }
};
