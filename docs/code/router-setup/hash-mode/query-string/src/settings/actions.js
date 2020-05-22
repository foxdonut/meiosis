import { router } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => router.getRoute("/?message=You have been logged out.")
    })
});
