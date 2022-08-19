# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-patches.html:Patches
@nav-setup-ts-toc
@nav-next:setup-ts-view-library.html:View Library
@docs-nav-end

## Initial State

When calling `meiosisSetup`, you can specify an `app`, with the following properties, all of which
are optional:

- `initial`
- `services`
- `nested`

We will look at each of these separately, starting with `initial`.

By default, the initial state is an empty object, `{}`. To specify a different initial state, use
the `initial` property of `app`.

With TypeScript, `app` is of type `MeiosisComponent`, which we can import from
`'meiosis-setup/types'`. By indicating our `State` type, our `app`'s initial state will be
validated.

```ts
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent } from 'meiosis-setup/types';

interface State {
  name: string;
  age: number;
}

const app: MeiosisComponent<State> = {
  initial: {
    age: 25
  }
};

const cells = meiosisSetup<State>({ app });
```

By specifying the `MeiosisComponent` type on our `app` object, it will be validated and we can also
benefit from auto-suggest on the properties (`initial`, `services`, etc.)

In the example below, try the following in the `initial` object, which should result in an error:

- Specify a property that does not exist on the `State` type.
- Specify a value that does not match the type, for example a `string` on the `age` property.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples/snippets?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/initial.ts" style="width:100%;height:500px"></iframe>


@docs-nav-start
@nav-prev:setup-ts-patches.html:Patches
@nav-setup-ts-toc
@nav-next:setup-ts-view-library.html:View Library
@docs-nav-end
