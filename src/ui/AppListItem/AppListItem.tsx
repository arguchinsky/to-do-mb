import { type FC, useState } from 'react';
import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import type { TAppListItem } from './types';

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
        border: `1px solid ${blueGrey[100]}`,
        borderRadius: '4px',
        boxShadow: `box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;`,
        pointerEvents: done ? 'none' : 'all',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: blueGrey[50],
          transform: 'scale(1.01)',
        },
      }}
    >
      <ListItemIcon>
        <Checkbox checked={done} />
      </ListItemIcon>
      <ListItemText
        sx={{
          textDecoration: done ? 'line-through' : 'none',
          color: done ? grey[500] : 'inherit',
        }}
      >
        {value}
      </ListItemText>
    </ListItem>
  );
};
