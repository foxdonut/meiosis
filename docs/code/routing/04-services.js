/* global MeiosisRouting */

import { DEL } from "mergerino@0.2.0";

const {
  findRouteSegment,
  whenPresent
} = MeiosisRouting.state;

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

export const teaService = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Tea")) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  } else if (findRouteSegment(state.route.leave, "Tea")) {
    update({ teas: null });
  }
};

export const teaDetailService = ({ state, update }) => {
  whenPresent(
    findRouteSegment(state.route.arrive, "TeaDetails"),
    arrive => {
      const id = arrive.params.id;
      const description = teaMap[id].description;
      update({ tea: { [id]: description } });
    }
  );

  whenPresent(
    findRouteSegment(state.route.leave, "TeaDetails"),
    leave => {
      const id = leave.params.id;
      update({ tea: { [id]: DEL } });
    }
  );
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
      update({ beverage: { [id]: DEL } });
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
      update({ brewer: { [id]: DEL } });
    }
  );
};
