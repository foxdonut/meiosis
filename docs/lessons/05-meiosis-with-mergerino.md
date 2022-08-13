# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-prev:04-meiosis-with-function-patches.html:Function Patches
@nav-toc
@nav-next:06-cells.html:Cells
@docs-nav-end

## Meiosis with Mergerino

In the previous section, we set up the Meiosis pattern with an `update` stream of function patches.

In this section, we will use another approach - my personal favourite - using a library called
[Mergerino](https://github.com/fuzetsu/mergerino). The Meiosis pattern is flexible enough that you
can use either of these approaches or even one of your own.

<a name="introducing_mergerino"></a>
### [Introducing Mergerino](#introducing_mergerino)

[Mergerino](https://github.com/fuzetsu/mergerino) is a brilliant utility that [Daniel
Loomer](https://github.com/fuzetsu) wrote in less than 30 lines of code. We will use patches on our
`update` stream that Mergerino can use to produce the updated state from our accumulator function.

Let's say we have this initial state:

```js
const initial = {
  temperature: {
    value: 22,
    units: 'C'
  }
};
```

Imagine that our patches are objects that describe how we want to update the state. If we want to
change the temperature value to 23, we would call:

```js
update({ value: 23 });
```

To change the units:

```js
update({ units: 'F' });
```

To convert the value at the same time as changing the units:

```js
update({ value: 72, units: 'F' });
```

How do we write an accumulator function that handles these object patches to update the state?

Mergerino exports a function, that we call `merge`, which takes a target object as its first
parameter, and patch objects in the remainder of the parameters. It patches the target object by
copying over the properties from the patch objects onto the target object:

```js
merge({ value: 22, units: 'C' }, { value: 23 });
// result:
{ value: 23, units: 'C' }

merge({ value: 23, units: 'C' }, { comfortable: true })
// result:
{ value: 23, units: 'C', comfortable: true }
```

If you find that this looks like `Object.assign`, you are correct: in these examples, `merge` does
the equivalent. However, `merge` has capabilities beyond what you can do with `Object.assign`.

<a name="patching_based_on_current"></a>
### [Patching based on the current value](#patching_based_on_current)

Within a patch, you can use the current value of the target object to determine the updated value.
Just pass a **function** as the value of the property. Mergerino passes the current value of that
property to the function, and assigns the function's return value back to that property.

This makes it easy to update a value using the current value. For example, say that we want to
increment the temperature value by 1. We need the current value to compute the updated value. We can
use a function for `value`:

```js
merge({ value: 22, units: 'C' }, { value: x => x + 1 }); // The function receives 22
// result:
{ value: 23, units: 'C' }
```

By passing a function for the `value` property, Mergerino passes the current value of that property
to the function. Our function receives `22`, adds `1` and returns `23`, which Mergerino assigns back
to the `value` property.

<a name="deep_patching"></a>
### [Deep Patching](#deep_patching)

`Object.assign` performs a _shallow_ merge. If our target object is:

```js
{ air:   { value: 22, units: 'C' },
  water: { value: 84, units: 'F' }
}
```

And we want to change the `air` `value` to `25` by calling:

```js
Object.assign(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air:   { value: 25 } }
);
```

We get this result:

```js
{ air:   { value: 25 }, // we lost the units!
  water: { value: 84, units: 'F' }
}
```

We lost the `units`! This is because properties are merged only at the first level. Beyond that,
values are completely replaced instead of merged. So `{ value: 22, units: 'C' }` got replaced with
`{ value: 25 }`.

With Mergerino, we can merge properties deeper than the first level. Because merging happens at
every level, we can update the `value` without losing the `units`:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: { value: 25 } }
);
// result:
{ air:   { value: 25, units: 'C' }, // now we didn't lose the units!
  water: { value: 84, units: 'F' }
}
```

Deep patching and function patching can also be used together:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air:  { value: x => x + 8 } }
);
// result:
{ air:   { value: 30, units: 'C' }, // increased the value by 8, didn't lose the units
  water: { value: 84, units: 'F' }
}
```

If we want to _avoid_ deep patching and instead want to replace a property, we can use a function.
Say we want to set `air` to `{ replaced: true }` without keeping `value` and `units`:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air:   () => ({ replaced: true }) } // use a function to replace the value
);
// result:
{ air:   { replaced: true },
  water: { value: 84, units: 'F' }
}
```

We can also use a function at the top level to produce a completely new result without keeping any of the previous values. This could be useful, for example, to re-initialize application state.

```js
merge(
  { ... }, // doesn't matter what the previous state was
  () => (
    { air:   { value: 22, units: 'C' },
      water: { value: 84, units: 'F' }
    }
  )
);
// result:
{ air:   { value: 22, units: 'C' },
  water: { value: 84, units: 'F' }
}
```

<a name="deleting_a_property"></a>
### [Deleting a property](#deleting_a_property)

Finally, we can use `undefined` as a property value when we wish to delete that property:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: undefined }
);
// result:
{ water: { value: 84, units: 'F' } }

merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: { value: undefined } }
)
// result:
{ air:   { units: 'C' },
  water: { value: 84, units: 'F' }
}
```

Try it out. Using the code window below, try the following exercises. Use `console.log` to verify
your answers.

@flems {"files":"code/05-meiosis-with-mergerino-01.js","libs":"mergerino","height":550}

<a name="exercises_1"></a>
### [Exercises](#exercises_1)

1. Change `water` to `{ value: 84, units: 'F' }`
1. Toggle the `comfortable` property with a function that changes the value to the
opposite of what it was
1. Change the `air` value to `20` without losing the units
1. Delete the `invalid` property.

<a name="solution_1"></a>
### [Solution](#solution_1)

@flems {"files":"code/05-meiosis-with-mergerino-01-solution.js","libs":"mergerino","height":800,"hidden":true}

<a name="using_mergerino_with_meiosis"></a>
### [Using Mergerino with Meiosis](#using_mergerino_with_meiosis)

To use Mergerino with Meiosis, we can pass object patches onto the `update` stream and use them in
the accumulator to update the state.

For example, to increment the temperature value:

```js
increment: (update, amount) => {
  update({
    temperature: {
      value: (x) => x + amount
    }
  });
};
```

Now we need to use these object patches in the accumulator function. Remember that the accumulator
gets the current state and the incoming patch as parameters, and must return the updated state. We
can use `merge`:

```js
const states = flyd.scan(
  (state, patch) => merge(state, patch),
  initial,
  update
);
```

Notice that the accumulator function that we are passing is:

```js
(state, patch) => merge(state, patch);
```

We have a function that takes `(state, patch)` and calls `merge` with `(state, patch)`. But, that is
the same as `merge` itself! So, we can use it directly:

```js
const states = flyd.scan(merge, initial, update);
```

Putting it all together, we have:

@flems {"files":"code/05-meiosis-with-mergerino-02.js","libs":"flyd,mergerino","height":800}

<a name="exercises_2"></a>
### [Exercises](#exercises_2)

Try it out: notice that the initial state appears in the output on the right. Within the console,
type and then press Enter:

`actions.increment(update, 2)`

`actions.changeUnits(update)`

In the output on the right, you'll see the updated states.

When you are ready, continue on to the next section, where we will combine the `state` and `update`
into **cells**.

@docs-nav-start
@nav-prev:04-meiosis-with-function-patches.html:Function Patches
@nav-toc
@nav-next:06-cells.html:Cells
@docs-nav-end
