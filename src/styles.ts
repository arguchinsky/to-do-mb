import { blueGrey } from '@mui/material/colors';

export const appStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  tab: {
    alignItems: 'start',
    textTransform: 'capitalize',
    fontSize: '18px',
  },
  list: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '4px',
    height: 'calc(90vh - 300px)',
    overflow: 'auto',
    padding: '8px',
  },
  clear: {
    color: blueGrey[200],
    '&:hover': {
      cursor: 'pointer',
      color: blueGrey[300],
    },
    '&:active': {
      color: blueGrey[200],
    },
  },
};
