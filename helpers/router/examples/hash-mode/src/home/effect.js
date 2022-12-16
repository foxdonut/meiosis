import { Route } from '../router';

export const Effect = (update) => (state) => {
  if (state.route.page !== Route.Home && state.message) {
    update({ message: undefined });
  }
};
