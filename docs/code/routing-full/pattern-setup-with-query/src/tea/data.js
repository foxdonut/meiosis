export const teas = [
  { id: "t1", title: "Tea 1", type: "Green", description: "Ginger Matcha" },
  { id: "t1", title: "Tea 1", type: "Herbal", description: "Guru Chai" },
  { id: "t1", title: "Tea 1", type: "Black", description: "Darjeeling" },
  { id: "t1", title: "Tea 1", type: "Black", description: "English Breakfast" },
  { id: "t2", title: "Tea 2", type: "Oolong", description: "Formosa" }
];

export const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});
