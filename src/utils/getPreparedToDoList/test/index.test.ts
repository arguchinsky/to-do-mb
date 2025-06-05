import { getPreparedToDoList } from '../getPreparedToDoList.ts';
import type { IItem } from '../../../classes/Item/interfaces';

const mockedFn = jest.fn();

describe('getPreparedToDoList', () => {
  const list: IItem[] = [
    { checked: false, id: 1, value: 'Task 1', changeState: mockedFn },
    { checked: true, id: 2, value: 'Task 2', changeState: mockedFn },
    { checked: false, id: 3, value: 'Task 3', changeState: mockedFn },
    { checked: true, id: 4, value: 'Task 4', changeState: mockedFn },
  ];

  it('return only active tasks option="active"', () => {
    const result = getPreparedToDoList(list, 'active');
    expect(result).toEqual([
      { checked: false, id: 1, value: 'Task 1', changeState: mockedFn },
      { checked: false, id: 3, value: 'Task 3', changeState: mockedFn },
    ]);
  });

  it('return only finished task option="done"', () => {
    const result = getPreparedToDoList(list, 'done');
    expect(result).toEqual([
      { checked: true, id: 2, value: 'Task 2', changeState: mockedFn },
      { checked: true, id: 4, value: 'Task 4', changeState: mockedFn },
    ]);
  });

  it('return empty list if the list is undefined', () => {
    const result = getPreparedToDoList(list, 'all');
    expect(result).toEqual(list);
  });

  it('return an empty list if the passed list has been empty', () => {
    const result = getPreparedToDoList([], 'active');
    expect(result).toEqual([]);
  });
});
