const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffeeDetails = {
  coffees,

  routing: {
    Arriving: ({ routes, update }) => {
      const id = routes[0].value.id;
      const coffee = coffeeMap[id].description;

      update({ coffee });
    }
  }
};
