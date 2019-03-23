import { fold } from "static-tagged-union";

export const brewer = {
  service: (state, update) => (state.arriving) && (() => {
    state.route.forEach(fold({
      Brewer: ({ id }) => {
        update({
          arriving: false,
          brewer: `Brewer of beverage ${id}`
        });
      }
    }));
  })
};
