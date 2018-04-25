# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Ramda

In the [previous section](03-Model-and-Nesting-A-Lodash-FP.html), we looked at
[Lodash-FP](https://github.com/lodash/lodash/wiki/FP-Guide) to improve our model and nesting
functions. We used curried, data-last functions and point-free style.

[Ramda](http://ramdajs.com) is another fine library for functional programming. From its home
page:

> Ramda emphasizes a purer functional style. Immutability and side-effect free functions are at the
> heart of its design philosophy. This can help you get the job done with simple, elegant code.

While Lodash-FP was created after Lodash had been in existence for a while, Ramda was designed from
the start to provide curried, data-last functions. Choosing between Ramda and Lodash is much like
choosing a code editor, IDE, shell, and so on: the best one is the one that makes _you_ most
productive.

And again, keep in mind that this is not a requirement for using Meiosis.

### Setting a Property

With Lodash-FP, we used `_.set`:

```javascript
editDate: evt => update(_.set("date", evt.target.value))
```

The equivalent function in Ramda is `assoc`:

```javascript
editDate: evt => update(R.assoc("date", evt.target.value))
```

The above is short for `update(model => R.assoc("date", evt.target.value, model))`.
Since `R.assoc` is curried and data-last, we were able to write the code in point-free style.

We could go one step further. Notice that our function takes `evt` and pass `evt.target.value` to
`R.assoc("date", evt.target.value)` which is data-last, and passes the result to `update()`.

We can describe this as the following steps:

- extract `target.value` from `evt`
- pass the result to `R.assoc("date")`
- pass the result to `update()`

We can achieve this using function composition, `R.compose` to write our function as follows:

```javascript
editDate: R.compose(update, R.assoc("date"), R.path(["target", "value"]))
```

`R.compose` calls functions right-to-left, passing the result of one function to the next.

### Using Lenses

With Lodash-FP, we used `_.update` to update a value using a function:

```javascript
increase: value => update(_.update("value", _.add(value))),
```

Recall that this is the equivalent of

```javascript
increase: value => update(model => _.set("value", _.add(value, _.get("value", model)), model))
```

With Ramda, the equivalent of `_.update` is `R.over`. Instead of just specifying a property,
though, `R.over` expects a [lens](http://ramdajs.com/docs/#lens). In short, a lens is a way of
getting and setting a value on an object. For example, a lens for a nested property can be
created with `R.lensProp("property")`, and for a more deeply nested property,
`R.lensPath(["nested", "property"])`.

Once we've created a lens, we pass it to `R.over` to update the lens target with a function:

```javascript
increase: value => update(model => R.over(R.lensProp("value"), R.add(value), model))
```

Notice that again, `model` is passed as the last argument to the function. Remember that when
we have `x => f(x)`, we can make this more concise with the point-free form, `f`. So, we
can write:

```javascript
increase: value => update(R.over(R.lensProp("value"), R.add(value)))
```

The result of `R.add()` is passed to `R.over()`, which is then passed to `update`. We can
use function composition:

```javascript
increase: value => R.compose(update, R.over(R.lensProp("value")), R.add(value))
```

Now `value` is passed as the last argument, so we can use the point-free form:

```javascript
increase: R.compose(update, R.over(R.lensProp("value")), R.add)
```

These functional programming constructs can be very nice, but perhaps harder to decipher when
we're not used to them. It's up to you to decide how "far" to go. The more concise form is
arguably more elegant, but less explicit as to what is going on.

@flems code/03-Model-and-Nesting/B-Ramda/nest.js,code/03-Model-and-Nesting/B-Ramda/temperature.jsx,code/03-Model-and-Nesting/B-Ramda/app.jsx,code/03-Model-and-Nesting/B-Ramda/index.js,app.html,app.css react,react-dom,flyd,ramda,meiosis,meiosis-tracer 800

### Principles / Takeaways

- Ramda is another nice library for functional programming.
- Functions in Ramda are curried and data-last.
- The Meiosis pattern makes it possible, _but not required_, to use functional programming
concepts.

### Up Next

In the next section, we'll look at using [Patchinko](03-Model-and-Nesting-C-Patchinko.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
