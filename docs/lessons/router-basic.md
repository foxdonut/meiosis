# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end

## Basic Setup

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

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end
