
### Passing functions as parameters

But wait! Notice the accumulator function we are passing as a parameter to `scan`:

```js
m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);
```

We have a function that takes `(state, patch)` as calls `P` with `(state, patch)`. The `P`
function already does what we want, so we can pass it directly to `scan`:

```js
m.stream.scan(P, app.initialState, update);
```

Whenever you are passing a function that looks like:

```js
callSomething(
  function(params) {
    return someFunction(params);
  }
);
```

You are creating a function that takes some parameters and calls a function with the same
parameters. There is no need to create that outer function - instead, you can just pass
`someFunction` directly:

```js
callSomething(someFunction);
```

Passing functions as parameters is very useful!
