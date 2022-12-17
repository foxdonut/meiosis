import { meiosisSetup } from 'meiosis-setup';
import { render } from 'preact';
import { createApp, App } from './app';
import { router } from './router';

// Only for using Meiosis Tracer in development / Chrome DevTools.
import meiosisTracer from 'meiosis-tracer';

const app = createApp(router.initialRoute);
const cells = meiosisSetup({ app });
const cell = cells();

router.start((route) => cell.update({ route: () => route }));
cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});

// Only for using Meiosis Tracer in development / Chrome DevTools.
meiosisTracer({
  rows: 30,
  streams: [{ stream: cell.states, label: 'states' }]
});

const element = document.getElementById('app');
cells.map((cell) => {
  render(<App cell={cell} />, element);
});
