import { type SyntheticEvent, useMemo, useState } from 'react';
import { Container, List, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Item } from './classes/Item/Item.ts';
import { InputField } from './ui/InputField/InputField.tsx';
import { AppListItem } from './ui/AppListItem/AppListItem.tsx';
import { getCounters } from './utils/getCounters/getCounters.ts';
import { getPreparedToDoList } from './utils/getPreparedToDoList/getPreparedToDoList.ts';
import type { IItem } from './classes/Item/interfaces';

import './App.css';

function App() {
  const [todos, setTodos] = useState<IItem[]>([]);
  const [tab, setTab] = useState<string>('all');

  const preparedList = useMemo<IItem[]>(() => getPreparedToDoList(todos, tab), [todos, tab]);
  const counters = useMemo<Record<string, number>>(() => getCounters(todos), [todos]);

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

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Typography variant='h1'>ToDos</Typography>
      <InputField addValue={handleAddValue} />
      <Stack direction='row'>
        <Tabs orientation='vertical' value={tab} onChange={handleOnTabChange}>
          <Tab
            label='All'
            value='all'
            sx={{
              textTransform: 'capitalize',
              alignItems: 'start',
            }}
          />
          <Tab
            label='Active'
            value='active'
            sx={{
              textTransform: 'capitalize',
              alignItems: 'start',
            }}
          />
          <Tab
            label='Done'
            value='done'
            sx={{
              textTransform: 'capitalize',
              alignItems: 'start',
            }}
          />
        </Tabs>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: preparedList.length ? 'start' : 'center',
            gap: '4px',
            flex: 1,
            height: 'calc(90vh - 300px)',
            overflow: 'auto',
            padding: '8px',
          }}
        >
          {preparedList.length ? (
            preparedList.map((item) => (
              <AppListItem key={item.id} {...item} onChange={handleCompleteItem} />
            ))
          ) : (
            <Typography variant='h4' color='textDisabled'>
              No items
            </Typography>
          )}
        </List>
      </Stack>
      <Typography alignSelf='start'>
        All: {counters.all} | Active: {counters.active} | Done: {counters.done}
      </Typography>
      <Typography color='textDisabled'>Test app for the Mindbox</Typography>
    </Container>
  );
}

export default App;
