# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-prev:05-meiosis-with-mergerino.html:Meiosis with Mergerino
@nav-toc
@nav-next:07-views.html:Views
@docs-nav-end

## Cells

In the previous sections, we set up the Meiosis pattern with function patches, and with
[Mergerino](https://github.com/fuzetsu/mergerino). In both cases, we created:

- `states`: a stream of application states
- `update`: a stream of updates to the application state

We now have a way to manage application state. The next part of the pattern will be to wire up the
application state to a view library. We will be looking at that in the next section. Before doing
that, however, let's discuss a small but useful detail.

As it is now, we would need to pass `states` -- or rather, `states()`, that is, the current state --
and `update` to our views. Views would have to pass them along to other views.

To make things simpler, let's pass a single parameter to our views. I call this a **cell**.

> I chose the name **cell** because in science, Meiosis has to do with cells.

Passing a single `cell` parameter to our views makes it simpler later on to refactor if we want to
pass additional properties besides the current state and the update stream. We can add the
properties to the cell, and we won't have to change the parameters in all of our views.

We can also pass `cell` to actions, making it easy for actions to access the current state and issue
updates.

Creating a stream of cells from the stream of states is simple. We can use `map`:

```js
const update = flyd.stream();
const states = scan(...);
const getState = () => states();
const createCell = (state) => ({ state, getState, update });
const cells = states.map(createCell);
```

We now have a stream of cells. To get the current cell, we can call `cells()` and pass that as a
`cell` to views. Views can then access the state with `cell.state` and issue updates by calling
`cell.update(...)`. Finally, we can also pass `cell` to actions which in turn can use `cell.state`
and `cell.update(...)`.

> We also have `cell.getState()`. Normally, using `cell.state` works well to get the current state.
However, if we pass `cell` to a function which needs to get the state asynchronously, and the state
may have changed in the meantime, we should use `cell.getState()` to make sure we get the updated
state. Also note that we don't use `states` directly as `cell.getState`, so that we don't
accidentally call `cell.getState(value)` and end up sending `value` onto the `states` stream. By
using `const getState = () => states()`, any value passed to `getState` is ignored.

In the following section, we will look at how to wire up the Meiosis pattern to three view
libraries.

@docs-nav-start
@nav-prev:05-meiosis-with-mergerino.html:Meiosis with Mergerino
@nav-toc
@nav-next:07-views.html:Views
@docs-nav-end
