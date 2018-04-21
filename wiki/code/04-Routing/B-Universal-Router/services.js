const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerList = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

const services =  {
  loadCoffees: () => new Promise(resolve =>
    setTimeout(() => resolve(coffees), 1)
  ),
  loadCoffee: params => new Promise(resolve =>
    setTimeout(() => resolve(coffeeMap[params.id]||""))
  ),
  loadBeer: () => new Promise(resolve =>
    setTimeout(() => resolve(beerList), 1)
  )
};
