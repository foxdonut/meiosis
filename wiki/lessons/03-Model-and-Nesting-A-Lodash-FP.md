# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Lodash FP

In this part of Meiosis, we will look at different strategies for model updates and nesting
components. Keep in mind that Meiosis is very flexible; you can use plain mutation for model
updates if that suits you. That being said, let's explore some libraries that can make model
updates and nesting quite elegant.

### Curried Functions

In our temperature component example, we had an action to edit the date in the text field:

```javascript
editDate: evt =>
  update(model => {
    model.date = evt.target.value;
    return model;
  })
```

With [Lodash](https://lodash.com), we can write this as:

```javascript
editDate: evt => update(model => _.set(model, "date", evt.target.value))
```

We can make this even nicer using [Lodash-FP](https://github.com/lodash/lodash/wiki/FP-Guide).

> The lodash/fp module promotes a more functional programming (FP) friendly style by exporting an
instance of lodash with its methods wrapped to produce immutable auto-curried iteratee-first
data-last methods.

The key parts are **auto-curried** and **data-last**.

A _curried_ function is a function that accepts multiple parameters, but, when passed less than the
total number of parameters, returns a function that accepts the remaining parameters. When all
parameters have been provided, the function returns its result.

So, given a function `const f = (x, y, z) => x + y + z`, a _curried_ version of f could be called
in any of these ways:

```javascript
f(10, 20, 30)
f(10)(20, 30)
f(10, 20)(30)
f(10)(20)(30)
```

Curried functions make it easy to create functions by passing less than the total number of
parameters. A simple example is a curried function `const add = (x, y) => x + y`. You could
write `const increment = add(1)` and then re-use `increment` to add 1 to any number, by
calling `const incremented = increment(number)`.

### Data-Last Functions

_Data-last_ functions change the order of their parameters to put the "configuration" parameters
first and the "data" parameters last. If you look at Lodash's `_.set` function:

```javascript
_.set(model, "value", value)
```

It sets the `"value"` property to `value` on the `model`. That's the important part: it operates
_on the model_. The `model` is the data. In Lodash-FP, the order of the parameters is changed to:

```javascript
_.set("value", value, model)
```

Notice how `model` is now the last parameter. How does this help? Combined with currying, we can
improve our `_.set` call. Previously we had:

```javascript
editDate: evt => update(model => _.set(model, "date", evt.target.value))
```

Using Lodash-FP, we now have:

```javascript
editDate: evt => update(model => _.set("date", evt.target.value, model))
```

### Point-Free Style

A pattern that often occurs when passing functions is:

```javascript
update(x => f(x))
```

You are passing a function that gets `x` and calls `f(x)`. But, you don't need to create a new
function here. You can just pass `f` directly:

```javascript
update(f)
```

Since `f` is already a function that accepts a parameter and returns a result.

We can apply this to our code:

```javascript
editDate: evt => update(model => _.set("date", evt.target.value, model))
```

Since `_.set` is curried, we can call it with just the first two parameters, to get a function of
one parameter:

```javascript
editDate: evt => update(model => _.set("date", evt.target.value)(model))
```

We have the same pattern here, `update(x => f(x))`, where `f` is `_.set("date", evt.target.value)`,
so we can simplify it to `update(f)`:

```javascript
editDate: evt => update(_.set("date", evt.target.value))
```

Since it is curried, `_.set("date", evt.target.value)` returns a function of `model`, which we can
pass to `update`. Notice that we don't need to specify the `model` parameter at all! This is called
_point-free_ style.

@flems code/03-Model-and-Nesting/A-Lodash-FP/nest.js,code/03-Model-and-Nesting/A-Lodash-FP/temperature.jsx,code/03-Model-and-Nesting/A-Lodash-FP/app.jsx,code/03-Model-and-Nesting/A-Lodash-FP/index.js,app.html,app.css react,react-dom,flyd,lodash-fp,meiosis,meiosis-tracer 800

### Principles / Takeaways

- We have different ways of writing nice code using functional programming concepts.
- Curried functions support passing less than the total number of parameters to get back a function
that accepts the remaining parameters.
- Data-last functions order their parameters to put the "configuration" parameters first and the
"data" parameters last.
- Using functions that are curried and data-last gives us a nice way of writing _point-free_
style code.
- Lodash FP is a version of Lodash with curried, data-last functions.

### Up Next

Having learned these functional programming concepts, next we'll look at
[Ramda](03-Model-and-Nesting-B-Ramda.html), another library with excellent functional programming support.

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
