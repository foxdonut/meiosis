# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Using Lifecycle Methods, and Stateful/3rd Party Components

In this section, we look at using a virtual-DOM library's lifecycle methods, and stateful /
3rd party components. We'll look at two examples. Please jump to the section that you are
interested in. If you are working with a different virtual-DOM library, either section should
still be useful and easy to adapt to the library that you are using.

1. [React](#lifecycle_react)
1. [Mithril](#lifecycle_mithril)

<a name="lifecycle_react"></a>
### React

Using lifecycle methods in React can be useful for using third-party components that are not
designed to work with virtual-DOM libraries, but rather (for example) jQuery.

In this example, we are using
[this jQuery datepicker plugin](https://fengyuanchen.github.io/datepicker/).

Additionally, some third-party components _are_ designed to work with React, but manage their own
internal state using `setState`. It should not be a problem to use such components. Hopefully they
provide a way to retrieve the relevant data out of the component. In our example, we'll write our
own component as a proof of concept.

Looking at the example below, you will find `EntryNumber`, a component that uses React's `setState`
to manage its internal state, and provides a hook to retrieve the entry number. Using other stateful
React components should work in a similar way.

You will also find `createEntryDate` which uses the jQuery datepicker plugin. React lifecycle
methods and `ref` are used to integrate the plugin.

Neither of these techniques are specific to Meiosis; they are standard React practices. Hopefully,
this example gives you a good idea of how to use them. The full example is below:

@flems code/05-Techniques-and-Strategies/A-Using-Lifecycle/index-react.jsx,app.html,public/css/bootstrap.min.css,public/css/style.css,public/css/datepicker.min.css react,react-dom,flyd,lodash,jquery,datepicker 800 70

<a name="lifecycle_mithril"></a>
### Mithril

Using lifecycle methods in Mithril can be useful for using third-party components that are not
designed to work with virtual-DOM libraries, but rather (for example) jQuery.

In this example, we are using
[this jQuery datepicker plugin](https://fengyuanchen.github.io/datepicker/).

Additionally, some third-party components _are_ designed to work with Mithril, but manage their own
internal state and rely on the autoredraw mechanism provided by `m.mount`. We can use this method
instead of `m.render`, as we'll see below. We'll write our own component as a proof of concept.

Looking at the example below, you will find `createEntryNumber`, which creates a Mithril component
that manages its internal state, and provides a function to retrieve the entry number. Using other
Mithril components should work in a similar way.

You will also find `createEntryDate` which uses the jQuery datepicker plugin. Mithril lifecycle
methods are used to integrate the plugin.

Neither of these techniques are specific to Meiosis; they are standard Mithril practices.
Hopefully, this example gives you a good idea of how to use them. The full example is below:

@flems code/05-Techniques-and-Strategies/A-Using-Lifecycle/index-mithril.js,app.html,public/css/bootstrap.min.css,public/css/style.css,public/css/datepicker.min.css mithril,mithril-stream,patchinko,jquery,datepicker 800 70

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
