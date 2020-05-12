/* global MeiosisRouting */

import { Route } from "./07-routes";

const { routeTransition } = MeiosisRouting.state;

export const routeService = state => ({
  routeTransition: () =>
    routeTransition(state.route, state.nextRoute),
  route: state.nextRoute
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

export const teaService = state => {
  if (state.routeTransition.leave.Tea) {
    return { teas: null };
  }
};

export const TeaEffect = update => state => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  }
};

export const teaDetailService = state => {
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

  return patches;
};

export const beverageService = state => {
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

  return patches;
};

export const coffeeService = state => {
  if (state.routeTransition.arrive.Coffee) {
    return { pleaseWait: true };
  }
  if (state.routeTransition.leave.Coffee) {
    return { coffees: null };
  }
};

export const CoffeeEffect = update => state => {
  if (state.routeTransition.arrive.Coffee) {
    setTimeout(
      () =>
        update({
          pleaseWait: false,
          coffees
        }),
      1000
    );
  }
};

export const beerService = state => {
  if (state.routeTransition.arrive.Beer) {
    return { pleaseWait: true };
  }
  if (state.routeTransition.leave.Beer) {
    return { beers: null };
  }
};

export const BeerEffect = update => state => {
  if (state.routeTransition.arrive.Beer) {
    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  }
};

export const brewerService = state => {
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

  return patches;
};

export const loginService = state => {
  if (state.routeTransition.arrive.Login) {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      const route = [Route.Login()];
      return {
        route,
        nextRoute: route,
        routeTransition: {
          leave: () => ({}),
          arrive: () => ({})
        }
      };
    }
    return { login: null };
  }
};

export const settingsService = state => {
  if (
    state.routeTransition.arrive.Settings &&
    !state.user
  ) {
    const route = [
      Route.Login({
        message: "Please login.",
        returnTo: Route.Settings()
      })
    ];
    return {
      nextRoute: route,
      route,
      routeTransition: {
        arrive: () => ({ Login: Route.Login() }),
        leave: () => ({})
      }
    };
  }
};
