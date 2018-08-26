# [Meiosis](http://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Patchinko

Using functions to update the model is powerful and flexible. Another approach which is really
nice is to use [Patchinko](https://github.com/barneycarroll/patchinko) by
[Barney Carroll](http://barneycarroll.com/).

Patchinko is a brilliant utility that Barney wrote in just 30-some lines of code.

With Patchinko, we can achieve two things in a simple and elegant way:

1. Deep merge
2. Update using the previous value

### Deep Merge

Imagine that we issue updates as objects instead of functions. The objects indicate the properties
and values that we want to update. We explored this in the
[Deep Merge section of the Meiosis Tutorial](../tutorial/10-deep-merge-mithril.html). Essentially,
we wanted to use `Object.assign` as our `scan` function:

```javascript
const models = scan(Object.assign, initialModel, update);
```

That didn't work because `Object.assign` does a _shallow_ merge. If our current model is:

```javascript
{ air:   { value: 22, units: "C" },
  water: { value: 84, units: "F" }
}
```

And we want to update the `air` `value` to `23` by calling `update({ air:  { value: 23 } })`, we
end up with:

```javascript
{ air:   { value: 23 },
  water: { value: 84, units: "F" }
}
```

Since `Object.assign` does a shallow merge. The solution we explored in the tutorial was to use
a library that supports _deep_ merge, such as
[Lodash's _.merge](https://lodash.com/docs/4.17.5#merge) or
[deepmerge](https://github.com/KyleAMathews/deepmerge).

Using Patchinko, we can achieve the equivalent of a deep merge as follows.

Patchinko gives us a single function, `O`, that we can use to manage our updates.

> The `O` function is the [overloaded](https://github.com/barneycarroll/patchinko#overloaded)
version of Patchinko. Patchinko also has an
[explicit](https://github.com/barneycarroll/patchinko#explicit) version which provides the
functions `P`, `S`, `PS`, and `D`.

Calling `O` with multiple, plain object arguments works the same as `Object.assign`:

```javascript
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  { value: 23 } }
)
// result:
{ air:   { value: 23 },
  water: { value: 84, units: "F" }
}
```

So again we lost the `units` on the `air` property.

**However**, within the objects that we pass to `O`, we call `O` again with a single object.
This is the equivalent of `Object.assign` _for that property_. In practice, this is how you can
update deeply nested properties without losing the rest:

```javascript
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  O({ value: 23 }) } // notice O() here
)
// result:
{ air:   { value: 23, units: "C" }, // now we didn't lose the units!
  water: { value: 84, units: "F" }
}
```

By having `{ air: O({ value: 23 }) }`, Patchinko does `O(target.air, { value: 23 })` and assigns
the result back to the `air` property. The equivalent with `Object.assign` would be:

```javascript
const target =
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  };

Object.assign(target, { air: Object.assign(target.air, { value: 23 }) })
```

But of course in a more concise manner. Moreover, we can use `O()` in this fashion for any
number of levels deep within our objects.

### Update Using the Previous Value

Patchinko's `O` has one more trick up its sleeve. If we pass a **function** to `O()`, Patchinko
passes the value of that property to the function, and assigns the function's return value back
to that property.

This makes it easy for us to update a value using the previous value. For example, say that
instead of setting the value, we want to _increase_ the value by an amount. We need the previous
value to compute the updated value. We can pass a function to `O()`:

```javascript
O(
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" }
  },
  { air:  O({ value: O(x => x + 8) }) } // First O to update air, second O to update value
)
// result:
{ air:   { value: 30, units: "C" }, // we increased the value by 8, and didn't lose the units
  water: { value: 84, units: "F" }
}
```

By passing a function to `O()`, Patchinko passes us the previous value of that property,
`air.value`. Our function receives `22`, adds `8` and returns `30`, which Patchinko assigns
back to `air.value`.

### Issuing Updates

Using Patchinko, we can issue updates as plain objects and `O` instead of as functions.
Therefore `update` is now a stream of objects instead of a stream of functions.

To handle the updates, we can just use `O`:

```javascript
const models = flyd.scan(O, app.model(), update);
```

Remember that `scan` calls the function with the latest value and the next one coming in from the
`update` stream. Thus what we wrote above results in `O(latestModel, nextUpdate)`. Objects that
we issue via the `update` stream will be merged in to the latest model by `O`.

Now, for setting values, instead of writing this with Lodash:

```javascript
editDate: evt => update(model => _.set(model, "date", evt.target.value))
```

We can write this with Patchinko:

```javascript
editDate: evt => update({ date: evt.target.value })
```

And instead of this for updating a value using the previous value:

```javascript
increase: amount => _evt => update(_.update("value", _.add(amount)))
```

We can write this:

```javascript
increase: amount => _evt => update({ value: O(value => value + amount) })
```

### Nesting

To nest components within the top-level model at a certain path, we just have to wrap the updates
that we issue, recursively with `O()`:

```javascript
const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
});

const nestUpdate = (update, path) => patch =>
  update(nestPatch(patch, path));
```

So if our component is nested at `["temperature", "air"]`, we can issue an update within the
component simply as:

```javascript
update({ date: evt.target.value })
```

And the nesting will wrap the update to:

```javascript
update(O({ temperature: O({ air: O({ date: evt.target.value }) }) }))
```

This will ensure that the nested property gets updated without losing any other properties in the
top-level model.

You can see and experiment with the full example below.

@flems code/03-Model-and-Nesting/C-Patchinko/nest.js,code/03-Model-and-Nesting/C-Patchinko/temperature.jsx,code/03-Model-and-Nesting/C-Patchinko/app.jsx,code/03-Model-and-Nesting/C-Patchinko/index.js,app.html,app.css react,react-dom,flyd,patchinko,meiosis,meiosis-tracer 800

While using functions to update the model is generic, flexible and powerful, Patchinko gives us
a way to issue updates that is arguably simpler, more concise and intuitive, without losing any
power or flexibility.

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
