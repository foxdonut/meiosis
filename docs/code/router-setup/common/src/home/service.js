import { Route } from "router-setup-common/src/router";

export const Service = selectors => state => {
  if (selectors.page(state) !== Route.Home && state.message) {
    return { message: undefined };
  }
};
