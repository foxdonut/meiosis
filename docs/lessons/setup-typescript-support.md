# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-nested-components.html:Nested Components
@nav-setup-toc
@nav-next:setup-stream-implementation.html:Stream Implementation
@docs-nav-end

## TypeScript Support

> This section is work-in-progress.

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
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup<State>();
```

Now, we have a stream of cells with each cell having `state` of type `State` and having `update`
taking patches that must be compatible with `State`.

In the example below, you can experiment with TypeScript support. Try the following:

- On the line with `cell.state`, add a dot (.) `after` state and see the auto-suggested properties,
`name` and `age`.
- Uncomment the line `cell.update({ invalid: true });` and see the patch in error since `'invalid'`
  is not a property of `State`.
- Uncomment the line `cell.update({ age: 'not valid'});` and see the patch in error since
  `'not valid'` is not a `number`.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/basic.ts" style="width:100%;height:500px"></iframe>

[TypeScript API documentation is here.](ts-docs/index.html)

@docs-nav-start
@nav-prev:setup-nested-components.html:Nested Components
@nav-setup-toc
@nav-next:setup-stream-implementation.html:Stream Implementation
@docs-nav-end

