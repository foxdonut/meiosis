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

<a name="introducing_patchinko"></a>
### [Introducing Patchinko](#introducing_patchinko)

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

Patchinko comes with a function, `O`, that takes a target object as its first
parameter, and patch objects in the remainder of the parameters. It patches the target object
by copying over the properties from the patch objects onto the target object:

```javascript
O({ value: 22, units: "C" }, { value: 23 })
// result:
{ value: 23, units: "C" }

O({ value: 23, units: "C" }, { comfortable: true })
// result:
{ value: 23, units: "C", comfortable: true }
```

If you find that this looks like `Object.assign`, you are correct: `O` does the equivalent.
However, `O` has more capabilities when called in different ways.

<a name="patching_based_on_current"></a>
### [Patching based on the current value: `O(fn)`](#patching_based_on_current)

Within a patch, you can include more calls to `O`. One way allows us to use the current value of
the target object to determine the updated value.

We pass a **function** to `O()`. Patchinko passes the value of that property to the function, and
assigns the function's return value back to that property.

This makes it easy for us to update a value using the previous value. For example, say that
we want to increment the temperature value by 1. We need the previous value to compute the updated
value. We can pass a function to `O()`:

```js
O({ value: 22, units: "C" }, { value: O(x => x + 1) }) // The function receives 22
// result:
{ value: 23, units: "C" }
```

> Note that `x => x + 1` is ES6 syntax that is short for
```js
function(x) {
  return + 1;
}
```

By passing `O(fn)` for the `value` property, Patchinko passes the previous value of that property
to the function that we indicate in our call to `O()`. Our function receives `22`, adds `1` and
returns `23`, which Patchinko assigns back to the `value` property.

<a name="deep_patching"></a>
### [Deep Patching: `O(obj)`](#deep_patching)

When we pass plain objects to `O`, it acts like `Object.assign` and does a _shallow_ merge.
If our target object is:

```javascript
{ air:   { value: 22, units: "C" },
  water: { value: 84, units: "F" }
}
```

And we want to change the `air` `value` to `25` by calling:

```javascript
O(
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

This is where nested calls to `O(obj)` come in.

To use it, we call `O` with a single object. This is the equivalent of `O` _for that property_.
We can merge properties deeper than the first level without losing the rest:

```javascript
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air: O({ value: 25 }) } // notice O() here
)
// result:
{ air:   { value: 25, units: "C" }, // now we didn't lose the units!
  water: { value: 84, units: "F" }
}
```

By having `{ air: O({ value: 25 }) }`, Patchinko does `O(target.air, { value: 25 })` and assigns
the result back to the `air` property. The equivalent with `Object.assign` would be:

```javascript
const target =
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  };

Object.assign(target, { air: Object.assign(target.air, { value: 25 }) })
```

But of course in a more concise manner. Moreover, we can use `O()` in this fashion for any
number of levels deep within our objects.

`O(obj)` and `O(fn)` can also be used together:

```javascript
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  O({ value: O(x => x + 8) }) } // first O to merge air, second O to update value
)
// result:
{ air:   { value: 30, units: "C" }, // we increased the value by 8, and didn't lose the units
  water: { value: 84, units: "F" }
}
```

<a name="deleting_a_property"></a>
### [Deleting a property: `O`](#deleting_a_property)

Finally, we can use `O` as a property **value** when we wish to delete that property:

```js
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air: O }
)
// result:
{ water: { value: 84, units: "F" } }
```

Note that if we want to delete a property past the first level, we still need to use `O(obj)`:

```js
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air: O({ value: O }) }
)
// result:
{ air:   { units: "C" },
  water: { value: 84, units: "F" }
}
```

Try it out. Using the code window below, try the following exercises. Use `console.log` to
verify your answers.

@flems code/05-meiosis-with-patchinko-01.js patchinko 550

<a name="exercises_1"></a>
### [Exercises](#exercises_1)

1. Change `water` to `{ value: 84, units: "F" }`
1. Toggle the `comfortable` property with a function that changes the value to the
opposite of what it was
1. Change the `air` value to `20` without losing the units
1. Delete the `invalid` property.

<a name="solution_1"></a>
### [Solution](#solution_1)

@flems code/05-meiosis-with-patchinko-01-solution.js patchinko 800 hidden

> **Alternative: Using the Explicit version of Patchinko**
>
> We are using the
[overloaded / constant](https://github.com/barneycarroll/patchinko#overloaded) version of
Patchinko, which provides `O`.
>
> If you prefer, you can also use the
[explicit](https://github.com/barneycarroll/patchinkexplicit#overloaded) version, which provides
`P`, `S`, `PS`, or `D`.
>
> In a nutshell:
>
> - `P` does the same as `O` with multiple arguments: `O(target, patch)`
> - `S` does the same as `O` with a single **function** argument: `O(x => y)`
> - `PS` does the same as `O` with a single **object** argument: `O({..})`
> - `D` does the same as `O` with no arguments, as the value of a property.

<a name="using_patchinko_with_meiosis"></a>
### [Using Patchinko with Meiosis](#using_patchinko_with_meiosis)

To use Patchinko with Meiosis, we can pass object patches onto the `update` stream and use
them in the accumulator to update the state.

For example, to increment the temperature value:

```js
increment: function(amount) {
  update({
    temperature: O({
      value: O(x => x + amount)
    })
  });
}
```

Now we need to use these object patches in the accumulator function. Remember that the
accumulator gets the current state and the incoming patch as parameters, and must return the
updated state. We can use `O`:

```js
var states = flyd.scan(function(state, patch) {
  return O(state, patch);
}, temperature.Initial(), update);
```

Notice that the accumulator function that we are passing is:

```js
function(state, patch) {
  return O(state, patch);
}
```

We have a function that takes (state, patch) and calls `O` with (state, patch). But `O` already
does what we want, so we can pass it directly:

```js
var states = flyd.scan(O, temperature.Initial(), update);
```

Putting it all together, we have:

@flems code/05-meiosis-with-patchinko-02.js flyd,patchinko 800

<a name="exercises_2"></a>
### [Exercises](#exercises_2)

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
