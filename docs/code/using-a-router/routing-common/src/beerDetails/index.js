import { brewer } from "../brewer";

export const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const beerDetails = {
  routing: {
    Arriving: ({ value, update }) => {
      update({
        beer: beerMap[value.id].description
      });
    },

    Brewer: brewer.routing
  }
};
