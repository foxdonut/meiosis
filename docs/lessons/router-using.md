# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-history-mode.html:Setup / History Mode
@nav-router-toc
@nav-next:router-examples.html:Examples
@docs-nav-end

## Using the Router

Once we've created the router, we can use it to:

- generate URLs without having to mess with string concatenation
- generate route objects to re-route programmatically via the application state
- get the current route to render the corresponding page or perform any related tasks, such as
  loading data for the page
- get the route parameters, from both path parameters and query parameters

> In all of the following code, `router` refers to the router that we created with `createRouter` in
> either Hash Mode or History Mode (see previous sections).

### Generating URLs

To generate a URL, we use `router.toUrl` and pass the route identifier:

```js
import { Page, router } from './router';

<a href={router.toUrl(Page.Login)}>Login</a>
```

We can pass parameters as the second argument:

```js
<a href={router.toUrl(Page.User, { id: user.id })}>User</a>
```

Any parameters that we pass that are not path parameters of the route are automatically included as
query parameters in the generated URL.

```js
// say user.id is 42
<a href={router.toUrl(Page.User, { id: user.id, a: 1, b: 'two' })}>User</a>
// produces /user/42?a=1&b=two
```

> Warning: if you do not specify values for route path parameters, they will be `undefined` in the
> resulting URL.

### Generating Route Objects

We can update the route programmatically by updating the route in the application state, using
`router.toRoute` to generate the route object:

```js
cell.update({ route: router.toRoute(Page.Login)});

cell.update({ route: router.toRoute(Page.User, { id: user.id })});
```

In some cases, we may want to **replace** the route in the browser history instead of appending. For
example, we would do this when redirecting the user after they tried to access a page for which they
are not authorized. To accomplish this, we pass `true` as the third argument to `router.toRoute`:

```js
// No parameters, so pass {} as the second argument
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

See the next section for examples of applying these principles.

@docs-nav-start
@nav-prev:router-history-mode.html:Setup / History Mode
@nav-router-toc
@nav-next:router-examples.html:Examples
@docs-nav-end
