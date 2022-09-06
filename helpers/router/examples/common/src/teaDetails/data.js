export const teas = [
  {
    id: "t1",
    title: "Tea 1",
    description: "Description of Tea 1"
  },
  {
    id: "t2",
    title: "Tea 2",
    description: "Description of Tea 2"
  }
];

export const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});
