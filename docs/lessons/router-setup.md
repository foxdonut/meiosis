# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-history-mode.html:History Mode
@docs-nav-end

## Setup

In `router.js` we have:

```js
import { createRouter } from 'meiosis-router';

export const Page = {
  Home: 'Home',
  Login: 'Login',
  User: 'User',
  NotFound: 'NotFound'
};

export const routeConfig = {
  '/': Page.Home,
  '/login': Page.Login,
  '/user/:id': Page.User,
  '/*': Page.NotFound
};

export const router = createRouter({ routeConfig });
```

In `index.js` we have:

```js
import { meiosisSetup } from 'meiosis-setup';
import { router } from './router';

const app = {
  initial: {
    route: router.initialRoute
  }
};

const cells = meiosisSetup({ app });
const cell = cells();

router.start((route) => cell.update({ route: () => route }));

cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});
```

```js
router.start((route) => cell.update({ route: () => route }));
```

- The URL in the browser's location bar changes: by clicking on a link, typing in the location bar,
  etc.
- `meiosis-router` listens for these changes and calls the function passed to `start`
- the function updates the route in the application state by calling `cell.update(...)`.

```js
cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});
```

- When the application state changes, `meiosis-router` keeps the browser's location bar in sync with
  the application state route
- Thus, when you change the route programmatically by changing it in the application state with
  `cell.update(...)`, the browser's location bar will automatically change accordingly and
  correspond to the route.

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-history-mode.html:History Mode
@docs-nav-end
