# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | |
| ---- | ---- |
| [&larr; TypeScript Support](setup-typescript-support.html) | [&#8673; Table of Contents](setup-toc.html) |

## Stream Implementation

By default, `meiosis-setup` uses its `simple-stream` implementation. You can use a different stream
implementation. For example, these work out-of-the-box:

- [Flyd](https://github.com/paldepind/flyd)
- [Mithril Stream](https://mithril.js.org/stream.html)

Use the `stream` property to specify the stream implementation that you want to use. For example:

```js
import flyd from 'flyd'

const cells = setup({ stream: flyd });
```

```js
import Stream from 'mithril/stream';

const cells = setup({ stream: Stream });
```

You can use any other stream library as long as you adapt it by providing an object with a `stream`
and a `scan` property, which indicate the functions to create a stream and to scan a stream:

```js
import someStream from 'some-stream-library';

const someStreamLib = {
  stream: someStream.createStream,
  scan: someStream.scan
};

const cells = setup({ stream: someStreamLib })
```

Also, the stream returned when creating a stream must have a `map` function.

Adapting a different stream library is usually not necessary, since using either `simple-stream`,
`Flyd`, or `Mithril Stream` should be suitable.

| | |
| ---- | ---- |
| [&larr; TypeScript Support](setup-typescript-support.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
