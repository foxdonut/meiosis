# meiosis-router

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here is a module that sets up a router for use with Meiosis.

## Principles

- Store the route in the application state
- Use the route in the state to determine which page to render, what data to load, etc.
- Clicking on a link, changing the URL in the location bar, etc. changes the route in the state
- Changing the route in the state programmatically synchronizes the URL in the location bar

## Installation

Using `npm`:

```
npm i meiosis-router
```

Then you can import it and use it with this code:

```js
import { createRouter } from 'meiosis-router';

const router = createRouter({ ... });
```

Using a `script` tag:

```html
<script src="https://unpkg.com/meiosis-router/meiosis-router.js"></script>
```

Or load the minimized version:

```html
<script src="https://unpkg.com/meiosis-router/meiosis-router.min.js"></script>
```

Then use the `MeiosisRouter` global variable:

```js
const router = MeiosisRouter.createRouter({ ... });
```

## Documentation

Please refer to the [`meiosis-router` Documentation](https://meiosis.js.org/docs/router-toc.html).

----

_meiosis-router is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
