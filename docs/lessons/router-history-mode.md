# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-setup.html:Setup
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end

## History Mode

```js
import { createRouter } from 'meiosis-router';

export const Page = {
  // ...
};

export const routeConfig = {
  // ...
};

export const router = createRouter({ routeConfig, rootPath: '/apps/myapp' });
```

```js
export const router = createRouter({ routeConfig, rootPath: '' });
```

@docs-nav-start
@nav-prev:router-setup.html:Setup
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end
