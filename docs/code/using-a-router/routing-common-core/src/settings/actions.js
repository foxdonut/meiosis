import { Route, navigateTo } from "../routes";

export const actions = update => ({
  logout: () =>
    update(
      Object.assign(
        {
          user: null
        },
        navigateTo([Route.Home()])
      )
    )
});
