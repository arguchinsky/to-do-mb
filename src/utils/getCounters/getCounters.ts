import type { IItem } from '../../classes/Item/interfaces';
import type { TCounters } from './types';

export const getCounters = (list: IItem[]): TCounters =>
  list.reduce(
    (buffer, item) => {
      if (item.checked) {
        buffer.done++;
      } else {
        buffer.active++;
      }
      buffer.all++;
      return buffer;
    },
    {
      all: 0,
      active: 0,
      done: 0,
    },
  );
