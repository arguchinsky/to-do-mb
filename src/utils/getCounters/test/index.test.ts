import { getCounters } from '../getCounters.ts';
import type { IItem } from '../../../classes/Item/interfaces';

describe('getCounters', () => {
  it('return 0 if the list is empty', () => {
    const result = getCounters([]);
    expect(result).toEqual({ all: 0, active: 0, done: 0 });
  });

  it('all items are active if their values of the field checked = false', () => {
    const list: IItem[] = [
      {
        checked: false,
        id: 0,
        value: '',
        changeState: () => {},
      },
      {
        checked: false,
        id: 1,
        value: '',
        changeState: () => {},
      },
      {
        checked: false,
        id: 2,
        value: '',
        changeState: () => {},
      },
    ];
    const result = getCounters(list);
    expect(result).toEqual({ all: 3, active: 3, done: 0 });
  });

  it('all items are done if their values of the field checked = true', () => {
    const list: IItem[] = [
      {
        checked: true,
        id: 0,
        value: '',
        changeState: () => {},
      },
      {
        checked: true,
        id: 1,
        value: '',
        changeState: () => {},
      },
    ];
    const result = getCounters(list);
    expect(result).toEqual({ all: 2, active: 0, done: 2 });
  });

  it('correctly calculate the mixed list', () => {
    const list: IItem[] = [
      {
        checked: true,
        id: 0,
        value: '',
        changeState: () => {},
      },
      {
        checked: false,
        id: 1,
        value: '',
        changeState: () => {},
      },
      {
        checked: true,
        id: 2,
        value: '',
        changeState: () => {},
      },
      {
        checked: false,
        id: 3,
        value: '',
        changeState: () => {},
      },
      {
        checked: false,
        id: 4,
        value: '',
        changeState: () => {},
      },
    ];
    const result = getCounters(list);
    expect(result).toEqual({ all: 5, active: 3, done: 2 });
  });
});
