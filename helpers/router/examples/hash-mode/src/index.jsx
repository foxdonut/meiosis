import { meiosisSetup } from 'meiosis-setup';
import { render } from 'preact';
import { app, App } from './app';
import { router } from './router';

// Only for using Meiosis Tracer in development / Chrome DevTools.
import meiosisTracer from 'meiosis-tracer';

const cells = meiosisSetup({ app });
router.setup(cells);

// Only for using Meiosis Tracer in development / Chrome DevTools.
meiosisTracer({
  rows: 30,
  streams: [{ stream: cells().states, label: 'states' }]
});

const element = document.getElementById('app');
cells.map((cell) => {
  render(<App cell={cell} />, element);
});
