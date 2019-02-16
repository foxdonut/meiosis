export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  routing: {
    Arriving: ({ value, update }) => {
      const tea = teaMap[value.id].description;

      update({ tea });
    }
  }
};
