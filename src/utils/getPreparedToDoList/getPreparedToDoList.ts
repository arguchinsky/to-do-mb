import type { IItem } from '../../classes/Item/interfaces';
import { Item } from '../../classes/Item/Item.ts';

export const getPreparedToDoList = (list: IItem[], option: string) => {
  switch (option) {
    case 'active': {
      return list.filter((item: Item) => !item.checked && item);
    }
    case 'done': {
      return list.filter((item: Item) => item.checked && item);
    }
    default: {
      return list;
    }
  }
};
