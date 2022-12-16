/* Equivalent of this code, you can also npm install meiosis-setup */
/* See https://meiosis.js.org/setup for details. */
export const meiosis = ({ stream, merge, app }) => {
  const update = stream.stream();

  const states = stream.scan(
    (state, patch) => merge(state, patch),
    app.initial || {},
    update
  );

  const actions = app.Actions(update, states);
  const effects = app.Effects(update, actions);

  states.map((state) =>
    effects.forEach((effect) => effect(state))
  );

  return { states, update, actions };
};
