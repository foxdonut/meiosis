const createGetPath = (prefix, historyMode) =>
  historyMode
    ? () =>
        decodeURI(window.location.pathname + window.location.search).substring(prefix.length) || "/"
    : () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

const getPathLookup = routeConfig =>
  Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

const createToPath = (prefix, pathLookup, getQueryString) => (id, params = {}) => {
  const path = prefix + pathLookup[id];

  return (
    [...path.matchAll(/(:[^/]*)/g)]
      .map(a => a[1])
      .reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
  );
};

const createGetRoute = (prefix, toPath) => (page, params = {}) => ({
  page,
  params,
  url: toPath(page, params).substring(prefix.length)
});

const emptyQueryString = {
  parse: () => {},
  stringify: () => ""
};

export const createFeatherRouter = ({
  createRouteMatcher,
  routeConfig,
  queryString = emptyQueryString,
  historyMode = false
}) => {
  const prefix = historyMode ? window.location.pathname : "#";
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = getPathLookup(routeConfig);
  const getPath = createGetPath(prefix, historyMode);
  const toPath = createToPath(prefix, pathLookup, getQueryString);
  const getRoute = createGetRoute(prefix, toPath);
  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    return Object.assign(match, { params });
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url + getQueryString(route.params.queryParams);

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const getHref = (page, params = {}) => {
    const url = toPath(page, params);

    return {
      href: url,
      onclick: evt => {
        evt.preventDefault();
        window.history.pushState({}, "", url);
        window.onpopstate();
      }
    };
  };

  return { initialRoute, getRoute, getHref, toPath, start, locationBarSync };
};

export const createMithrilRouter = ({ m, routeConfig, prefix = "#" }) => {
  m.route.prefix = prefix;

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = getPathLookup(routeConfig);
  const getPath = createGetPath(prefix, false);
  const toPath = createToPath(prefix, pathLookup, getQueryString);
  const getRoute = createGetRoute(prefix, toPath);

  const createMithrilRoutes = ({ App, navigateTo, states, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, url) => navigateTo({ page, params, url }),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return {
    createMithrilRoutes,
    locationBarSync,
    getRoute,
    toPath
  };
};
