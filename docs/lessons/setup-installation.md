# [meiosis-setup](https://meiosis.js.org/setup) Documentation

| | |
| ---- | ---- |
| [&rarr; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [&#8673; Table of Contents](setup-toc.html) |

## Installation

You can install `meiosis-setup`:

- Using Node.js, or,
- Using an HTML `<script>` tag.

In both cases, the setup will give you a stream of cells as explained in the
[Meiosis documentation](toc.html).

### Using Node.js

Install `meiosis-setup` with `npm`:

```
npm i meiosis-setup
```

Then you can import it using:

```js
import meiosisSetup from 'meiosis-setup/functionPatches';

// or

import meiosisSetup from 'meiosis-setup/mergerino';

// then

const cells = meiosisSetup();
```

### Using an HTML `<script>` tag

Load `meiosis-setup` by adding a `<script>` tag to your HTML page:

```html
<script src="http://unpkg.com/meiosis-setup"></script>
```

Then use the `Meiosis` global variable:

```js
const cells = Meiosis.functionPatches.setup();

// or

const cells = Meiosis.mergerino.setup();
```

| | |
| ---- | ---- |
| [&rarr; Function Patches or Mergerino](setup-function-patches-or-mergerino.html) | [&#8673; Table of Contents](setup-toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
