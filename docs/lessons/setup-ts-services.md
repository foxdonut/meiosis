# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-view-library.html:View Library
@nav-setup-ts-toc
@nav-next:setup-ts-nested-components.html:Nested Components
@docs-nav-end

## Services

To set up Meiosis with Services (explained in the Meiosis Documentation:
[reference](https://meiosis.js.org/docs/08-services.html)), use the `services` property of `app`.

Each service is an object with a `run` function and, optionally, an `onchange` function.
`meiosis-setup` automatically wires up services, calling `onchange` (if defined) and calling `run`
only when the value returned by `onchange` changes.

We can use the `Service` type for services. This will auto-suggest and validate the properties of a
service (`onchange`, `run`) and automatically type the function parameters.

```ts
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent, Service } from 'meiosis-setup/types';

interface State {
  name: string;
  age: number;
  status: string;
  data: string;
}

const service: Service<State> = {
  onchange: (state) => state.age,
  // run is called only when age changes, thus avoiding infinite loops
  run: (cell) => {
    cell.update({ status: cell.state.age >= 21 ? 'adult' : 'minor' });
  }
};

const app: MeiosisComponent<State> = {
  services: [service]
};

const cells = meiosisSetup<State>({ app });
```

If a service does not have an `onchange` function, its `run` function will be called for every state
change. Thus we must make sure to avoid an infinite loop:

```ts
const service: Service<State> = {
  run: (cell) => {
    if (cell.state.data === undefined) {
      loadData().then(data => {
        cell.update({ data });
      })
    }
  }
}
```

Below, you can see TypeScript support for services in action:

- Invalid properties cannot be specified on the `service` object.
- The `state` parameter on the `onchange` function, as well as the `cell` parameter on the `run`
  function, are automatically typed.
- An invalid service object, such as `{}`, cannot be specified in the `services` array.

<iframe src="https://stackblitz.com/github/foxdonut/meiosis/tree/master/helpers/setup/examples?embed=1&terminalHeight=0&ctl=1&view=editor&file=src/ts/support/services.ts" style="width:100%;height:500px"></iframe>

Services can also be nested using nested components, which we will look at next.

@docs-nav-start
@nav-prev:setup-ts-view-library.html:View Library
@nav-setup-ts-toc
@nav-next:setup-ts-nested-components.html:Nested Components
@docs-nav-end
