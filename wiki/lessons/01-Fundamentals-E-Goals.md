# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Meiosis Goals

What are we trying to achieve?

We want to manage the data flow of our web applications with these principles:

_Single Source of Truth_: we have a single root model to represent the state of the application
at any point in time.

_View as a function_: we render the UI using a function of the model and some callbacks to signal
updates.

_Fractal architecture_:
  - A fractal architecture is possible, but not required.
  - We can build the UI with a tree components.
  - Each component may use other components.
  - The top component is no different from the other components.
  - Components may be reused in multiple parts of the component tree.
  - The glue code that assembles everything together is separate from the top-level component.

More about fractal architecture
[here](http://antontelesh.github.io/architecture/2016/03/16/fractal-architecture.html).

_Simple and scalable_:
  - Code can be broken up or kept together depending on the complexity of the application.
  - We can separate component code out into well-defined sections that each have a specific
  responsibility (model, updates, actions, views, etc.)
  - We can choose to keep all the component code together if the application is simple,
  or even as a matter of preference.

_Nested components_:
  - While we have a single root model, components may be nested within certain paths of the model
  and only be concerned with their own model.
  - Since components do not depend on the nested path where they reside within the top-level model,
  they can be moved around without changes to the component itself.
  - The parent component controls how the child component is nested. In turn, a parent component may
  be controlled by _its_ parent component.
  - A child component is not tied to its parent component. Instead, it is given callback functions
  to signal updates.

_Controlled model updates_:
  - Components signal updates by pushing model-changing functions onto a stream.
  - Thus, the top-level code is always aware of model updates. It automatically re-renders the view
  after each model update.
  - The [ initial model ] &rarr; [ render view ] &rarr; [ model update ] &rarr;
  [ re-render view ] is the reactive loop of our application.

### Up Next

This concludes the first part of the Meiosis tutorial. In the second part, we'll discuss
[reusable components](02-Reusable-Components-A-Reusing-Components.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
