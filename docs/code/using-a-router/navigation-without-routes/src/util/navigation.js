import { maybe, tagged } from "stags";

export const RoutePage = tagged("RoutePage")({
  Home: ["values"],
  Login: ["values"],
  Settings: ["values"],
  Coffee: ["values"],
  Beer: ["values"]
});

export const Navigation = maybe("Navigation");

export const getNavigation = ({ id, values }) =>
  ({ navigateTo: Navigation.Y(RoutePage[id]({ values })) });
