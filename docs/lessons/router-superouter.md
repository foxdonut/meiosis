# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Using a Router - Superouter

[James Forbes](https://james-forbes.com/) created a router with sum types in mind called
[superouter](https://gitlab.com/harth/superouter).

```javascript
const createRouter = (Route, defaultRoute) => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const toPath = route => prefix + Route.toURL(route);

  const routeMatcher = path => Route.matchOr(() => defaultRoute, path);

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route);
    if (getPath() !== path) {
      window.history.pushState({}, "", path);
    }
  };

  return { initialRoute, start, locationBarSync, toPath };
};
```

```javascript
const createRouter = (Route, defaultRoute) => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const toPath = (route, queryParams = {}) =>
    prefix + Route.toURL(route) + getQueryString(queryParams);

  const routeMatcher = path => {
    const match = Route.matchOr(() => defaultRoute, getPathWithoutQuery(path));
    return Object.assign(match, {
      queryParams: queryString.parse(getQuery(path))
    });
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route, route.queryParams);
    if (getPath() !== path) {
      window.history.pushState({}, "", path);
    }
  };

  return { initialRoute, start, locationBarSync, toPath };
};
```

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
