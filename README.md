# Meiosis

[![Join the chat at https://gitter.im/foxdonut/meiosis](https://badges.gitter.im/foxdonut/meiosis.svg)](https://gitter.im/foxdonut/meiosis?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

https://meiosis.js.org

> It's not a library. It's a simple pattern to manage state in your web applications.

Think Redux, MobX, Cerebral, React Context, etc. but without having library imports everywhere and
being tied to a framework API. Instead, just plain functions and objects.

All you need is a simple stream library such as Flyd or Mithril Stream in one place to implement
the pattern. You do not need anything else, not even Meiosis itself. You could even implement the
stream yourself with a handful of lines of code. Zero dependencies!

Easily use the pattern with your favourite virtual dom library (React, Mithril, Snabbdom,
Inferno, Preact, domvm) or even lit-html, hyperHTML, etc.

## Ready to have a closer look?

→ Read the [Meiosis Tutorial](https://meiosis.js.org/tutorial/toc.html) to get started.

→ Read the [Documentation](https://meiosis.js.org/docs/toc.html) to learn more techniques.

## Ready for More?

- Try out more [examples](https://meiosis.js.org/examples.html).
- Check out the [Meiosis-Tracer](https://github.com/foxdonut/meiosis-tracer).
- Chat on the [Gitter channel](https://gitter.im/foxdonut/meiosis).

Please post questions and suggestions as Github issues on the
[Meiosis repository](https://github.com/foxdonut/meiosis).

## Why the name _Meiosis_?

I picked the name **Meiosis** for three reasons:

1. it's a [biology term](http://en.wikipedia.org/wiki/Meiosis) for a type of cell division; this is
an analogy to the idea of dividing your application into smaller pieces;
2. it's a [figure of speech](https://en.wikipedia.org/wiki/Meiosis_(figure_of_speech) that
_intentionally understates something or implies that it is lesser in significance or size than it
really is_, meaning that this is meant to be small, humble, and not replace what people use,
just improve upon it; and
3. it's a relatively unique name in the JavaScript world, thus making it easy to find information
using search engines.

----

## Credits

Meiosis is the result of a whole adventure of exploring other architectures. Credit goes to their authors; I am grateful
for their work and that of their respective communities.

- [CycleJS driven by state](http://www.christianalfoni.com/articles/2016_04_06_CycleJS-driven-by-state)
by [Christian Alfoni](http://www.christianalfoni.com/). This article was very inspirational to me and
I am very grateful to Christian! I also find Christian's other projects very interesting, including
(but not limited to) [Cerebral](http://cerebraljs.com) and
[function-tree](https://github.com/cerebral/cerebral/tree/master/packages/function-tree#readme).

- The [SAM pattern](http://sam.js.org/) by
[Jean-Jacques Dubray](http://www.ebpml.org/about). There are some very sound principles to the SAM
pattern, and I very much appreciate discussing and learning from Jean-Jacques as he is always gracious
and willing to share his knowledge and experience.

- [Simon Friis Vindum](https://twitter.com/paldepind), creator of
[Flyd](https://github.com/paldepind/flyd),
[Snabbdom](https://github.com/snabbdom/snabbdom), and others. I use Flyd as a stream library for Meiosis.

- [Mithril](http://mithril.js.org) and its fantastic community. Special thanks to
[James Forbes](https://twitter.com/james_a_forbes) for all the help, sharing your knowledge, and
discussing ideas!

- [Vesa Karvonen](https://twitter.com/VesaKarvonen), creator of
[partial.lenses](https://github.com/calmm-js/partial.lenses) and
[Calmm](https://github.com/calmm-js/documentation).

- [The Elm Architecture](http://guide.elm-lang.org/architecture/index.html), by
[Evan Czaplicki](http://evan.czaplicki.us/home).

- [Redux](http://redux.js.org/), by
[Dan Abramov](https://github.com/gaearon).

- [hyperapp](https://github.com/hyperapp/hyperapp), by
[Jorge Bucaran](https://twitter.com/jbucaran).

- [CycleJS](http://cycle.js.org/), by
[André Staltz/Medeiros](http://staltz.com/).

- Other reactive Libraries such as
[RxJS](https://github.com/ReactiveX/rxjs),
[Kefir](https://rpominov.github.io/kefir/),
[most](https://github.com/cujojs/most), and
[Bacon.js](https://baconjs.github.io/).

----

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
