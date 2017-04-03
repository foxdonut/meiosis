# Meiosis

[![Join the chat at https://gitter.im/foxdonut/meiosis](https://badges.gitter.im/foxdonut/meiosis.svg)](https://gitter.im/foxdonut/meiosis?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

http://meiosis.js.org

> _It's what you already love, only better._

## Do you Mei-O?

**Meiosis** is an architecture pattern to manage the data flow of your web applications. All you need is a simple
stream library such as [Flyd](https://github.com/paldepind/flyd) or [Mithril Stream](http://mithril.js.org/stream.html)
to implement the pattern. You do not need anything else, not even Meiosis itself. Add your favourite virtual dom
library (React, Mithril, Snabbdom, Inferno, Preact, etc.) and you are good to go.

Meiosis is more about the approach to managing the data flow rather than about the code in the library. That being said,
Meiosis does contain a simple event system that you may find useful. Further, Meiosis and be combined with
[Meiosis-Tracer](https://github.com/foxdonut/meiosis-tracer) to provide development-time tracing capabilities. This is a
nifty and useful tool to view what is going on in your application. You can trace back through snapshots of the model
and see the changes in the UI. You can also change the model directly in the tool to see the resulting UI, and, if you
are using events, simulate behaviour by triggering new events.

For documentation please refer to the [Meiosis Wiki](https://github.com/foxdonut/meiosis/wiki).

Try out the examples online: http://meiosis.js.org/examples.index.html

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
really is_, meaning that this library is meant to be small, humble, and not replace what people use,
just improve upon it; and
3. it's a relatively unique name in the JavaScript world, thus making it easy to find information
using search engines.

--

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
