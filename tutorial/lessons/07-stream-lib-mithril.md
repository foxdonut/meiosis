# Meiosis Tutorial

[Table of Contents](toc.html)

## 07 - Stream Library

In the previous lesson, [06 - Scan](06-scan-mithril.html), we improved our `stream` implementation
by supporting an initial value, and we implemented `scan`. With `scan` being a great fit for our
reactive loop, we used it for our setup code.

### Use a stream library or your own implementation - it's your choice!

Hopefully, having implemented a simple stream with `map` and `scan` has solidified your
understanding of how to use them to set up the Meiosis pattern.

In doing so, we've also seen how you can implement the Meiosis pattern without any dependencies,
with just a handful of lines of code.

That being said, you can also use a stream library. It's your choice. In this lesson, we will
use [mithril-stream](https://mithril.js.org/stream.html). Another good choice is
[flyd](https://github.com/paldepind/flyd), which works the same way. You can also use another
stream library simply by using its equivalent of `map`, `scan`, and pushing a value onto a
stream.

### Using `mithril-stream`

The example below uses [mithril-stream](https://mithril.js.org/stream.html). The equivalent
of our `stream` and `scan` functions are `m.stream` and `m.stream.scan` respectively. The `map`
method works the same way.

The code also implements a solution to the exercise at the end of the
[previous lesson](06-scan-mithril.html), pushing objects onto the `update` stream and handling
them in the accumulator function.

@flems mithril/07-stream-lib.js,app.html,app.css mithril,mithril-stream 800

As you can see, the streams work the same way as before. So, it's really up to your preference
whether to use a stream library or use your own implementation.

When you are ready, continue on to [08 - Accumulator](08-accumulator-mithril.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
