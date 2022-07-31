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

For example, with Mithril:

@flems {"files":"code/setup-view-library-mithril.js,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,mithril,mergerino","middle":65}

With Preact:

@flems {"files":"code/setup-view-library-preact.jsx,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,preact,mergerino","middle":65}

With React:

@flems {"files":"code/setup-view-library-react.jsx,app.html,public/css/bootstrap-simplex.min.css,public/css/style.css","libs":"meiosis-setup,react,react-dom,mergerino","middle":65}

@docs-nav-start
@nav-prev:setup-initial-state.html:Initial State
@nav-setup-toc
@nav-next:setup-services.html:Services
@docs-nav-end

