# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-nested-components.html:Nested Components
@nav-setup-toc
@nav-next:setup-stream-implementation.html:Stream Implementation
@docs-nav-end

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

@docs-nav-start
@nav-prev:setup-nested-components.html:Nested Components
@nav-setup-toc
@nav-next:setup-stream-implementation.html:Stream Implementation
@docs-nav-end

