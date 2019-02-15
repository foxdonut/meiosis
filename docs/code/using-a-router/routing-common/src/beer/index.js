import { beerDetails, beers } from "../beerDetails";

export const beer = {
  routing: {
    Arriving: ({ state, update }) => {
      const needToLoadBeers = !state.beers || state.beers.length === 0;

      update({
        pleaseWait: needToLoadBeers,
        beers: state.beers || []
      });

      if (needToLoadBeers) {
        setTimeout(() => update({
          pleaseWait: false,
          beers,
        }), 1000);
      }
    },

    BeerDetails: beerDetails.routing
  }
};
