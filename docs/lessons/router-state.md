# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-using.html:Using the Router
@nav-router-toc
@docs-nav-end

## Using Route State

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
@nav-prev:router-using.html:Using the Router
@nav-router-toc
@docs-nav-end
