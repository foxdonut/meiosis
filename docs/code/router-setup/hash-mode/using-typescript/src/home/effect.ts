import { EffectConstructor } from "../app/types";
import { Route } from "router-setup-common/src/router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page !== Route.Home && state.message) {
    update({ message: undefined });
  }
};
