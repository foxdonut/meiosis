/* global MeiosisRouting */
const {
  findRouteSegment,
  findRouteSegmentWithParams,
  routeTransition,
  whenPresent
} = MeiosisRouting.state;

import { Route } from "./08-routes";

export const loginService = ({ state, patch }) => {
  const currentLogin = findRouteSegment(
    patch.route,
    "Login"
  );
  const previousLogin = findRouteSegment(
    state.route,
    "Login"
  );

  if (
    !currentLogin &&
    patch.route &&
    previousLogin &&
    !state.user &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return {
      mergePatch: false
    };
  }

  if (currentLogin) {
    return {
      state: {
        login: {
          username: "",
          password: ""
        }
      }
    };
  } else if (previousLogin && patch.route) {
    return { state: { login: null } };
  }
};

export const settingsService = ({ state, patch }) => {
  if (
    findRouteSegment(patch.route, "Settings") &&
    !state.user
  ) {
    return {
      render: false,
      next: arr =>
        arr.concat(({ update }) => {
          update({
            route: [
              Route.Login({
                message: "Please login.",
                returnTo: Route.Settings()
              })
            ]
          });
        })
    };
  }
};

export const routeService = state => ({
  route: routeTransition(state.route)
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

export const teaService = ({ state, patch }) => {
  // FIXME: loads even when already on page
  if (findRouteSegment(patch.route, "Tea")) {
    return {
      next: arr =>
        arr.concat(({ update }) =>
          setTimeout(() => {
            update({ teas });
          }, 500)
        )
    };
  } else if (
    // FIXME
    findRouteSegment(state.route, "Tea") &&
    patch.route &&
    !findRouteSegment(patch.route, "Tea")
  ) {
    return { state: { teas: null } };
  }
};

const teaDetailArrive = ({ patch }) => {
  return whenPresent(
    findRouteSegment(patch.route, "TeaDetails"),
    arrive => {
      const id = arrive.params.id;
      const description = teaMap[id].description;
      return {
        state: { tea: { [id]: description } }
      };
    }
  );
};

const teaDetailLeave = ({ state, patch }) => {
  return whenPresent(
    findRouteSegment(state.route, "TeaDetails"),
    leave => {
      // FIXME: changing params
      if (
        patch.route &&
        !findRouteSegmentWithParams(
          patch.route,
          Route.TeaDetails({ id: leave.params.id })
        )
      ) {
        const id = leave.params.id;
        return {
          state: { tea: { [id]: undefined } }
        };
      }
    }
  );
};

export const teaDetailService = context => {
  return [
    teaDetailArrive(context),
    teaDetailLeave(context)
  ];
};

export const beverageService = ({ state, update }) => {
  whenPresent(
    findRouteSegment(state.route.arrive, "Beverage"),
    arrive => {
      const id = arrive.params.id;
      const description = beverageMap[id].description;
      update({ beverage: { [id]: description } });
    }
  );

  whenPresent(
    findRouteSegment(state.route.leave, "Beverage"),
    leave => {
      const id = leave.params.id;
      update({ beverage: { [id]: undefined } });
    }
  );
};

export const coffeeService = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Coffee")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          coffees
        }),
      1000
    );
  } else if (
    findRouteSegment(state.route.leave, "Coffee")
  ) {
    update({ coffees: null });
  }
};

export const beerService = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Beer")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  } else if (findRouteSegment(state.route.leave, "Beer")) {
    update({ beers: null });
  }
};

export const brewerService = ({ state, update }) => {
  whenPresent(
    findRouteSegment(state.route.arrive, "Brewer"),
    arrive => {
      const id = arrive.params.id;
      update({
        brewer: { [id]: `Brewer of ${id}` }
      });
    }
  );

  whenPresent(
    findRouteSegment(state.route.leave, "Brewer"),
    leave => {
      const id = leave.params.id;
      update({ brewer: { [id]: undefined } });
    }
  );
};
