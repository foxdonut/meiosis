export const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffeeDetails = {
  routing: {
    Arriving: ({ value, update }) => {
      const coffee = coffeeMap[value.id].description;

      update({ coffee });
    }
  }
};
