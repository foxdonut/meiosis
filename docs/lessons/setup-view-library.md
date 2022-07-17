# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | | |
| ---- | ---- | ---- |
| [&larr; Initial State](setup-initial-state.html) | [&rarr; Services](setup-services.html) | [&#8673; Table of Contents](setup-toc.html) |

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

| | | |
| ---- | ---- | ---- |
| [&larr; Initial State](setup-initial-state.html) | [&rarr; Services](setup-services.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
