/* eslint-env jest */

import { meiosisSetup } from '../src';
import { MeiosisComponent } from '../src/types';
import { get } from '../src/util';
import { updateFormFloatValue, updateFormIntValue, updateFormValue } from '../src/util';
import { h } from 'preact';
import { m } from 'mithril';
import { createElement } from 'react';

describe('util', () => {
  test('get', () => {
    expect(get(null, ['a', 'b'])).toBeUndefined();
    expect(get(undefined, ['a', 'b'])).toBeUndefined();
    expect(get({}, ['a', 'b'])).toBeUndefined();
    expect(get({ a: 42 }, ['a', 'b'])).toBeUndefined();
    expect(get({ a: { b: 42 } }, ['a', 'b'])).toEqual(42);
  });

  test('updateFormValue', () => {
    interface Environment {
      material: string;
    }

    interface Duck {
      color: string;
      env: Environment;
    }

    interface AppState {
      pet: Duck;
      name: string;
    }

    const app: MeiosisComponent<AppState> = {
      initial: {
        pet: {
          color: 'yellow',
          env: {
            material: 'straw'
          }
        },
        name: 'Red'
      }
    };

    const cells = meiosisSetup<AppState>({ app });

    const newMaterial = 'wood';
    const cell = cells();
    const evt = { target: { value: newMaterial } };
    updateFormValue(cell, ['pet', 'env', 'material'])(evt);

    expect(cells().state).toEqual({
      pet: {
        color: 'yellow',
        env: {
          material: newMaterial
        }
      },
      name: 'Red'
    });

    const newName = 'Black';
    updateFormValue(cell, 'name')({ target: { value: newName } });

    expect(cells().state).toEqual({
      pet: {
        color: 'yellow',
        env: {
          material: newMaterial
        }
      },
      name: newName
    });
  });

  test('updateFormValue with function', () => {
    interface Environment {
      material: string;
    }

    interface Duck {
      color: string;
      env: Environment;
    }

    interface AppState {
      pet: Duck;
    }

    const app: MeiosisComponent<AppState> = {
      initial: {
        pet: {
          color: 'yellow',
          env: {
            material: 'straw'
          }
        }
      }
    };

    const cells = meiosisSetup<AppState>({ app });

    const cell = cells();
    const evt = { target: { value: 'wood' } };
    updateFormValue(cell, ['pet', 'env', 'material'], (value) => value.toUpperCase())(evt);

    expect(cells().state).toEqual({
      pet: {
        color: 'yellow',
        env: {
          material: 'WOOD'
        }
      }
    });
  });

  test('updateFormIntValue', () => {
    interface House {
      size: number;
    }

    interface Duck {
      house: House;
    }

    interface AppState {
      pet: Duck;
      counter: number;
    }

    const app: MeiosisComponent<AppState> = {
      initial: {
        pet: {
          house: {
            size: 5
          }
        },
        counter: 0
      }
    };

    const cells = meiosisSetup<AppState>({ app });

    const cell = cells();
    const evt = { target: { value: '10' } };
    updateFormIntValue(cell, ['pet', 'house', 'size'])(evt);

    expect(cells().state).toEqual({
      pet: {
        house: {
          size: 10
        }
      },
      counter: 0
    });

    updateFormIntValue(cell, 'counter')({ target: { value: '1' } });

    expect(cells().state).toEqual({
      pet: {
        house: {
          size: 10
        }
      },
      counter: 1
    });
  });

  test('updateFormFloatValue', () => {
    interface House {
      size: number;
    }

    interface Duck {
      house: House;
    }

    interface AppState {
      pet: Duck;
      pH: number;
    }

    const app: MeiosisComponent<AppState> = {
      initial: {
        pet: {
          house: {
            size: 5
          }
        },
        pH: 6.9
      }
    };

    const cells = meiosisSetup<AppState>({ app });

    const cell = cells();
    const evt = { target: { value: '10.5' } };
    updateFormFloatValue(cell, ['pet', 'house', 'size'])(evt);

    expect(cells().state).toEqual({
      pet: {
        house: {
          size: 10.5
        }
      },
      pH: 6.9
    });

    updateFormFloatValue(cell, 'pH')({ target: { value: '7.01' } });

    expect(cells().state).toEqual({
      pet: {
        house: {
          size: 10.5
        }
      },
      pH: 7.01
    });
  });

  test('preact types', () => {
    interface AppState {
      name: string;
    }

    const app: MeiosisComponent<AppState> = {};

    const cells = meiosisSetup<AppState>({ app });
    const cell = cells();

    // type check
    const view = () => h('input', { type: 'text', onInput: updateFormValue(cell, 'name') });
    view();
  });

  test('mithril types', () => {
    interface AppState {
      name: string;
    }

    const app: MeiosisComponent<AppState> = {};

    const cells = meiosisSetup<AppState>({ app });
    const cell = cells();

    // type check
    const view = () => m('input', { type: 'text', onInput: updateFormValue(cell, 'name') });
    view();
  });

  test('react types', () => {
    interface AppState {
      name: string;
    }

    const app: MeiosisComponent<AppState> = {};

    const cells = meiosisSetup<AppState>({ app });
    const cell = cells();

    // type check
    const view = () => createElement('input',
      { type: 'text', onInput: updateFormValue(cell, 'name') });
    view();
  });
});
