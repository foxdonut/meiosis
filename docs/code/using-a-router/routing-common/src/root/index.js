import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { coffee } from "../coffee";
import { beer } from "../beer";

import { caseOf, get, head, tail, onChange } from "../util";

const routings = {
  Login: login.routing,
  Settings: settings.routing,
  Tea: tea.routing,
  Coffee: coffee.routing,
  Beer: beer.routing
};

const validateLeave = ({ routings, routes, state, update }) => {
  const routing = get(routings, [get(head(routes), ["case"])]);
  const fn = get(routing, ["ValidateLeave"]);

  if (fn) {
    const result = fn({ state, update, value: head(routes).value });
    if (!result) {
      return false;
    }
  }
  if (routing) {
    return validateLeave({ routings: routing, routes: tail(routes), state, update });
  }
  return true;
};


const leaving = ({ routings, routes, state, update }) => {
  const routing = get(routings, [get(head(routes), ["case"])]);
  const fn = get(routing, ["Leaving"]);

  if (fn) {
    fn({ state, update, value: head(routes).value });
  }
  if (routing) {
    leaving({ routings: routing, routes: tail(routes), state, update });
  }
};

const validateArrive = ({ routings, routes, state, update }) => {
  const routing = get(routings, [get(head(routes), ["case"])]);
  const fn = get(routing, ["ValidateArrive"]);

  if (fn) {
    const result = fn({ state, update, value: head(routes).value });
    if (!result) {
      return false;
    }
  }
  if (routing) {
    return validateArrive({ routings: routing, routes: tail(routes), state, update });
  }
  return true;
};

const arriving = ({ routings, routes, state, update }) => {
  const routing = get(routings, [get(head(routes), ["case"])]);
  const fn = get(routing, ["Arriving"]);

  if (fn) {
    fn({ state, update, value: head(routes).value });
  }
  if (routing) {
    arriving({ routings: routing, routes: tail(routes), state, update });
  }
};

export const root = {
  actions: update => ({
    navigateTo: (id, value) => update({
      routeNext: [caseOf(id, value)]
    }),

    deepLink: (routes, id, value) => update({
      routeNext: routes.concat([caseOf(id, value)])
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeNext"], state => {
      const routes = state.routeNext;
      const transition = {
        from: state.routeCurrent,
        to: routes
      };

      const okLeave = validateLeave({ routings, routes: transition.from, state, update });
      if (okLeave) {
        leaving({ routings, routes: transition.from, state, update });

        const okArrive = validateArrive({ routings, routes, state, update });
        if (okArrive) {
          arriving({ routings, routes, state, update });
          update({ routeCurrent: routes });
        }
      }
    });
  }
};
