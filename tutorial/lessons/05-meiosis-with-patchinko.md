# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](04-meiosis-with-function-patches.html) |
[Next >](06-components.html) |
[Table of Contents](toc.html)

## 05 - Meiosis with Patchinko

In the previous lesson, [04 - Meiosis with Function Patches](04-meiosis-with-function-patches.html),
we set up the Meiosis pattern with an `update` stream of function patches.

In this section, we will use another approach - my personal favourite - using a library called
Patchinko. The Meiosis pattern is flexible enough that you can use either of these approaches
or even one of your own.

### Introducing Patchinko

[Patchinko](https://github.com/barneycarroll/patchinko) is a brilliant utility that
[Barney Carroll](https://github.com/barneycarroll) wrote in just 30-some lines of code. We will
use it to issue patches onto our `update` stream, and to produce the updated state from
our accumulator function.

Let's say we have this initial state:

```js
{
  temperature: {
    value: 22,
    units: "C"
  }
}
```

Imagine that our patches are objects that describe how we want to update the state. If
we want to change the temperature value to 23, we would call:

```js
update({ value: 23 })
```

To change the units:

```js
update({ units: "F" })
```

To convert the value at the same time as changing the units:

```js
update({ value: 72, units: "F" })
```

How to we write an accumulator function that handles these object patches to update the
state?

Remember that the accumulator function gets the current state and the incoming patch as
parameters, and must return the updated state:

```js
function(state, patch) {
  return state;
}
```

Patchinko comes with a function, `P` (for "Patch") that takes a target object as its first
parameter, and patch objects in the remainder of the parameters. It patches the target object
by copying over the properties from the patch objects onto the target object:

```javascript
P({ value: 22, units: "C" }, { value: 23 })
// result:
{ value: 23, units: "C" }

P({ value: 23, units: "C" }, { comfortable: true })
// result:
{ value: 23, units: "C", comfortable: true }
```

If you find that this looks like `Object.assign`, you are correct: `P` does the equivalent.
However, `P` has more capabilities when combined with Patchinko's other functions:
`S`, `PS`, and `D`.

### Patching based on the current value: `S`

Within a patch, you can include calls to other Patchinko functions. One of those is `S` (Scope).
`S` allows us to use the current value of the target object to determine the updated value.

We pass a **function** to `S()`. Patchinko passes the value of that property to the function, and
assigns the function's return value back to that property.

This makes it easy for us to update a value using the previous value. For example, say that
we want to increment the temperature value by 1. We need the previous value to compute the updated
value. We can pass a function to `S()`:

```js
P({ value: 22, units: "C" }, { value: S(x => x + 1) }) // The function receives 22
// result:
{ value: 23, units: "C" }
```

> Note that `x => x + 1` is ES6 syntax that is short for
```js
function(x) {
  return + 1;
}
```

By passing `S()` for the `value` property, Patchinko passes the previous value of that property
to the function that we indicate in our call to `S()`. Our function receives `22`, adds `1` and
returns `23`, which Patchinko assigns back to the `value` property.

### Deep Patching: `PS`

When we pass plain objects to `P`, it acts like `Object.assign` and does a _shallow_ merge.
If our target object is:

```javascript
{ air:   { value: 22, units: "C" },
  water: { value: 84, units: "F" }
}
```

And we want to change the `air` `value` to `25` by calling:

```javascript
P(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:   { value: 25 } }
)
```

We get this result:

```js
{ air:   { value: 25 },
  water: { value: 84, units: 'F' }
}
```

We lost the `units`! This is because properties are merged only at the first level, just like
with `Object.assign`. Beyond that, properties are overwritten.

This is where Patchinko's `PS()` function comes in.

To use it, we call `PS` with a single object. This is the equivalent of `P` _for that property_.
We can merge properties deeper than the first level without losing the rest:

```javascript
P(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air: PS({ value: 25 }) } // notice PS() here
)
// result:
{ air:   { value: 25, units: "C" }, // now we didn't lose the units!
  water: { value: 84, units: "F" }
}
```

By having `{ air: PS({ value: 25 }) }`, Patchinko does `P(target.air, { value: 25 })` and assigns
the result back to the `air` property. The equivalent with `Object.assign` would be:

```javascript
const target =
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  };

Object.assign(target, { air: Object.assign(target.air, { value: 25 }) })
```

But of course in a more concise manner. Moreover, we can use `PS()` in this fashion for any
number of levels deep within our objects.

`PS` and `S` can also be used together:

```javascript
P(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  PS({ value: S(x => x + 8) }) } // PS to merge air, S to update value
)
// result:
{ air:   { value: 30, units: "C" }, // we increased the value by 8, and didn't lose the units
  water: { value: 84, units: "F" }
}
```

### Deleting a property: `D`

Finally, Patchinko provides `D` to delete a property. To use it, we just have to specify `D`
as the value for the property that we wish to delete:

```js
P(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  D }
)
// result:
{ water: { value: 84, units: "F" } }
```

Note that if we want to delete a property past the first level, we still need to use `PS`:

```js
P(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air: PS({ value: D }) }
)
// result:
{ air:   { units: "C" },
  water: { value: 84, units: "F" }
}
```

Try it out. Using the code window below, try the following exercises. Use `console.log` to
verify your answers.

@flems code/05-meiosis-with-patchinko-01.js patchinko 550

### Exercises

1. Change `water` to `{ value: 84, units: "F" }`
1. Toggle the `comfortable` property with a function that changes the value to the
opposite of what it was
1. Change the `air` value to `20` without losing the units
1. Delete the `invalid` property.

### Solution

@flems code/05-meiosis-with-patchinko-01-solution.js patchinko 800 hidden

> **Alternative: Using the Overloaded version of Patchinko**
>
> We are using the
[explicit](https://github.com/barneycarroll/patchinko#explicit) version of Patchinko, which
provides `P`, `S`, `PS`, and `D`.
>
> If you prefer, you can also use the
[overloaded](https://github.com/barneycarroll/patchinko#overloaded) version, which provides
a single function, `O`, that uses what you pass to the function to determine whether to do the
equivalent of `P`, `S`, `PS`, or `D`.
>
> In a nutshell:
>
> - With multiple arguments: `O(target, patch)`, does the same as `P`
> - With a single **function** argument: `O(x => y)` does the same as `S`
> - With a single **object** argument:`O({..})` does the same as `PS`
> - With no arguments, as the value of a property: `O` does the same as `D`.

### Using Patchinko with Meiosis

To use Patchinko with Meiosis, we can pass object patches onto the `update` stream and use
them in the accumulator to update the state.

For example, to increment the temperature value:

```js
increment: function(amount) {
  update({
    temperature: PS({
      value: S(x => x + amount)
    })
  });
}
```

Now we need to use these object patches in the accumulator function. Remember that the
accumulator gets the current state and the incoming patch as parameters, and must return the
updated state. We can use `P`:

```js
var states = flyd.scan(function(state, patch) {
  return P(state, patch);
}, temperature.initialState, update);
```

Notice that the accumulator function that we are passing is:

```js
function(state, patch) {
  return P(state, patch);
}
```

We have a function that takes (state, patch) and calls `P` with (state, patch). But `P` already
does what we want, so we can pass it directly:

```js
var states = flyd.scan(P, temperature.initialState, update);
```

Putting it all together, we have:

@flems code/05-meiosis-with-patchinko-02.js flyd,patchinko 800

### Exercises

Try it out: notice that the initial state appears in the output on the right. Within the console,
type and then press Enter:

`actions.increment(2)`

`actions.changeUnits()`

In the output on the right, you'll see the updated states.

When you are ready, continue on to [06 - Components](06-components.html).

[< Previous](04-meiosis-with-function-patches.html) |
[Next >](06-components.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
