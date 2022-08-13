# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-installation.html:Installation
@nav-setup-ts-toc
@nav-next:setup-ts-initial-state.html:Initial State
@docs-nav-end

## Patches

In the Meiosis Documentation, the Meiosis pattern is setup up either with
[Function Patches](https://meiosis.js.org/docs/04-meiosis-with-function-patches.html) or
[Mergerino](https://meiosis.js.org/docs/05-meiosis-with-mergerino.html). The idea is that using
Function Patches gives you the option of having one less library dependency.

On the other hand, `meiosis-setup` takes a "ready-to-use" approach and includes Mergerino as a
dependency. Since Mergerino handles Function Patches, there is no need to choose between the two
when setting up Meiosis with `meiosis-setup`. You can use Function Patches and/or Mergerino as you
please:

```js
import { meiosisSetup } from 'meiosis-setup';

interface State {
  // your application state type
}

const cells = meiosisSetup<State>();
cells().update(...); // Function Patch or Mergerino works
```

### State Type

Since we are using TypeScript, we'll want to define a type for our application state to get the most
out of what TypeScript offers.

Let's say we have a `State` type as shown below:

```ts
interface State {
  name: string;
  age: number;
}
```

Then, after setting up Meiosis:

```ts
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup<State>();

const cell = cells();
```

We now have a stream of cells with each cell having `state` of type `State` and having `update`
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

@docs-nav-start
@nav-prev:setup-ts-installation.html:Installation
@nav-setup-ts-toc
@nav-next:setup-ts-initial-state.html:Initial State
@docs-nav-end
