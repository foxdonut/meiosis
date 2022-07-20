# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | | |
| ---- | ---- | ---- |
| [&larr; Nested Components](setup-nested-components.html) | [&rarr; Stream Implementation](setup-stream-implementation.html) | [&#8673; Table of Contents](setup-toc.html) |

## TypeScript Support

`meiosis-setup` provides TypeScript support so that you can have type checking, auto-suggest, and
other TypeScript features in your Meiosis code.

### State Type

The first thing we need to do is to define a type for our application state.

```ts
interface State {
  name: string;
  age: number;
}
```

Then, we can set up Meiosis as follows:

```ts
import setup from 'meiosis-setup/mergerino';

const cells = setup<State>();
```

### Example

This
[example](https://codesandbox.io/s/meiosis-setup-typescript-example-6ppbqk?file=/src/index.ts).

[TypeScript API documentation is here.](ts-docs/index.html)

| | | |
| ---- | ---- | ---- |
| [&larr; Nested Components](setup-nested-components.html) | [&rarr; Stream Implementation](setup-stream-implementation.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
