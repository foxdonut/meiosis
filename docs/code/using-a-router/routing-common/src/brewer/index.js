import { fold } from "static-tagged-union";

export const brewer = {
  service: (state, update) => {
    if (state.arriving) {
      state.routeCurrent.forEach(fold({
        Brewer: ({ id }) => {
          update({
            arriving: false,
            brewer: `Brewer of beverage ${id}`
          });
        }
      }));
    }
  }
};
