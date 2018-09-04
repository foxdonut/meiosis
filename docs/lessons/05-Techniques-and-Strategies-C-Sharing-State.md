# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Sharing State Between Nested Components

Sometimes we'd like to share state between nested components. Each of these components has
access to its subsection of the state, so how do we give them access to some state that is
at the top level of the state tree?

That state can be things that are general to the application, such as the logged-in user,
the selected theme, and so on. How do we pass this information down to components, without
needing extra function parameters?

One way to achieve this is to designate a property on the state object to hold this shared
information. In the examples below, I use `context`, but you can use another name if you
prefer.

```javascript
{
  context: { /* top-level shared state */ },
  // rest of model, possibly nested
}
```

Also note that although I use function updates with React, and Patchinko with Mithril, you
can of course use either of function updates or Patchinko with any virtual DOM library.

In both versions, what we need to account for are the following two cases:

1. When issuing updates from a nested component, have a way to differentiate `context`
updates from regular nested updates.
1. When nesting a component, pass the nested model, combined with the `context`, to the
`view` function

### Function update version with React:

This is how we issue updates as functions:

```javascript
update(model => {
  // make changes to the model...
  return model;
});
```

Regular and nested updates continue to work this way. For updating the context, we'll wrap
the function update into an object with a `context` property:

```javascript
update({ context: model => {
  // make changes to the model...
  return model;
} });
```

That way, we can distinguish context updates from regular updates. In our nesting function,
we'll look for the `context` property and pass-through context updates without any nesting:

```javascript
const nestUpdate = (update, path) => func =>
  update(func.context ? func : (model => updateWith(model, path, func)));
```

Finally, at the top level of our Meiosis pattern setup code, our `scan` function checks for
the `context` property and, if it is present, calls its function:

```javascript
const models = flyd.scan((model, func) =>
  func.context ? func.context(model) : func(model), app.model(), update);
```

That takes care of differentiating `context` updates from regular nested updates.

Next, when nesting a component, we want to pass the nested model, combined with the `context`,
to the `view` function:

```javascript
result.view = model => component.view(
  Object.assign({ context: model.context }, get(model, path)));
```

We can now call `view(model)` on unnested and nested components alike, just as before, and
every component will have access to the `context`.

The full example is available below.

@flems code/05-Techniques-and-Strategies/C-Sharing-State/index-react.jsx,app.html,public/css/bootstrap.min.css,public/css/style.css react,react-dom,flyd,lodash 800

### Patchinko version with Mithril:

When using [Patchinko](https://github.com/barneycarroll/patchinko), we issue updates as objects
(patches):

```javascript
update({ property: O({ key: "value" }) });
```

Regular and nested updates continue to work this way. For updating the context, we'll issue an
update in the same way, with `context` property:

```javascript
update({ context: O({ key: "value" }) });
```

In our nesting function, we'll look for the `context` property and pass-through context updates
without any nesting:

```javascript
const nestUpdate = (update, path) => patch => {
  update(patch.context ? patch : nestPatch(patch, path));
};
```

At the top level of our Meiosis pattern setup code, our `scan` function does not need to change:

```javascript
const models = m.stream.scan(O, app.model(), update);
```

When nesting a component, we want to pass the nested model, combined with the `context`,
to the `view` function:

```javascript
result.view = model => component.view(
  O({ context: model.context }, get(model, path)));
```

We can now call `view(model)` on unnested and nested components alike, just as before, and
every component will have access to the `context`.

The full example is available below.

@flems code/05-Techniques-and-Strategies/C-Sharing-State/index-mithril.js,app.html,public/css/bootstrap.min.css,public/css/style.css mithril,mithril-stream,patchinko 800

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
