# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-setup.html:Setup / Hash Mode
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end

## History Mode

To set up `meiosis-router` in History Mode, we can follow the same process as for Hash Mode (see previous section), except that we specify a `rootPath` when calling `createRouter`:

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

If our application runs from the start of the path, we still need to specify `rootPath` to create
the router in History Mode. In that case, we simply specify a blank string:

```js
export const router = createRouter({ routeConfig, rootPath: '' });
```

By using History Mode, the URLs of our application will look like regular URLs, instead of having
`#!` in them.

To use this mode, server-side support must be provided for the different routes of the application.
Otherwise, reloading the page after changing routes will fail. The server can simply return the root
page of the application for every route. There is a bare-bones example of this in the History Mode
example, later in this documentation.

@docs-nav-start
@nav-prev:router-setup.html:Setup / Hash Mode
@nav-router-toc
@nav-next:router-using.html:Using the Router
@docs-nav-end
