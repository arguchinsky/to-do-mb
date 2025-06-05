import { type FC, useState } from 'react';
import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DATA_TEST_ID_START, POINTER_EVENT_TYPE } from './constants';
import type { TAppListItem } from './types';

import { styles } from './styles';

export const AppListItem: FC<TAppListItem> = ({ id, checked, value, onChange }) => {
  const [done, setDone] = useState<boolean>(checked);

  const handleChange: VoidFunction = () => {
    onChange(id);
    setDone((prevStatus) => !prevStatus);
  };

  return (
    <ListItem
      data-test-id={`${DATA_TEST_ID_START}${id}`}
      key={id}
      onClick={handleChange}
      sx={{
        ...styles.container,
        pointerEvents: done ? POINTER_EVENT_TYPE.none : POINTER_EVENT_TYPE.all,
      }}
    >
      <ListItemIcon>
        <Checkbox checked={done} />
      </ListItemIcon>
      <ListItemText sx={done ? styles.done : styles.active}>{value}</ListItemText>
    </ListItem>
  );
};
