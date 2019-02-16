export const brewer = {
  routing: {
    Arriving: ({ value, update }) => {
      update({
        brewer: `Brewer of beverage ${value.id}`
      });
    }
  }
};
