/* eslint-env jest */

import merge from 'mergerino';

import meiosis from '../src/meiosis';

describe('simpleStream', () => {
  test('basic', () => {
    const s1 = meiosis.stream.simpleStream.stream();
    const result = s1(42);
    expect(result).toEqual(42);
  });

  test('latest value', () => {
    const s1 = meiosis.stream.simpleStream.stream();

    const f1 = (x) => {
      if (x === 10) {
        s1(20);
      }
    };

    s1.map(f1);

    const f2 = (x) => x;
    const s2 = s1.map(f2);

    const values = [];
    s2.map((value) => values.push(value));

    s1(10);

    // Synchronous updates
    expect(values).toEqual([20, 20]);
  });

  test('service on initial state', (done) => {
    const update = meiosis.stream.simpleStream.stream();
    const initial = { route: 'Home', routeChanged: true, data: [] };

    const states = meiosis.stream.simpleStream.scan(
      (state, patch) => merge(state, patch),
      initial,
      update
    );

    const service = (state) => {
      if (state.route === 'Home') {
        if (state.routeChanged) {
          update({ routeChanged: false, loading: true });
        } else if (state.loading) {
          setTimeout(() => {
            update({ loading: false, data: ['duck', 'quack'] });
          });
        }
      }
    };

    states.map((state) => service(state));

    states.map((state) => {
      try {
        if (state.data.length === 2) {
          done();
        }
      } catch (error) {
        done(error);
      }
    });
  });

  test('set undefined', (done) => {
    const s1 = meiosis.stream.simpleStream.stream();

    s1.map((_value) => {
      done();
    });

    s1(undefined);
  });

  test('dropRepeats', () => {
    const dropRepeats = meiosis.stream.dropRepeats;
    const s1 = meiosis.stream.simpleStream.stream();
    const s2 = dropRepeats(s1);

    let ticks = 0;
    s2.map(() => {
      ticks++;
    });

    s1('A');
    s1('A');
    s1('A');
    s1('A');
    s1('B');
    s1('B');
    s1('B');

    expect(ticks).toEqual(2);
  });

  test('dropRepeats with selector', () => {
    const dropRepeats = meiosis.stream.dropRepeats;
    const s1 = meiosis.stream.simpleStream.stream();
    const s2 = dropRepeats(s1, (s) => s.value);

    let ticks = 0;
    s2.map(() => {
      ticks++;
    });

    s1({ value: 5 });
    s1({ value: 5, duck: 'quack' });
    s1({ value: 5, color: 'yellow' });
    s1({ value: 42, color: 'yellow' });
    s1({ value: 42, duck: 'quack' });
    s1({ value: 42, color: 'yellow' });
    s1({ value: 42 });

    expect(ticks).toEqual(2);
  });

  test('end stream', () => {
    const s1 = meiosis.stream.simpleStream.stream();

    let c1 = 0;
    const d1 = s1.map(() => {
      c1++;
    });

    let c2 = 0;
    const d2 = s1.map(() => {
      c2++;
    });

    let c3 = 0;
    d2.map(() => {
      c3++;
    });

    let c4 = 0;
    s1.map(() => {
      c4++;
    });

    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(1);
    expect(c3).toEqual(1);
    expect(c4).toEqual(1);

    d1.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(2);

    d2.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(3);

    s1.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(3);
  });
});
