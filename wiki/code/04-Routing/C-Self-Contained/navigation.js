/* global UniversalRouter, generateUrls */

const pages = [];

// eslint-disable-next-line no-unused-vars
const addPage = (page, action) => {
  pages.push(Object.assign({ action }, page));
};

// eslint-disable-next-line no-unused-vars
const createRouter = () => {
  const router = new UniversalRouter(pages);

  const resolveRoute = () => {
    const route = document.location.hash.substring(1);
    router.resolve(route);
  };

  window.onpopstate = resolveRoute;

  const urlGenerator = generateUrls(router);

  const routeSync = model => {
    try {
      const route = urlGenerator(model.page.name, model.params || {});
      if (document.location.hash.substring(1) !== route) {
        window.history.pushState({}, "", "#" + route);
      }
    }
    catch (err) {
      // voluntarily ignore unmapped routes
    }
  };

  return { resolveRoute, routeSync };
};