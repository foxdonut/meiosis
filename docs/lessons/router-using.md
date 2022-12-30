# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-history-mode.html:History Mode
@nav-router-toc
@nav-next:router-state.html:Using Route State
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

If there are extra parameters beyond route parameters, they are added as query parameters:

```js
// say user.id is 42
cell.update({ route: router.toRoute(Page.User, { id: user.id, a: 1, b: 'two' })});
// produces /user/42?a=1&b=two
```

> Warning:

```js
cell.update({ route: router.toRoute(Page.Login), {}, true});
```

```js
const componentMap = {
  Home: ...,
  Login: ...,
  ...
};

const Component = componentMap[cell.state.route.value];

<Component cell={cell} />
```

@docs-nav-start
@nav-prev:router-history-mode.html:History Mode
@nav-router-toc
@nav-next:router-state.html:Using Route State
@docs-nav-end
