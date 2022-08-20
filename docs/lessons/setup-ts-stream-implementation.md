# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-nested-components.html:Nested Components
@nav-setup-ts-toc
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

@docs-nav-start
@nav-prev:setup-ts-nested-components.html:Nested Components
@nav-setup-ts-toc
@docs-nav-end
