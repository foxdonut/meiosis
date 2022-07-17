# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | |
| ---- | ---- |
| [&rarr; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [&#8673; Table of Contents](setup-toc.html) |

## Installation

Using Node.js:

```
npm i meiosis-setup
```

Then you can import using:

```js
import meiosisSetup from 'meiosis-setup/functionPatches';

// or

import meiosisSetup from 'meiosis-setup/mergerino';

// then

const cells = meiosisSetup();
```

With a script tag:

```html
<script src="http://unpkg.com/meiosis-setup"></script>
```

Then use the `Meiosis` global variable:

```js
const cells = Meiosis.functionPatches.setup();

// or

const cells = Meiosis.mergerino.setup();
```

This gives you a stream of cells as explained in the [Meiosis documentation](toc.html).

| | |
| ---- | ---- |
| [&rarr; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
