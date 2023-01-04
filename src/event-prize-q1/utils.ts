import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(({ theme }) => ({
    height: 500,
    width: '100%',
    '& .MuiDataGrid-cell--editing': {
      backgroundColor: 'rgb(255,215,115, 0.19)',
      color: '#1a3e72',
      '& .MuiInputBase-root': {
        height: '100%',
      },
    },
    '& .Mui-error': {
      backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
      color: theme.palette.error.main,
    },
    '& .actions': {
      color: 'text.secondary',
    },
    '& .textPrimary': {
      color: 'text.primary',
    },
    '& .css-191bxd1-MuiDataGrid-columnHeaderTitle': {
      color: '#919EAB',
    }
  }));
  