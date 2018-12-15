# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 02 - View Function

In the previous lesson, [01 - Hello World](01-hello-world-mithril.html), we rendered a simple,
**static** message onto the page. Now, let's pass data to the Mithril component so that we can
**dynamically** produce what to render, based on the application state, or simply **state**.

### View = function(vnode)

In a Mithril component, The `view` function produces what to render. Since it is a function,
it can receive parameters - namely, it receives a [vnode](https://mithril.js.org/vnodes.html).
We can pass state to a component and receive it via the vnode.

In our example below, the state is a counter. We'll create an **initial** state with a value of
`0`. When rendering with `m.mount`, we pass a component that in turn renders our `App` component
and passes a `state` attribute with a value of `0`.

![The View Function](02-view-function-01.svg)

Within the `view` function, we can use `vnode.attrs` to read the attributes that were passed in.
In this case, we are simply creating a `div` element with the text `Counter:` and the value that
was passed in the `state` attribute:

@flems mithril/02-view-function.js,app.html,app.css mithril

We now have a component that uses state, which is passed in as an attribute.

### Exercises

1. Try changing what you pass in as the `state` attribute, and seeing the results.
1. For the `App` component, change the `view` function so that it produces something different.
1. Instead of passing a plain number as the `state` attribute, try passing in an object such as
`{ label: "The Counter", value: 0 }`. Change the `view` function so that it uses the
state to produce the view.

### Solution

@flems mithril/02-view-function-solution.js,app.html,app.css mithril 500 hidden

In the next lesson, we will learn how to let the user increment the counter by clicking on a
button. The button will trigger code that adds 1 to the state and re-renders the view.

When you are ready, continue on to [03 - Update State](03-update-state-mithril.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
