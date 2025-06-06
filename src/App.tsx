import { Container, List, Stack, Tab, Tabs, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppState } from './hooks/useAppState/useAppState.ts';
import { InputField } from './ui/InputField/InputField.tsx';
import { AppListItem } from './ui/AppListItem/AppListItem.tsx';

import './App.css';
import { appStyles } from './styles.ts';

function App() {
  const {
    tab,
    preparedList,
    counters,
    handleAddValue,
    handleCompleteItem,
    handleOnTabChange,
    handleClearList,
  } = useAppState();

  return (
    <Container maxWidth='lg' sx={appStyles.container}>
      <Typography variant='h1'>ToDos</Typography>
      <InputField addValue={handleAddValue} />
      <Stack direction='row'>
        <Tabs orientation='vertical' value={tab} onChange={handleOnTabChange}>
          <Tab label='All' value='all' sx={appStyles.tab} />
          <Tab label='Active' value='active' sx={appStyles.tab} />
          <Tab label='Done' value='done' sx={appStyles.tab} />
        </Tabs>
        <List
          sx={{
            ...appStyles.list,
            justifyContent: preparedList.length ? 'start' : 'center',
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
      <Stack direction='row' alignItems='center' gap='4px'>
        <DeleteIcon sx={appStyles.clear} onClick={handleClearList} />
        <Typography alignSelf='start'>
          All: {counters.all} | Active: {counters.active} | Done: {counters.done}
        </Typography>
      </Stack>
      <Typography color='textDisabled'>Test app for the Mindbox</Typography>
    </Container>
  );
}

export default App;
