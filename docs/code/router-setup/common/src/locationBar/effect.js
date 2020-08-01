export const Effect = (router, selectors) => state => {
  router.syncLocationBar(selectors.route(state));
};
