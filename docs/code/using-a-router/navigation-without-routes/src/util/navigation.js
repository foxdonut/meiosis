import { maybe, tagged } from "stags";

export const RoutePage = tagged("RoutePage")({
  Home: ["values"],
  Login: ["values"],
  Settings: ["values"],
  Coffee: ["values"],
  Beer: ["values"]
});

export const NavigateTo = maybe("NavigateTo");

export const getNavigation = ({ id, values }) =>
  ({ navigateTo: NavigateTo.Y(RoutePage[id]({ values })) });
