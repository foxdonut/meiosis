# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-function-patches-or-mergerino.html:Function Patches or Mergerino
@nav-setup-toc
@nav-next:setup-view-library.html:View Library
@docs-nav-end

## Initial State

When calling `meiosisSetup`, you can specify an `app`, with the following properties, all of which
are optional:

- `initial`
- `services`
- `nested`

We will look at each of these separately, starting with `initial`.

By default, the initial state is an empty object, `{}`. To specify a different initial state, use
the `initial` property of `app`:

```js
const app = {
  initial: ...
};

const cells = meiosisSetup({ app });
```

Initial state can also be nested using [nested components](setup-nested-components.html).

@docs-nav-start
@nav-prev:setup-function-patches-or-mergerino.html:Function Patches or Mergerino
@nav-setup-toc
@nav-next:setup-view-library.html:View Library
@docs-nav-end

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
