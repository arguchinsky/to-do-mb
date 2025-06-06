import type { SyntheticEvent } from 'react';
import type { IItem } from '../../../classes/Item/interfaces';
import type { TCounters } from '../../../utils/getCounters/types';

export type TAppState = {
  tab: string;
  preparedList: IItem[];
  counters: TCounters;
  handleAddValue: (value: string) => void;
  handleCompleteItem: (id: number) => void;
  handleOnTabChange: (_: SyntheticEvent<Element, Event>, value: string) => void;
  handleClearList: VoidFunction;
};
