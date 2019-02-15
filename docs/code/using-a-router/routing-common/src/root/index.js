import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

import { caseOf, fold, get, head, tail, onChange } from "../util";

const routings = {
  Login: login.routing,
  Settings: settings.routing,
  Coffee: coffee.routing,
  Beer: beer.routing
};

const validateLeave = () => true;

const leaving = routing => ({ transition, state, update }) => {
  const fn = get(routing, ["Leaving"]);

  if (fn) {
    fn({ transition, state, update });
  }
  else {
    update({
      routeStatus: caseOf("Arriving", transition.to)
    });
  }
};

const validateArrive = () => null;

const arriving = ({ routings, routes, state, update }) => {
  const routing = get(routings, [get(head(routes), ["case"])]);
  const fn = get(routing, ["Arriving"]);

  if (fn) {
    fn({ routes, state, update });
  }
  if (routing) {
    arriving({ routings: routing, routes: tail(routes), state, update });
  }

  update({
    routeCurrent: routes,
    routeStatus: caseOf("None")
  });
};

export const root = {
  actions: update => ({
    navigateTo: (id, value) => update({
      routeStatus: caseOf("Request", [caseOf(id, value)])
    }),

    deepLink: (routes, id, value) => update({
      routeStatus: caseOf("Request",
        routes.concat([caseOf(id, value)]))
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      fold(state.routeStatus, {
        Request: routes => {
          update({
            routeStatus: caseOf("ValidateLeave", {
              from: state.routeCurrent,
              to: routes
            })
          });
        },

        ValidateLeave: transition => {
          if (validateLeave({ state, transition })) {
            update({ routeStatus: caseOf("Leaving", transition) });
          }
        },

        Leaving: transition => {
          const routing = get(routings, [get(transition.from[0], ["case"])]);
          leaving(routing);
          update({ routeStatus: caseOf("ValidateArrive", transition.to) });
        },

        ValidateArrive: routes => {
          const result = validateArrive(routes);
          if (result) {
            update(result);
          }
          else {
            update({ routeStatus: caseOf("Arriving", routes) });
          }
        },

        Arriving: routes => {
          arriving({ routings, routes, state, update });
          update({
            routeCurrent: routes,
            routeStatus: caseOf("None")
          });
        }
      });
    });
  }
};
