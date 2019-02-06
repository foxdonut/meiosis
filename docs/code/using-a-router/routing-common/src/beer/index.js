import { onChange } from "../util";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerService = (state, update) => {
  const needToLoadBeers = !state.beers || state.beers.length === 0;

  update({
    routeNext: state.routeRequest,
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

const beerDetailsService = (state, update) => {
  const id = state.routeRequest.values.id;
  update({ beer: beerMap[id].description });
};

const beerBrewerService = (state, update) => {
  const id = state.routeRequest.values.id;
  update({ brewer: "Brewer of beer " + id });
};

const beerServices = {
  Beer: [ beerService ],
  BeerDetails : [ beerService, beerDetailsService ],
  BeerBrewer : [ beerService, beerDetailsService, beerBrewerService ]
};

export const beer = {
  service: (states, update) => {
    onChange(states, ["routeRequest"], state => {
      const services = beerServices[state.routeRequest.id] || [];
      services.forEach(service => service(state, update));
    });
  }
};
