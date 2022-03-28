// @ts-check

// common code
export const convert = (value, to) => {
  return Math.round(to === 'C' ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

export const temperature = {
  Initial: label => ({
    label,
    value: 22,
    units: 'C'
  })
};

export const app = {
  initial: {
    conditions: {
      precipitations: false,
      sky: 'SUNNY'
    },
    temperature: {
      air: temperature.Initial('Air'),
      water: temperature.Initial('Water')
    }
  }
};
