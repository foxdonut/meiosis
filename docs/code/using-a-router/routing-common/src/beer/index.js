import { caseOf } from "../util";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerRouting = ({ route, state, update }) => {
  const needToLoadBeers = !state.beers || state.beers.length === 0;

  update({
    routeCurrent: route,
    routeStatus: caseOf("None"),
    pleaseWait: needToLoadBeers,
    beers: state.beers || []
  });

  if (needToLoadBeers) {
    setTimeout(() => update({
      pleaseWait: false,
      beers,
    }), 1000);
  }
};

const beerDetailsRouting = ({ route, update }) => {
  const id = route.value.id;
  update({
    routeCurrent: route,
    routeStatus: caseOf("None"),
    beer: beerMap[id].description
  });
};

const beerBrewerRouting = ({ route, update }) => {
  const id = route.value.id;
  update({
    routeCurrent: route,
    routeStatus: caseOf("None"),
    brewer: "Brewer of beer " + id
  });
};

const beerRoutings = {
  Beer: [ beerRouting ],
  BeerDetails : [ beerRouting, beerDetailsRouting ],
  BeerBrewer : [ beerRouting, beerDetailsRouting, beerBrewerRouting ]
};

export const beer = {
  routing: {
    Arriving: ({ route, state, update }) => {
      const routings = beerRoutings[route.case] || [];
      routings.forEach(routing => routing({ route, state, update }));
    }
  }
};
