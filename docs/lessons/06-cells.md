# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](05-meiosis-with-mergerino.html) |
[Next >](07-views.html) |
[Table of Contents](toc.html)

## 06 - Cells

In the previous sections, we set up the Meiosis pattern with function patches, and with
[Mergerino](https://github.com/fuzetsu/mergerino). In both cases, we created:

- `states`: a stream of application states
- `update`: a stream of updates to the application state

We now have a way to manage application state. The next piece of the puzzle will be to wire up the
application state to a view library. We will be looking at that in the next few sections. Before
doing that, however, let's discuss a small but useful detail.

As it is now, we would need to pass `states` (or rather, `states()`, that is, the current state) and
`update` to our views.

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
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);
```

We now have a stream of cells. To get the current cell, we can call `cells()` and pass that as a
`cell` to views. Views can then access the state with `cell.state` and issue updates by calling
`cell.update(...)`. Finally, we can also pass `cell` to actions which in turn can use `cell.state`
and `cell.update(...)`.

In the following section, we will look at how to wire up the Meiosis pattern to three view
libraries.

[< Previous](05-meiosis-with-mergerino.html) |
[Next >](07-views.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
