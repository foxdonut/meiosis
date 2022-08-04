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

Then, we can set up Meiosis with TypeScript as follows:

```ts
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup<State>();

const cell = cells();
```

Now, we have a stream of cells with each cell having `state` of type `State` and having `update`
taking patches that must be compatible with `State`.

In the example below, you can experiment with TypeScript support. Try the following:

- On the line with `cell`, add a dot (.) after `cell` and see the auto-suggested `cell` properties.
- On the line with `cell.state`, add a dot (.) after `state` and see the auto-suggested properties,
`name` and `age`.
- Uncomment the line `cell.update({ invalid: true });` and see the patch in error since `'invalid'`
  is not a property of `State`.
- Uncomment the line `cell.update({ age: 'not valid'});` and see the patch in error since
  `'not valid'` is not a `number`.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/basic.ts" style="width:100%;height:500px"></iframe>

### Initial State

To indicate the initial state, we use the `initial` property of an `app` object that we pass to
`meiosisSetup()`.

With TypeScript, `app` is of type `MeiosisComponent`, which we can import from
`'meiosis-setup/types'`. By indicating our `State` type, our `app`'s initial state will be
validated.

```ts
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent } from 'meiosis-setup/types';

const app: MeiosisComponent<State> = {
  initial: {
    age: 25
  }
};

const cells = meiosisSetup<State>({ app });
```

In the example below, try the following in the `initial` object, which should result in an error:

- Specify a property that does not exist on the `State` type.
- Specify a value that does not match the type, for example a `string` on the `age` property.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/initial.ts" style="width:100%;height:500px"></iframe>

### Services

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/services.ts" style="width:100%;height:500px"></iframe>

### Nested Cells

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/nested-cells.ts" style="width:100%;height:500px"></iframe>

### Nested Components

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/nested-components.ts" style="width:100%;height:500px"></iframe>

### API Documentation

[TypeScript API documentation is here.](ts-docs/index.html)

@docs-nav-start
@nav-prev:setup-nested-components.html:Nested Components
@nav-setup-toc
@nav-next:setup-stream-implementation.html:Stream Implementation
@docs-nav-end

