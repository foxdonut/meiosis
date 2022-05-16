# `meiosis-setup` Documentation

| | |
| ---- | ---- |
| [Initial State &rarrhk;](setup-initial-state.html) | [Table of Contents &#8673;](setup-toc.html) |

## Function Patches or Mergerino

### Setup with Function Patches

To set up Meiosis with function patches (explained in the Meiosis Documentation:
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

| | |
| ---- | ---- |
| [Initial State &rarrhk;](setup-initial-state.html) | [Table of Contents &#8673;](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
