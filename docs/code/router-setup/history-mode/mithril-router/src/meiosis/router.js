/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import m from "mithril";

export const createMithrilRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const prefix = stripTrailingSlash(window.location.pathname);
  m.route.prefix = prefix;

  const getUrl = () => decodeURI(window.location.pathname + window.location.search);

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  const toUrl = (page, params = {}, queryParams = {}) => {
    const path = prefix + stripTrailingSlash(pathLookup[page]);
    const pathParams = [];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce((result, pathParam) => {
        pathParams.push(pathParam.substring(1));
        return result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)]));
      }, path) + getQueryString(queryParams)
    );
  };

  const separateParamsAndQueryParams = (path, allParams) => {
    const pathParams = (path.match(/(:[^/]*)/g) || []).map(key => key.substring(1));

    return Object.entries(allParams).reduce(
      (result, [key, value]) => {
        const slot = pathParams.indexOf(key) >= 0 ? "params" : "queryParams";
        result[slot][key] = value;
        return result;
      },
      { params: {}, queryParams: {} }
    );
  };

  const createMithrilRoutes = ({ onRouteChange, render }) => {
    const prefixLength = prefix.length;

    const linkHandler = evt => {
      let element = evt.target;
      while (element && element.nodeName.toLowerCase() !== "a") {
        element = element.parentNode;
      }
      if (
        element &&
        element.nodeName.toLowerCase() === "a" &&
        element.href.startsWith(origin) &&
        element.href.indexOf(prefix) >= 0
      ) {
        evt.preventDefault();
        const href = element.href;
        m.route.set(href.substring(href.indexOf(prefix) + prefixLength));
      }
    };

    window.addEventListener("click", linkHandler, false);

    window.addEventListener("beforeunload", () => {
      window.removeEventListener("click", linkHandler);
    });

    return Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: params =>
          onRouteChange(Object.assign({ page }, separateParamsAndQueryParams(path, params))),
        render
      };
      return result;
    }, {});
  };

  const syncLocationBar = route => {
    const { page, params } = route;
    if (page) {
      const url = toUrl(page, params);
      if (url !== getUrl()) {
        const fn = route.replace ? "replaceState" : "pushState";
        window.history[fn].call(window.history, {}, "", url);
      }
    }
  };

  return { createMithrilRoutes, toUrl, syncLocationBar };
};
