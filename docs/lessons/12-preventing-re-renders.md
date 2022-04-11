# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](11-nesting.html) |
[Next >](13-the-meiosis-pattern.html) |
[Table of Contents](toc.html)

## 12 - Preventing Re-Renders

> **IMPORTANT NOTE**: before preventing re-renders, please first make sure that re-rendering a part
of your application is indeed causing a performance problem that impacts the user experience.

Producing a virtual DOM node and re-rendering by the engine is generally fast, especially relative
to everything else that is going on in a web application: database access, network requests, and so
on. **Avoid premature optimization!**

Also consider the UI: if a table with thousands of rows of data is responsible for slowing down your
application, ask yourself whether users want to look at all that data at once on the page. Perhaps
pagination would be more appropriate? Or, think about whether adding some filters will help users
narrow down what they are looking for.

If you still need to prevent re-rendering, read on.

<a name="producing_new_object_instances"></a>
### [Producing New Object Instances](#producing_new_object_instances)

To prevent re-renders of a component, we determine whether a component's state has changed. We need
to produce **new object instances** when updating the state, instead of mutating the existing
object.

We can do this with Mergerino's `merge` function. It produces a new object instance instead
of mutating the state. Here, we are assigning the new instance back to the `[id]` property:

```js
actions: update => ({
  editEntryValue: (id, value) => update({ [id]: { value } })
})
```

This also works patches that use functions when returning the result in order to create a new object
instance. For example:

```js
changeUnits: id => evt => {
  evt.preventDefault();
  update({ [id]: state => {
    const newUnits = state.units === "C" ? "F" : "C";
    const newValue = convert(state.value, newUnits);
    return merge(state, { units: newUnits, value: newValue });
  } });
}
```

We are now ready to prevent re-renders. Continue reading for the React version, or
[click here to skip to the Mithril version](#mithril_prevent_re_render).

<a name="react_version"></a>
### [React version](#react_version)

We can use React's
[shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
lifecycle method to prevent a component from re-rendering when the state has not changed. For
this to work, we need to compare the component's next state to the current state.

The next props get passed as a parameter to the `shouldComponentUpdate` method. From them we can
extract the `state` and use the `id` to get the component's state. Then, we compare to the current
state using `this.props`. We return `true` or `false` depending on whether or not they are the same:

```js
shouldComponentUpdate(nextProps) {
  return nextProps.state[nextProps.id] !==
    this.props.state[this.props.id];
}
```

This will prevent the component's `render()` method from being called when the state has not
changed. We can prove this to ourselves by adding `console.log` statements in the `render()` methods
of the components, and check the console output to confirm that components are only re-rendered when
their state has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`, `render Temperature
Air`, and `render Temperature Water` appear in the console output **only** when you interact with
that component in the user interface. Other components do not get re-rendered.

@flems {"files":"code/preventing-re-renders/index-react.jsx,app.html,public/css/bootstrap.min.css,public/css/style.css","libs":"react,react-dom,flyd,mergerino","height":800,"middle":65}

<a name="mithril_prevent_re_render"></a>
### [Mithril version](#mithril_prevent_re_render)

We can use Mithril's
[onbeforeupdate lifecycle method](https://mithril.js.org/lifecycle-methods.html#onbeforeupdate)
to prevent a component from re-rendering when the state has not changed. For this to work, we
need to compare the component's next state to the current state.

We can write a simple helper function that checks whether the component's state has changed:

```js
const checkIfStateChanged = (next, prev) =>
  next.attrs.state[next.attrs.id] !==
  prev.attrs.state[prev.attrs.id];
```

Then, we add the `onbeforeupdate` lifecycle method to the component:

```js
onbeforeupdate: checkIfStateChanged
```

This will prevent the component's `view()` method from being called when the state has not changed.
We can prove this to ourselves by adding `console.log` statements in the `view()` methods of the
components, and check the console output to confirm that components are only re-rendered when their
state has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`, `render Temperature
Air`, and `render Temperature Water` appear in the console output **only** when you interact with
that component in the user interface. Other components do not get re-rendered.

@flems {"files":"code/preventing-re-renders/index-mithril.js,app.html,public/css/bootstrap.min.css,public/css/style.css","libs":"mithril,mithril-stream,mergerino","height":800,"middle":65}

[< Previous](11-nesting.html) |
[Next >](13-the-meiosis-pattern.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
