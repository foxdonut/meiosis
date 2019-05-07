/*global O*/

var target = {
  air: { value: 22, units: "C" },
  water: { value: 29, units: "F" },
  comfortable: false,
  invalid: true
};

// Change `water` to `{ value: 84, units: "F" }`
console.log(O(target, { water: { value: 84, units: "F" } }));

// Toggle the `comfortable` property with a function that changes the value to the
// opposite of what it was
console.log(O(target, { comfortable: O(x => !x) }));

// Change the `air` value to `20` without losing the units.
console.log(O(target, { air: O({ value: 20 }) }));

// Delete the `invalid` property
console.log(O(target, { invalid: O }));
