export const brewer = {
  routing: {
    Arriving: ({ value, update }) => {
      update({
        brewer: "Brewer of beer " + value.id
      });
    }
  }
};
