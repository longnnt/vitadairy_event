
import { Stack, InputAdornment, TextField, MenuItem, Box, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
// components
import Iconify from 'src/common/components/Iconify';
import { dispatch, useSelector } from 'src/common/redux/store';
import { filterFromDateSelector, filterToDateSelector, setFilterFromDate, setFilterToDate } from '../../event.slice';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;

  onFilterName: (value: string) => void;

};

export default function FilterBar({
  filterName,
  onFilterName,

}: Props) {
  const filterFromDate = useSelector(filterFromDateSelector);
  const filterToDate = useSelector(filterToDateSelector);
 
  const handleFilterFromDate = (fromDate: string) => {
    dispatch(setFilterFromDate(fromDate));

  };

  const handleFilterToDate = (toDate: string) => {
    dispatch(setFilterToDate(toDate));

  };
  return (
    <Stack>
  
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: '11px', px: 3 }}>
      
        <Box>
          <DatePicker
                  value={filterFromDate}
                  onChange={(newDate:any) => handleFilterFromDate(newDate)}
                  label= 'Ngày bắt đầu'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
            />
        </Box>

        <Box>
          <DatePicker
                  value={filterToDate}
                  onChange={(toDate:any) => handleFilterToDate(toDate)}
                  label= 'Ngày kết thúc'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
            />
        </Box>

        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Lọc theo tên, số điện thoại hoặc quà"
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
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 1, px: 3 }}>
        <Box >
          <Button variant='outlined' >
            Lọc
          </Button>

        </Box>
        <Box >
          <Button variant='outlined'>
            Xóa
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
