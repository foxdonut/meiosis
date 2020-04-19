# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Using a Router - Basic Pattern Setup

```javascript
const createRouter = routeConfig => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const routeMatcher = createRouteMatcher(routeConfig);

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, routeMatcher, start, locationBarSync };
};
```

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
