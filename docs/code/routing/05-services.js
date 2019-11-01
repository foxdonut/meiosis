/* global MeiosisRouting */

import { Route, navTo } from "./05-routes";

const { routeTransition } = MeiosisRouting.state;

export const routeService = ({ previousState, state }) => ({
  state: {
    routeTransition: () =>
      routeTransition(previousState.route, state.route)
  }
});

const teas = [
  {
    id: "t1",
    title: "Tea 1",
    description: "Desc. of Tea 1"
  },
  {
    id: "t2",
    title: "Tea 2",
    description: "Desc. of Tea 2"
  }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beverages = [
  {
    id: "c1",
    title: "Coffee 1",
    description: "Desc. of Coffee 1"
  },
  {
    id: "c2",
    title: "Coffee 2",
    description: "Desc. of Coffee 2"
  },
  {
    id: "b1",
    title: "Beer 1",
    description: "Desc. of Beer 1"
  },
  {
    id: "b2",
    title: "Beer 2",
    description: "Desc. of Beer 2"
  }
];

const coffees = beverages.slice(0, 2);
const beers = beverages.slice(2, 4);

const beverageMap = beverages.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaService = ({ state }) => {
  if (state.routeTransition.arrive.Tea) {
    return {
      next: ({ update }) =>
        setTimeout(() => {
          update({ teas });
        }, 500)
    };
  }
  if (state.routeTransition.leave.Tea) {
    return { state: { teas: null } };
  }
};

export const teaDetailService = ({ state }) => {
  const patches = [];

  if (state.routeTransition.arrive.TeaDetails) {
    const id =
      state.routeTransition.arrive.TeaDetails.params.id;
    const description = teaMap[id].description;
    patches.push({ tea: { [id]: description } });
  }

  if (state.routeTransition.leave.TeaDetails) {
    const id =
      state.routeTransition.leave.TeaDetails.params.id;
    patches.push({ tea: { [id]: undefined } });
  }

  return { state: patches };
};

export const beverageService = ({ state }) => {
  const patches = [];

  if (state.routeTransition.arrive.Beverage) {
    const id =
      state.routeTransition.arrive.Beverage.params.id;
    const description = beverageMap[id].description;
    patches.push({ beverage: { [id]: description } });
  }

  if (state.routeTransition.leave.Beverage) {
    const id =
      state.routeTransition.leave.Beverage.params.id;
    patches.push({ beverage: { [id]: undefined } });
  }

  return { state: patches };
};

export const coffeeService = ({ state }) => {
  if (state.routeTransition.arrive.Coffee) {
    return {
      state: { pleaseWait: true },
      next: ({ update }) =>
        setTimeout(
          () =>
            update({
              pleaseWait: false,
              coffees
            }),
          1000
        )
    };
  }
  if (state.routeTransition.leave.Coffee) {
    return { state: { coffees: null } };
  }
};

export const beerService = ({ state }) => {
  if (state.routeTransition.arrive.Beer) {
    return {
      state: { pleaseWait: true },
      next: ({ update }) =>
        setTimeout(
          () =>
            update({
              pleaseWait: false,
              beers
            }),
          1000
        )
    };
  }
  if (state.routeTransition.leave.Beer) {
    return { state: { beers: null } };
  }
};

export const brewerService = ({ state }) => {
  const patches = [];

  if (state.routeTransition.arrive.Brewer) {
    const id =
      state.routeTransition.arrive.Brewer.params.id;
    patches.push({
      brewer: { [id]: `Brewer of beverage ${id}` }
    });
  }

  if (state.routeTransition.leave.Brewer) {
    const id = state.routeTransition.leave.Brewer.params.id;
    patches.push({ brewer: { [id]: undefined } });
  }

  return { state: patches };
};

export const loginService = ({ state }) => {
  if (state.routeTransition.arrive.Login) {
    return {
      state: {
        login: {
          username: "",
          password: ""
        }
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      return { patch: false };
    }
    return { state: { login: null } };
  }
};

export const settingsService = ({ state }) => {
  if (
    state.routeTransition.arrive.Settings &&
    !state.user
  ) {
    return {
      patch: navTo(
        Route.Login({
          message: "Please login.",
          returnTo: Route.Settings()
        })
      )
    };
  }
};
