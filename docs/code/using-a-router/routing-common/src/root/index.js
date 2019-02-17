import equal from "deep-equal";

import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { coffee } from "../coffee";
import { beer } from "../beer";

import { caseOf, get, head, init, tail, onChange } from "../util";

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

const leaving = ({ routings, transition, state, update }) => {
  const from = head(transition.from);
  const to = head(transition.to);
  const routing = get(routings, [get(from, ["case"])]);
  const fn = get(routing, ["Leaving"]);

  if (fn && (!equal(from, to))) {
    fn({ state, update, value: from.value });
  }
  if (routing) {
    leaving({
      routings: routing,
      transition: {
        from: tail(transition.from),
        to: tail(transition.to)
      },
      state,
      update
    });
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

const arriving = ({ routings, transition, state, update }) => {
  const from = head(transition.from);
  const to = head(transition.to);
  const routing = get(routings, [get(to, ["case"])]);
  const fn = get(routing, ["Arriving"]);

  if (fn && (!equal(from, to))) {
    fn({ state, update, value: to.value });
  }
  if (routing) {
    arriving({
      routings: routing,
      transition: {
        from: tail(transition.from),
        to: tail(transition.to)
      },
      state,
      update
    });
  }
};

export const root = {
  actions: update => ({
    navigateTo: ids => update({
      routeNext: ids.map(id => caseOf(id))
    }),

    navigateToChild: (routes, id, value) => update({
      routeNext: routes.concat([caseOf(id, value)])
    }),

    navigateToParent: routes => update({
      routeNext: init(routes)
    }),

    navigateToSibling: (routes, id, value) => update({
      routeNext: init(routes).concat([caseOf(id, value)])
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
        leaving({ routings, transition, state, update });

        const okArrive = validateArrive({ routings, routes, state, update });
        if (okArrive) {
          arriving({ routings, transition, state, update });
          update({ routeCurrent: routes });
        }
      }
    });
  }
};
