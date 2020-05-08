import { Route } from "../router";

export const service = state => {
  if (state.route.page !== Route.Home && state.message) {
    return { message: undefined };
  }
};
