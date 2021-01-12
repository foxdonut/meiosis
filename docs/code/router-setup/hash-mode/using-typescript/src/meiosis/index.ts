/* Equivalent of this code, you can also npm install meiosis-setup */
/* See https://meiosis.js.org/setup for details. */
import * as flyd from "flyd";

type Stream<T> = flyd.Stream<T>;

export type Accumulator<S, P> = (state: S, patch: P) => S;
export type Service<S, P> = (state: S) => P;
export type Effect<S> = (state: S) => void;

export interface App<S, P, A> {
  initial: S;
  Actions: (update: Stream<P>, states?: Stream<S>) => A;
  Effects: (update: Stream<P>, actions?: A) => Effect<S>[];
}

export interface MeiosisConfig<S, P, A> {
  stream: <T>() => Stream<T>;
  accumulator: Accumulator<S, P>;
  app: App<S, P, A>;
}

export interface Meiosis<S, P, A> {
  states: Stream<S>;
  update: Stream<P>;
  actions: A;
}

export const meiosis = <S, P, A>({
  stream,
  accumulator,
  app
}: MeiosisConfig<S, P, A>): Meiosis<S, P, A> => {
  const update: Stream<P> = stream();

  const states: Stream<S> = flyd.scan(
    (state, patch) => accumulator(state, patch),
    app.initial,
    update
  );

  const actions: A = app.Actions(update, states);
  const effects: Effect<S>[] = app.Effects(update, actions);

  states.map(state => effects.forEach(effect => effect(state)));

  return { states, update, actions };
};
