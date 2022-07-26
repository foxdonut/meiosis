# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-installation.html:Installation
@nav-setup-toc
@nav-next:setup-initial-state.html:Initial State
@docs-nav-end

## Function Patches or Mergerino

In the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/04-meiosis-with-function-patches.html)), use the following
code:

```js
import meiosisSetup from 'meiosis-setup/functionPatches';

const cells = meiosisSetup();
```

Here is an example:

> In the embedded examples, the exported global `Meiosis` is used instead of `import meiosisSetup
from '...'`.

@flems {"files":"code/setup-function-patches.js","libs":"meiosis-setup"}

### Setup with Mergerino

To set up Meiosis with [Mergerino](https://github.com/fuzetsu/mergerino) (explained in the Meiosis
Documentation: [reference](http://meiosis.js.org/docs/05-meiosis-with-mergerino.html)), use the
following code:

```js
import meiosisSetup from 'meiosis-setup/mergerino';

const cells = meiosisSetup();
```

For example:

@flems {"files":"code/setup-mergerino.js","libs":"meiosis-setup"}

@docs-nav-start
@nav-prev:setup-installation.html:Installation
@nav-setup-toc
@nav-next:setup-initial-state.html:Initial State
@docs-nav-end

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
