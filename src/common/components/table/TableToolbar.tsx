import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
<<<<<<< HEAD
import Iconify from '../Iconify';
=======
import Iconify from 'src/common/components/Iconify';
>>>>>>> 2813d6e6326a234b72b45e52e01abd0c40e479d8

// ----------------------------------------------------------------------

type Props = {
  roleOptions: string[];
  filterName: string;
  filterRole: string;
  onFilterName: (value: string) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableToolbar({
  filterName,
  filterRole,
  onFilterName,
  onFilterRole,
  roleOptions,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Filter"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
<<<<<<< HEAD
        {roleOptions.map((option) => (
=======
        { roleOptions.map((option) => (
>>>>>>> 2813d6e6326a234b72b45e52e01abd0c40e479d8
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
