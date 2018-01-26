# Meiosis

[![Join the chat at https://gitter.im/foxdonut/meiosis](https://badges.gitter.im/foxdonut/meiosis.svg)](https://gitter.im/foxdonut/meiosis?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

http://meiosis.js.org

> Meiosis is not a library. It's a simple pattern.

## Do you Mei-O?

**Meiosis** is an architecture pattern to manage the data flow of your web applications. All you need is a simple
stream library such as [Flyd](https://github.com/paldepind/flyd) or [Mithril Stream](http://mithril.js.org/stream.html)
to implement the pattern. Or, you could implement the pattern yourself with just a few lines of code. You do not need
anything else, not even Meiosis itself. Add your favourite virtual dom
library (React, Mithril, Snabbdom, Inferno, Preact, etc.) and you are good to go.

Meiosis is an approach to managing the data flow of your web application _that frees you from being tied to a library API._

Meiosis does provide code to be combined with
[Meiosis-Tracer](https://github.com/foxdonut/meiosis-tracer)
during development. This is a nifty and useful tool to view what is
going on in your application. You can trace back through snapshots of the model and see the changes
in the UI. You can also change the model directly in the tool to see the resulting UI, and, if you
are using events, simulate behaviour by triggering new events.

For documentation please refer to the [Meiosis Wiki](https://github.com/foxdonut/meiosis/wiki).

Try out the examples online: http://meiosis.js.org/examples.html

Example code: https://github.com/foxdonut/meiosis-examples

Please post questions and suggestions as Github issues on the [Meiosis repository](https://github.com/foxdonut/meiosis).

You can also chat on the [Gitter channel](https://gitter.im/foxdonut/meiosis).

**Please note** that Meiosis v0.9.x has been archived and is still available for reference purposes
[here](http://meiosis.js.org/v0.9.x).

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
pattern, and I very much appreciate discussing and learning from Jean-Jacques as he is always gratious
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
