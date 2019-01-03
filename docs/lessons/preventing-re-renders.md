# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Preventing Re-Renders

> **IMPORTANT NOTE**: before preventing re-renders, please first make sure that re-rendering a part
of your application is indeed causing a performance problem that impacts the user experience.

Producing a virtual DOM node and re-rendering by the engine is generally fast, especially relative
to everything else that is going on in a web application: database access, network requests, and
so on. **Avoid premature optimization!**

Also consider the UI: if a table with thousands of rows of data is responsible for slowing down
your application, ask yourself whether users want to look at all that data at once on the page.
Perhaps pagination would be more appropriate? Or, think about whether adding some filters will help
users narrow down what they are looking for.

If you still need to prevent re-rendering, read on.

### Producing New Object Instances

To prevent re-renders of a component, we determine whether a component's state has changed. We
need to produce **new object instances** when updating the state, instead of mutating the
existing object.

We can do this with Patchinko's `PS` function, passing `{}` as the first argument. This produces
a new object instance instead of mutating the state. Here, we are assigning the new instance
back to the `[id]` property:

```js
actions: update => ({
  editEntryValue: (id, value) => update({ [id]: PS({}, { value }) })
})
```




Continue reading for the React version, or
[click here to skip to the Mithril version](#mithril_prevent_re_render).

### React version

We can use React's
[shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
lifecycle method to prevent a component from re-rendering when the state has not changed. For
this to work, we need to make sure to produce **new object instances** from `update()` instead
of mutating the existing object.

For example, instead of issuing an update like so:

```js
update(state => Object.assign(state, { value: evt.target.value }))
```

We switch to:

```js
update(state => Object.assign({}, state, { value: evt.target.value }))
```

This creates a new object instance instead of mutating the state.

Next, instead of extending `React.Component`:

```js
return class extends React.Component {
  //...
}
```

We now extend `React.PureComponent`:

```js
return class extends React.PureComponent {
  //...
}
```

This will prevent the component's `render()` method from being called when the state has not
changed. We can prove this to ourselves by adding `console.log` statements in the `render()`
methods of the components, and check the console output to confirm that components are only
re-rendered when their state has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`,
`render Temperature Air`, and `render Temperature Water` appear in the console output **only**
when you interact with that component in the user interface. Other components do not get
re-rendered.

@flems code/preventing-re-renders/index-react.jsx,app.html,public/css/bootstrap.min.css,public/css/style.css react,react-dom,flyd,patchinko 800 70

<a name="mithril_prevent_re_render"></a>
### Mithril version

We can use Mithril's
[onbeforeupdate lifecycle method](https://mithril.js.org/lifecycle-methods.html#onbeforeupdate)
to prevent a component from re-rendering when the state has not changed. For this to work, we
need to make sure to produce **new object instances** from `update()` instead of mutating the
existing object.

Because we are using [Patchinko](https://github.com/barneycarroll/patchinko) to issue and
handle state updates, this is simply a matter of switching from
[overloaded](https://github.com/barneycarroll/patchinko#overloaded) to
[immutable](https://github.com/barneycarroll/patchinko#immutable).
This creates a new object instance instead of mutating the state.

> In case you missed it, refer to the
[Documentation section on using Patchinko](03-Model-and-Nesting-C-Patchinko.html).

Next, we can write a simple helper function that checks whether the component's state
has changed:

```js
const checkIfStateChanged = (next, prev) =>
  next.attrs.state[next.attrs.id] !==
  prev.attrs.state[prev.attrs.id];
```

Finally, we add the `onbeforeupdate` lifecycle method to the component:

```js
onbeforeupdate: checkIfStateChanged
```

This will prevent the component's `view()` method from being called when the state has not
changed. We can prove this to ourselves by adding `console.log` statements in the `view()`
methods of the components, and check the console output to confirm that components are only
re-rendered when their state has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`,
`render Temperature Air`, and `render Temperature Water` appear in the console output **only**
when you interact with that component in the user interface. Other components do not get
re-rendered.

@flems code/preventing-re-renders/index-mithril.js,app.html,public/css/bootstrap.min.css,public/css/style.css mithril,mithril-stream,patchinko 800 70

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
