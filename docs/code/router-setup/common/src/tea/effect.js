import { Route } from "../router";
import { teas } from "../teaDetails/data";

export const Effect = update => state => {
  if (state.route.page === Route.Tea || state.route.page === Route.TeaDetails) {
    setTimeout(() => {
      update({ teas });
    }, 1000);
  }
};
