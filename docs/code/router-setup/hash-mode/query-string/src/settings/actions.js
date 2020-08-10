export const Actions = (update, router) => ({
  logout: () =>
    update({
      user: null,
      route: () => router.toRoute("/"),
      message: "You have been logged out."
    })
});
