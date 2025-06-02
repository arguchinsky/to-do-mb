import { type SyntheticEvent, useMemo, useState } from 'react';
import { Item } from '../../classes/Item/Item.ts';
import { getPreparedToDoList } from '../../utils/getPreparedToDoList/getPreparedToDoList.ts';
import { getCounters } from '../../utils/getCounters/getCounters.ts';
import type { IItem } from '../../classes/Item/interfaces';
import type { TAppState } from './types';
import type { TCounters } from '../../utils/getCounters/types';

export const useAppState = (): TAppState => {
  const [todos, setTodos] = useState<IItem[]>([]);
  const [tab, setTab] = useState<string>('all');

  const preparedList = useMemo<IItem[]>(() => getPreparedToDoList(todos, tab), [todos, tab]);
  const counters = useMemo<TCounters>(() => getCounters(todos), [todos]);

  const handleAddValue = (value: string) => {
    setTodos((prev) => [new Item(todos.length + 1, value), ...prev]);
  };

  const handleCompleteItem = (id: number) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        item.changeState();
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleOnTabChange = (_: SyntheticEvent<Element, Event>, value: string) => {
    setTab(value);
  };

  return {
    tab,
    preparedList,
    counters,
    handleAddValue,
    handleCompleteItem,
    handleOnTabChange,
  };
};
