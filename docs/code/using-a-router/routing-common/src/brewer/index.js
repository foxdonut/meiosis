import { head } from "../util";

export const brewer = {
  routing: {
    Arriving: ({ routes, update }) => {
      const id = head(routes).value.id;
      update({
        brewer: "Brewer of beer " + id
      });
    }
  }
};
