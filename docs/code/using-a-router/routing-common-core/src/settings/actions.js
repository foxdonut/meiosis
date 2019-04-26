import { Route, navigateTo } from "../routes";

export const Actions = update => ({
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
