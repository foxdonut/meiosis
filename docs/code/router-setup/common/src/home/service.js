import { Route } from "../router";

export const Service = selectors => state => {
  if (selectors.page(state) !== Route.Home && state.message) {
    return { message: undefined };
  }
};
