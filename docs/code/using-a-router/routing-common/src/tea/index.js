import { teaDetails, teas } from "../teaDetails";

export const tea = {
  routing: {
    Arriving: ({ update }) => {
      setTimeout(() => {
        update({ teas });
      }, 500);
    },

    TeaDetails: teaDetails.routing
  }
};
