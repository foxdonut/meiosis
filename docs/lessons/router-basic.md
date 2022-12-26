# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@docs-nav-end

## Basic Setup

```js
import { createRouter } from 'meiosis-router';

export const Page = {
  Home: 'Home',
  Login: 'Login',
  Settings: 'Settings',
  Tea: 'Tea',
  TeaDetails: 'TeaDetails',
  TeaSearch: 'TeaSearch',
  NotFound: 'NotFound'
};

export const routeConfig = {
  '/': Page.Home,
  '/login': Page.Login,
  '/settings': Page.Settings,
  '/tea/search': Page.TeaSearch,
  '/tea': Page.Tea,
  '/tea/:id': Page.TeaDetails,
  '/*': Page.NotFound
};

export const router = createRouter({ routeConfig });
```

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@docs-nav-end
