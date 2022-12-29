# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-basic.html:Basic Setup
@nav-router-toc
@docs-nav-end

## Using the Router

```js
import { Page, router } from './router';

<a href={router.toUrl(Page.Login)}>Login</a>
```

```js
<a href={router.toUrl(Page.User, { id: user.id })}>User</a>
```

```js
cell.update({ route: router.toRoute(Page.Login)});

cell.update({ route: router.toRoute(Page.User, { id: user.id })});
```

@docs-nav-start
@nav-prev:router-basic.html:Basic Setup
@nav-router-toc
@docs-nav-end
