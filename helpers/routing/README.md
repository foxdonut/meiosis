# meiosis-routing

**PLEASE NOTE** that this is work-in-progress.

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to
popular demand and for your convenience, here are some reusable snippets of code that help
setup and use Meiosis. This module provides support for routing in two modules:

- `state`: provides functions that help manage routing state
- `routerHelper`: provides support for configuring routes and creating a router.
Out-of-the-box support is provided for these router libraries:

    - [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
    - [url-mapper](https://github.com/cerebral/url-mapper)
    - [Mithril Router](https://mithril.js.org/route.html)

You can also plug in another router library of your choice.

## Benefits!

Meiosis Routing gives you _programmable routes_ which you manage in application state, with the
following benefits:

Using the Meiosis Routing strategy gives you the following benefits:

- Simple route configuration
- No hardcoded paths in links
- Parent and child routes, and reusable child routes
- Relative navigation: navigate to a parent, sibling, or child route
- Redirect to a route after an action
- Authenticate / authorize before going to a route
- Load data (synchronously or asynchronously) when arriving at a route
- Clean up state when leaving a route
- Trigger arriving and leaving a route based on route and query parameters
- Prevent leaving a route to e.g. warn user of unsaved data

Because routing is managed in application state, you don't need a complex router with support for
all of the above. The actual router is just a thin layer that matches URLs to routes. You can use
one of the routers mentioned above, or plug in your own.
[feather-route-matcher](https://github.com/henrikjoreteg/feather-route-matcher) is a nice example
of how you only need a lightweight router library.

## Installation

Using `npm`:

```
npm i meiosis-routing
```

Using a `script` tag:

```
<script src="https://unpkg.com/meiosis-routing"></script>
```

Using the `script` tag exposes a `Meiosis` global, under which the helper functions are
provided:

- `state.*`
- `routerHelper.*`

## Using `meiosis-routing`

Documentation is forthcoming.

## Credits

Many thanks to [Stephan Thon](https://github.com/smuemd) for experimenting with early versions,
testing and reporting bugs, and providing feedback and suggestions. Your help is very valuable
and much appreciated!

----

_meiosis-routing is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._

