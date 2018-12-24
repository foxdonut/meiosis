/*global P, S, PS, D*/

var target = {
  air:   { value: 22, units: "C" },
  water: { value: 29, units: "F" },
  comfortable: false,
  invalid: true
};

// Change `water` to `{ value: 84, units: "F" }`
console.log(
  P(target, { water: { value: 84, units: "F" } })
);

// Toggle the `comfortable` property with a function that changes the value to the
// opposite of what it was
console.log(
  P(target, { comfortable: S(x => !x) })
);

// Change the `air` value to `20` without losing the units.
console.log(
  P(target, { air: PS({ value: 20 }) })
);

// Delete the `invalid` property
console.log(
  P(target, { invalid: D })
);
