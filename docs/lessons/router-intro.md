# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Using a Router - Intro

The sections under "Using a Router" show how we can use a router with Meiosis. These sections are a
different approach than [Meiosis Routing](routing.html), which is a library and pattern for using
route segments and transitions to manage routes. This "Using a Router" pattern is simpler and meant
to be set up yourself with about 20 to 60 lines of code, according to the needs of your application.

Each section under "Using a Router" shows a way to set up a router pattern. You only need to use the
approach that matches your needs. There is no right or wrong approach. Obviously, you can take one
of the setups and tweak it according to your requirements.

Instead of re-inventing the wheel, a router library is used to do the work of matching URLs to route
paths. You can use a different library by adjusting the pattern setup code to match how your chosen
library works. The following router libraries are used in the examples of this documentation:

- [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
- [Mithril Router](https://mithril.js.org/route.html)
- [Superouter](https://gitlab.com/harth/superouter)

Here is a summary of the approaches:

- [Basic Pattern Setup](router-setup.html): introduces the pattern and provides a minimal setup that
  uses [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher) and hardcoded
  paths in `href`s and actions.
- [Query String Support](router-query-string.html): builds on the Basic Pattern Setup and adds
  support for using [query strings](https://en.wikipedia.org/wiki/Query_string).
- [`toPath` Function](router-to-path.html): provides a `toPath` function for building paths in
  `href`s and actions instead of hardcoding them.
- [Mithril Router](router-mithril.html): shows how to set up the pattern with
  [Mithril Router](https://mithril.js.org/route.html), in case you are already using Mithril and
  want to use its router instead of a separate router library.
- [Static Tagged Union](router-static-tagged-union.html): shows how to use
  [tagged unions](https://en.wikipedia.org/wiki/Tagged_union) with routes, using the
  [static-tagged-union](https://github.com/foxdonut/static-tagged-union) library.
- [Superouter](router-superouter.html): shows how to use
  [Superouter](https://gitlab.com/harth/superouter), which is a router library with built-in support
  for using [tagged unions](https://en.wikipedia.org/wiki/Tagged_union) with routes.

Each setup is ready to use, so have a look and pick the setup that most closely matches your
requirements. This mostly comes down to:

- Do you need to use [query strings](https://en.wikipedia.org/wiki/Query_string)?
- Do you prefer to use hardcoded paths (this is easier) or a `toPath` function (this is more
  robust and resilient to changes)?
- Do you want to use [Mithril Router](https://mithril.js.org/route.html) instead of a separate
  router library?
- Do you want to use [tagged unions](https://en.wikipedia.org/wiki/Tagged_union) with routes (this
  is also more robust and resilient to changes)?

Let's get started by having a look at the [Basic Pattern Setup](router-setup.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
