# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Preventing Re-renders

**IMPORTANT NOTE**: before preventing re-renders, please first make sure that re-rendering a part
of your application is indeed causing a performance problem that impacts the user experience.
Producing a virtual DOM node and re-rendering by the engine is generally fast, especially relative
to everything else that is going on in a web application: database access, network requests, and
so on. **Avoid premature optimization!**

Also consider the UI: if a table with thousands of rows of data is responsible for slowing down
your application, ask yourself whether users want to look at all that data at once on the page.
Perhaps pagination would be more appropriate? Or, think about whether adding some filters will help
users narrow down what they are looking for.

If you still need to prevent re-rendering, read on for the React version, or
[scroll down to the Mithril version](#mithril_prevent_re_render).

### React version

We can use React's [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
to prevent a component from re-rendering when the model has not changed. For this to work, we
need to make sure to produce **new object instances** from `update()` instead of mutating the
existing object.

For example, instead of issuing an update like so:

```js
update(model => Object.assign(model, { value: evt.target.value }))
```

We switch to:

```js
update(model => Object.assign({}, model, { value: evt.target.value }))
```

This creates a new object instance instead of mutating the model.

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

This will prevent the component's `render()` method from being called when the model has not
changed. We can prove this to ourselves by adding `console.log` statements in the `render()`
methods of the components, and check the console output to confirm that components are only
re-rendered when their model has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`,
`render Temperature Air`, and `render Temperature Water` appear in the console output **only**
when you interact with that component in the user interface. Other components do not get
re-rendered.

@flems code/05-Lifecycle-and-other-Techniques/B-Preventing-Rerenders/index-react.jsx,app.html,public/css/bootstrap.min.css,public/css/style.css react,react-dom,flyd,lodash 800 70

<a name="mithril_prevent_re_render">
### Mithril version

We can use Mithril's
[onbeforeupdate lifecycle method](https://mithril.js.org/lifecycle-methods.html#onbeforeupdate)
to prevent a component from re-rendering when the model has not changed. For this to work, we
need to make sure to produce **new object instances** from `update()` instead of mutating the
existing object.

Because we are using [Patchinko](https://github.com/barneycarroll/patchinko) to issue and
handle model updates, this is simply a matter of switching from
[overloaded](https://github.com/barneycarroll/patchinko#overloaded) to
[immutable](https://github.com/barneycarroll/patchinko#immutable).
This creates a new object instance instead of mutating the model.

Next, we can write a simple helper function that checks whether the component's model
has changed:

```js
const checkIfModelChanged = (next, prev) =>
  next.attrs.model !== prev.attrs.model;
```

Finally, we add the `onbeforeupdate` lifecycle method to the component:

```js
onbeforeupdate: checkIfModelChanged
```

This will prevent the component's `view()` method from being called when the model has not
changed. We can prove this to ourselves by adding `console.log` statements in the `view()`
methods of the components, and check the console output to confirm that components are only
re-rendered when their model has changed.

Verify this in the example below. Notice that `render Entry`, `render Date`,
`render Temperature Air`, and `render Temperature Water` appear in the console output **only**
when you interact with that component in the user interface. Other components do not get
re-rendered.

@flems code/05-Lifecycle-and-other-Techniques/B-Preventing-Rerenders/index-mithril.js,app.html,public/css/bootstrap.min.css,public/css/style.css mithril,mithril-stream,patchinko-immutable 800 70

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
