import {
  Stack,
  Button,
  Card,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { EventTable } from './EventTable';

import { useNavigate } from 'react-router-dom';
import { EventTableToolbar } from './EventTableToolbar';

export default function ListEventPromotionDashboard() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.new);
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện' },
        ]}
        action={
          <>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              onClick={handleCreateEvent}
            >
              Tạo mới
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              color="error"
              sx={{ ml: '10px' }}
            >
              Xóa
            </Button>
          </>
        }
      />
      <Card sx={{ p: '10px', w: '100%' }}>
        {/* <Stack spacing={'10px'} direction="row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props) => <TextField {...props} />}
              label="Ngày bắt đầu"
              value={timeStartValue}
              onChange={(newTimeStartValue) => handleUpdateTimeStart(newTimeStartValue)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props) => <TextField {...props} />}
              label="Ngày Kết thúc"
              value={timeEndValue}
              onChange={(newTimeEndValue) => {
                handleUpdateTimeEnd(newTimeEndValue);
              }}
            />
          </LocalizationProvider>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adorment-search">Tìm kiếm sự kiện</InputLabel>
            <OutlinedInput
              id="outlined-adorment-search"
              onChange={(e) => handleUpdateSearchInput(e.target.value)}
              value={searchInputValue}
              label="Tìm kiếm sự kiện"
              startAdornment={
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack> */}
        <EventTableToolbar />
        <EventTable />
      </Card>
    </>
  );
}
