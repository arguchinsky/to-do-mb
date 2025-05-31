import type { IItem } from '../../../classes/Item/interfaces';

export type TAppListItem = {
  onChange: (id: number) => void;
} & Omit<IItem, 'changeState'>;
