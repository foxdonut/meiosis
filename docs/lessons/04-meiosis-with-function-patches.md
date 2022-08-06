# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-prev:03-streams.html:Streams
@nav-toc
@nav-next:05-meiosis-with-mergerino.html:Mergerino
@docs-nav-end

## Meiosis with Function Patches

In the previous lesson, [Streams](03-streams.html), we started setting up the Meiosis pattern:

- an `update` stream of **patches**
- a `states` stream of states, obtained with `scan` on the `update` stream and applying
an **accumulator**
- an `actions` object containing functions to which we pass `update`, so that those functions can
trigger state changes.

Our state had the following shape:

```js
{
  value: 0
}
```

Our patches were numbers such as `1` and `-1`, and our accumulator applied the patches to the state
by adding the number to `state.value`.

We are going to change our patches and accumulator function to be general-purpose, so that the shape
of our state can be much more flexible, and our actions can issue patches to make all sorts of
changes to the state.

<a name="temperature_example"></a>
### [A Temperature Example](#temperature_example)

Let's build a temperature example with the following initial state:

```js
const initial = {
  temperature: {
    value: 22,
    units: 'C'
  }
};
```

We can increase and decrease the value, as well as change the units betwen `C` (Celsius) and `F`
(Farenheit), converting the value in the process.

We need to:

- Determine the shape of our patches
- Write an accumulator function that will use those patches to produce the updated state.

In this section, we will use one approach using **function patches**. In the next section, we will
look at another approach - my personal favourite - using a small utility called Mergerino.

<a name="using_function_patches"></a>
### [Using Function Patches](#using_function_patches)

Instead of using plain numbers as patches, which are limited to incrementing a counter, we can use
**functions**. Indeed, we can pass functions onto the `update` stream and use them in the
accumulator to update the state.

These functions receive the current state as a parameter, and return the updated state. For example,
to increment the temperature value:

```js
const actions = {
  increment: (update, amount) => {
    update((state) => ({
      temperature: {
        value: state.temperature.value + amount,
        units: state.temperature.units
      }
    }));
  }
};
```

> Note that we could also use a library to update the state, such as
[lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) or
[Ramda](https://ramdajs.com/) for example.

Now we need to use function patches in the accumulator function. Remember that the accumulator gets,
as parameters, the current state and the incoming patch. The accumulator must return the updated
state. Since the incoming patches are functions, we just need to call them:

```js
const states = flyd.scan(
  (state, patch) => patch(state),
  initial,
  update
);
```

Putting it all together, we have:

@flems {"files":"code/04-meiosis-with-function-patches-01.js","libs":"flyd","height":800}

<a name="exercises"></a>
### [Exercises](#exercises)

Try it out: notice that the initial state appears in the output on the right. Within the console,
type and then press Enter:

`actions.increment(update, 2)`

`actions.changeUnits(update)`

In the output on the right, you'll see the updated states.

In the next section, we will look at an alternative to function patches, called Mergerino.

@docs-nav-start
@nav-prev:03-streams.html:Streams
@nav-toc
@nav-next:05-meiosis-with-mergerino.html:Mergerino
@docs-nav-end

