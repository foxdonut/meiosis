# Meiosis Tutorial

[Table of Contents](toc.html)

## 03 - Update Model

In the previous lesson, [02 - View Function](02-view-function-react.html), we created a `view`
function that produces the vnode according to the `model` that is passed to the function.

So, we can call `view(model)` and render it onto the page. Now, how do we make a change to the
model and refresh the view?

Our model is a counter that has a value of `0`. Let's add a button to increase the counter.

### DOM Event Handler Functions

We can add a `+1` button with this code:

```html
<button onClick={increase}>+1</button>
```

It is important to remember that what we associate to `onClick` must be a **function**. This
function will automatically be called when the user clicks on the button, and the function gets
passed a DOM event as a parameter. Here, the function is `increase`:

```js
var increase = function(_event) {
  model = model + 1;
  ReactDOM.render(view(model), element);
};
```

> **Note:** the `increase` function does not need to do anything with the DOM event. So, `increase`
could have been a function with no parameters. For clarity, I included the event parameter in
the function declaration, prefixed with an underscore to indicate that the parameter is not
used.

### Updating the Model and Re-rendering the View

As you can see in the code above, the `increase` function updates the model by adding 1 to the
value. Then, it re-renders the view by calling `ReactDOM.render` again.

![The onclick Function](03-update-model-02.svg)

> **Note:** you might wonder about rebuilding the whole view and re-rendering it when something
changes. Generally speaking, producing a vnode is not a performance concern. Further, re-rendering
the view is what virtual-DOM libraries are good at: figuring out what minimal changes are needed to
make the real DOM reflect the view.

You can see the working code below:

@flems react/03-update-model.jsx,app.html,app.css react,react-dom 550

### Exercises

1. As in the [previous lesson](02-view-function-react.html), try passing in an object such as
`{ label: "The Counter", value: 0 }` as the model. Change the `view` function so that it uses the
model to produce the view, and change the `increase` function so that it increases the model value.
1. Add a `-1` button that decreases the value by 1.

When you are ready, continue on to [04 - Update Function](04-update-function-react.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
