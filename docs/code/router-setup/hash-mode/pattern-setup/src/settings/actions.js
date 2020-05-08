import { router } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => router.routeMatcher("/"),
      message: "You have been logged out."
    })
});
