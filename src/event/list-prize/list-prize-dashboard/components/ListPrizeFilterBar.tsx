
import { Stack, InputAdornment, TextField, MenuItem, Box, Button } from '@mui/material';
// components
import Iconify from 'src/common/components/Iconify';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
};

export default function ListPrizeFilterBar({
  filterName,
  onFilterName,
}: Props) {
  return (
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: '11px', px: 3 }}>
        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Lọc theo tên quà tặng"
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