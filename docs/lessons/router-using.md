# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-history-mode.html:History Mode
@nav-router-toc
@nav-next:router-examples.html:Examples
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

> Warning: if you do not specify values for route parameters, they will be `undefined` in the
> resulting URL.

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

### Using Route State

```js
import { Page } from './router';
import { loadUserData } from './api';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === Page.User) {
      loadUserData().then(data => {
        cell.update({ userData: data });
      });
    } else {
      cell.update({ userData: undefined });
    }
  }
};
```

@docs-nav-start
@nav-prev:router-history-mode.html:History Mode
@nav-router-toc
@nav-next:router-examples.html:Examples
@docs-nav-end
