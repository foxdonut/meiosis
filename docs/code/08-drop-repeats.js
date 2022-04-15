/* global flyd */

const dropRepeats = (states, onchange = (state) => state) => {
  let prev = undefined;
  const result = flyd.stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

const s1 = flyd.stream(10);
const d1 = dropRepeats(s1);
d1.map(console.log);
s1(10);
s1(11);
s1(11);
s1(12);

const s2 = flyd.stream({ counter: 0, label: 'zero' });
const d2 = dropRepeats(s2, (state) => state.counter);
d2.map(console.log);
s2({ counter: 0, label: 'one' });
s2({ counter: 2, label: 'two' });
