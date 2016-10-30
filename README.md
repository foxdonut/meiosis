# Meiosis

http://meiosis.js.org

> _It's what you already love, only better._

## Do you Mei-O?

**Meiosis** is a library and an architecture pattern for dividing web applications into small,
independent, manageable, and testable parts,
_while letting you keep using the tools that you already love._ Meiosis manages the data flow and
lets you choose whatever you like for rendering views.

For example, you can use [React](https://facebook.github.io/react/), [Inferno](https://github.com/trueadm/inferno),
[snabbdom](https://github.com/paldepind/snabbdom), [Mithril](http://mithril.js.org), [jQuery](http://jquery.com/),
[Handlebars](http://handlebarsjs.com), or no libraries at all and just plain vanilla JavaScript.

Developing a web application with Meiosis involves three simple concepts:

1. Have a single model object. It can be a plain JavaScript object. Whether it is mutable or immutable is up to you.
2. Write the view as a function of the model.
3. Have a way to _propose_ changes to the model. After the changes have been accepted, Meiosis re-renders the view by
calling the view function with the new model.

Meiosis is a small, simple library with no dependencies. It helps you build components with minimal effort, providing
an architecture to structure your code that scales well as your application gets larger and more complex.

You choose what you like to use for creating views. Meiosis organizes how the data flows in your application by:

- Creating and maintaining a _single root model_
- Letting you hook in functions that receive _proposals_ and change the model accordingly
- Passing action objects to your views so that they can trigger proposals
- Automatically re-rendering your views
- Letting you define logic for actions that should automatically trigger.

Meiosis is about managing the application data flow. Create components by specifying functions, and Meiosis takes care of the wiring. Every part of the process is optional, so you can specify what you need for each component.

For documentation please refer to the [Meiosis Guide](https://www.gitbook.com/book/foxdonut/meiosis-guide/).

Try out the examples online: http://meiosis.js.org/example-index.html

Example code: https://github.com/foxdonut/meiosis-examples

Please post questions and suggestions as Github issues on the [meiosis repository](https://github.com/foxdonut/meiosis).

You can also chat on the [Gitter channel](https://gitter.im/foxdonut/meiosis).

## Why the name _Meiosis_?

I picked the name **Meiosis** for three reasons:

1. it's a [biology term](http://en.wikipedia.org/wiki/Meiosis) for a type of cell division; this is
an analogy to the idea of dividing your application into smaller pieces;
2. it's a [figure of speech](https://en.wikipedia.org/wiki/Meiosis_(figure_of_speech) that
_intentionally understates something or implies that it is lesser in significance or size than it
really is_, meaning that this library is meant to be small, humble, and not replace what people use,
just improve upon it; and
3. it's a relatively unique name in the JavaScript world, thus making it easy to find information
using search engines.

--

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
