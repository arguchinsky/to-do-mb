import { blueGrey, grey } from '@mui/material/colors';

export const styles = {
  container: {
    border: `1px solid ${blueGrey[100]}`,
    borderRadius: '4px',
    boxShadow: `box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;`,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: blueGrey[50],
      transform: 'scale(1.01)',
    },
  },
  active: {
    textDecoration: 'none',
    color: 'inherit',
  },
  done: {
    textDecoration: 'line-through',
    color: grey[500],
  },
};
