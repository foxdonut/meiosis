# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-empty
@nav-toc
@nav-next:02-initial-state-and-actions.html:Initial State and Actions
@docs-nav-end

## Introduction and Goals

Welcome to the [Meiosis](https://meiosis.js.org) Documentation!

The purpose of this documentation is to explain the Meiosis pattern from the ground up, hopefully
without assuming too much prior knowledge beyond the basics of JavaScript.

<a name="high_level_goals"></a>
### [High Level Goals](#high_level_goals)

Meiosis is a simple pattern for managing application state. The idea is to have a single, top-level
object that represents the state of your application, and having a straightforward way to update
that state. Views are rendered according to the state, and trigger actions to update the state.
That's it!

Alongside that, Meiosis aims to free your state management code from being deeply tied to complex
libraries or frameworks. When using Meiosis, you manage your application state with plain objects
and functions.

<a name="prerequisites"></a>
### [Prerequisites](#prerequisites)

Besides JavaScript, you will need to know, or learn, about the view library that you would like to
use. Most of this documentation is independent of the view library. When we put it all together,
there are examples with [Mithril](https://mithril.js.org), [Preact](https://preactjs.com), and
[React](https://reactjs.org).

If none of those is your preferred view library, fear not. It is straightforward to use just about
any view library with the Meiosis pattern.

<a name="es5_or_es6"></a>
### [JavaScript ES5 or ES6](#es5_or_es6)

I previously used ES5 syntax in the code examples, but have since updated the documentation and use
ES6 syntax.

<a name="embedded_code_examples"></a>
### [Embedded Code Examples](#embedded_code_examples)

The best way to learn is to practice. So, all code examples in this documentation are embedded into
the page using [Flems](https://github.com/porsager/flems), so that you can edit the code and see the
results right there on the page. In fact, I strongly encourage you to try things out with the code.
This will help you understand how things work.

You can edit and run the code within the page, or you can also open the code in a new, full-sized
page if that is more comfortable. You can do so using the
![Open Flems in new window](flems-open-in-new-window.png) at the top-right corner of the code
window.

Let's get started.

@docs-nav-start
@nav-empty
@nav-toc
@nav-next:02-initial-state-and-actions.html:Initial State and Actions
@docs-nav-end
