# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 02 - Render Method

In the previous lesson, [01 - Hello World](01-hello-world-react.html), we rendered a simple,
**static** message onto the page. Now, let's pass data to the React component so that we can
**dynamically** produce what to render, based on the application state, or simply **state**.

### Render uses props

In React, the `render` method produces the vnode to render. It can use `props` to receive data.
We can use these to communicate the application state to the component.

In our example below, the state is a counter. We'll create an **initial** state with a value of
`0`. When rendering with `ReactDOM.render`, we pass the `App` component as before, but we also
pass a `state` prop.

![The Render Method](02-render-method-01.svg)

Within the `render` method, we can use `this.props` to read the props that were passed in. In
this case, we are simply creating a `div` element with the text `Counter:` and the value that
was passed in the `state` prop:

@flems react/02-render-method.jsx,app.html,app.css react,react-dom

We now have a component that uses state, which is passed in as a prop.

### Exercises

1. Try changing what you pass in as the `state` prop, and seeing the results.
1. For the `App` component, change the `render` method so that it produces something different.
1. Instead of passing a plain number as the `state` prop, try passing in an object such as
`{ label: "The Counter", value: 0 }`. Change the `render` method so that it uses the
state to produce the view.

### Solution

@flems react/02-render-method-solution.jsx,app.html,app.css react,react-dom 500 hidden

In the next lesson, we will learn how to let the user increment the counter by clicking on a
button. The button will trigger code that adds 1 to the state and re-renders the view.

When you are ready, continue on to [03 - Update State](03-update-state-react.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
