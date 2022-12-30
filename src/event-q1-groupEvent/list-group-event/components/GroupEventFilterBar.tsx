import { LoadingButton } from '@mui/lab';
import { Stack, InputAdornment, TextField, Box, MenuItem } from '@mui/material';
// components
import Iconify from 'src/common/components/Iconify';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
  placeholder: string;
};

export default function ListGroupEventFilterBar({
  filterName,
  onFilterName,
  placeholder,
}: Props) {

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2, px: 1 }} alignItems='center' width='100%'>
      <TextField
        select
        label="Group Event"
        value={'ALL'}
        // onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          width: '25%',
          textTransform: 'capitalize',
        }}
      >
        {/* { roleOptions.map((option) => ( */}
          <MenuItem
            // key={option}
            value={'ALL'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            ALL
          </MenuItem>
        {/* ))} */}
      </TextField>
      
      <TextField
        sx={{
            width: '50%',
        }}
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={placeholder}
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
      <Stack direction={'row'} spacing={2} sx={{ width: '25%'}} alignItems='center' justifyContent={'center'}>
        <LoadingButton
          type="submit"
          variant="contained"
        //   loading={isLoading}
        //   onClick={() => handleSearch()}
        >
          Tìm kiếm
        </LoadingButton>
        <LoadingButton
          color="inherit"
          variant="contained"
        //   onClick={handleCancel}
        >
          Xóa
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
