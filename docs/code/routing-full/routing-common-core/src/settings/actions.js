import { Route, navigateTo } from "../routes";

export const Actions = ({ update, combine }) => ({
  logout: () => update(combine([{ user: null }, navigateTo([Route.Home()])]))
});
