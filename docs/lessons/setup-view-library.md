# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-initial-state.html:Initial State
@nav-setup-toc
@nav-next:setup-services.html:Services
@docs-nav-end

## View Library

Once Meiosis is set up either with Function Patches or Mergerino, you have a stream of **cells**.
Each cell has `state` and `update` to read the state and update the state. Normally you use
`cells.map` to render the view on each state change.

### Mithril

Here is the setup code for Mithril:

@flems {"files":"code/setup-view-library-mithril.js,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,mithril,mergerino","middle":65}

In the setup above, `m.redraw()` is called for every state change. This may or may not be acceptable
depending in the application. If the application triggers many state changes very rapidly (such as
tracking the mouse), it is preferable to remove the `m.redraw()` code:

```js
cells.map(() => m.redraw());
```

Redraws will still happen by virtue of Mithril's
[auto-redraw system](https://mithril.js.org/autoredraw.html). However, they will **not** happen for
state changes outside of the auto-redraw system. For those state changes, `m.redraw()` needs to be
called after updating the state.

### Preact:

Here is the setup code for Preact:

@flems {"files":"code/setup-view-library-preact.jsx,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,preact,mergerino","middle":65}

### React:

Here is the setup code for React:

@flems {"files":"code/setup-view-library-react.jsx,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,react,react-dom,mergerino","middle":65}

@docs-nav-start
@nav-prev:setup-initial-state.html:Initial State
@nav-setup-toc
@nav-next:setup-services.html:Services
@docs-nav-end

