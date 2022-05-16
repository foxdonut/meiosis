# `meiosis-setup` Documentation

| | | |
| ---- | ---- | ---- |
| [View Library &rarrhk;](setup-view-library.html) | [&larrhk; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [Table of Contents &#8673;](setup-toc.html) |

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

| | | |
| ---- | ---- | ---- |
| [View Library &rarrhk;](setup-view-library.html) | [&larrhk; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [Table of Contents &#8673;](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.