import { type FC, useState } from 'react';
import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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
      key={id}
      onClick={handleChange}
      sx={{
        ...styles.container,
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <ListItemIcon>
        <Checkbox checked={done} />
      </ListItemIcon>
      <ListItemText sx={done ? styles.done : styles.active}>{value}</ListItemText>
    </ListItem>
  );
};
