# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-typescript-support.html:TypeScript Support
@nav-setup-toc
@docs-nav-end

## Stream Implementation

By default, `meiosis-setup` uses its `simple-stream` implementation. If you are curious, see
[here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/source/src/simple-stream/index.ts)
for the source code.

You can use a different stream implementation. The following two stream libraries work
out-of-the-box:

- [Flyd](https://github.com/paldepind/flyd)
- [Mithril Stream](https://mithril.js.org/stream.html)

Use the `stream` property to specify the stream implementation that you want to use:

```js
// Using Flyd
import flyd from 'flyd'

const cells = setup({ stream: flyd });
```

```js
// Using Mithril Stream
import Stream from 'mithril/stream';

const cells = setup({ stream: Stream });
```

You can use any other stream library as long as you adapt it by providing an object with a `stream`
and a `scan` property, which indicate the functions to create a stream and to scan a stream. The
stream returned when creating a stream must have a `map` function.

```js
import someStream from 'some-stream-library';

const someStreamLib = {
  stream: someStream.createStream,
  scan: someStream.scan
};

const cells = setup({ stream: someStreamLib })
```

Adapting a different stream library is usually not necessary, since using either `simple-stream`,
`Flyd`, or `Mithril Stream` should be suitable.

@docs-nav-start
@nav-prev:setup-typescript-support.html:TypeScript Support
@nav-setup-toc
@docs-nav-end

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
