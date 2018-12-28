# [Meiosis](https://meiosis.js.org) Tutorial

[Next >](02-initial-state-and-actions.html) | [Table of Contents](toc.html)

## 01 - Introduction and Goals

Welcome to the [Meiosis](https://meiosis.js.org) Tutorial!

The purpose of this tutorial is to explain the Meiosis pattern from the ground up, hopefully
without assuming too much prior knowledge beyond the basics of JavaScript.

### High Level Goals

Meiosis is a simple pattern for managing application state. The idea is to have a single,
top-level object that represents the state of your application, and having a straightforward
way to update that state. Views are rendered according to the state, and trigger actions
to make changes to the state. That's it!

Alongside that, Meiosis aims to free your state management code from being deeply tied to
complex libraries or frameworks. When using Meiosis, you manage your application state with
plain objects and functions.

### Prerequisites

Besides JavaScript, you will need to know, or learn, about the view library that you would
like to use. Most of this tutorial is independent of the view library. When we put it all
together, there are examples with [React](https://reactjs.org),
[Mithril](http://mithril.js.org), [Preact](https://preactjs.com), and
[lit-html](https://meiosis.js.org/examples/setup/lit-html/index.html).

If none of those is your preferred view library, fear not! It is trivial to use just about
any view library with the Meiosis pattern.

### ES5 or ES6

I purposely used ES5 syntax in the code examples so that readers who are not familiar with ES6
could benefit from the tutorial, without requiring ES6 knowledge. If you prefer ES6, by all means
go ahead and use it! It can certainly lead to more concise syntax in some cases.

There are a few exceptions, however. Sometimes I use this syntax:

```javascript
() => someFunction(1)
x => x + 1
```

Which is shorthand for:

```javascript
function() {
  return someFunction(1);
}

function(x) {
  return x + 1;
}
```

Also, know that this:

```javascript
var { foo, bar } = props;
```

is shorthand for:

```javascript
var foo = props.foo;
var bar = props.bar;
```

Finally, this:

```javascript
{ foo, bar }
```

is short for:

```javascript
{ foo: foo, bar: bar }
```

Meiosis documentation and examples outside of this tutorial use ES6 syntax.

### Embedded Code Examples

The best way to learn is to practice! So, all code examples for this tutorial are embedded
into the page using [Flems](https://github.com/porsager/flems), so that you can edit the
code and see the results right there in the page. In fact, I strongly encourage you to try
things out with the code, this will help you understand how things work.

You can edit and run the code within the page, or you can also open the code in a new,
full-sized page if that is more comfortable. You can do so using the
![Open Flems in new window](flems-open-in-new-window.png) at the top-right corner of the
code window.

Finally, also note that you can also download and run the code examples for this tutorial
by cloning the [github repository](https://github.com/foxdonut/meiosis).

Let's get started! Please continue on to
[02 - Initial State and Actions](02-initial-state-and-actions.html).

[Next >](02-initial-state-and-actions.html) | [Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
