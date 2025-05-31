import { useMemo, useState } from 'react';
import { Container, List, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Item } from './classes/Item/Item.ts';
import { InputField } from './ui/InputField/InputField.tsx';
import { AppListItem } from './ui/AppListItem/AppListItem.tsx';
import { getPreparedToDoList } from './utils/getPreparedToDoList/getPreparedToDoList.ts';
import type { IItem } from './classes/Item/interfaces';

import './App.css';

type Tab = {
  id: number;
  label: string;
};

const tabsMap = ['all', 'active', 'done'];

function App() {
  const [todos, setTodos] = useState<IItem[]>([]);
  const [tab, setTab] = useState<Tab>({
    id: 0,
    label: 'all',
  });

  const preparedList = useMemo<IItem[]>(() => getPreparedToDoList(todos, tab.label), [todos, tab]);

  const handleAddValue = (value: string) => {
    setTodos((prev) => [new Item(todos.length + 1, value), ...prev]);
  };

  const handleCompleteItem = (id: number) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          item.changeState();
        }

        return item;
      }),
    );
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
        <Tabs
          orientation='vertical'
          value={tab.id}
          onChange={(_, value) => {
            setTab({
              id: value,
              label: tabsMap[value],
            });
          }}
        >
          <Tab label='All' id='all' />
          <Tab label='Active' id='active' />
          <Tab label='Done' id='done' />
        </Tabs>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
            maxHeight: 'calc(90vh - 300px)',
            overflow: 'auto',
            padding: '8px',
          }}
        >
          {preparedList.map((item) => (
            <AppListItem key={item.id} {...item} onChange={handleCompleteItem} />
          ))}
        </List>
      </Stack>
      <Typography color='textDisabled'>Test app for the Mindbox</Typography>
    </Container>
  );
}

export default App;
