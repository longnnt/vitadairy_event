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
import {
  resetFormFilter,
  searchInputState,
  timeEndState,
  timeStartState,
  updateSearchInput,
  updateTimeEnd,
  updateTimeStart,
} from '../eventPromotionIV.slice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'src/common/redux/store';
import { useNavigate } from 'react-router-dom';
import { TimeProps } from '../interface';

export default function ListEventPromotionDashboard() {
  const navigate = useNavigate();
  const timeStartValue = useSelector(timeStartState);
  const timeEndValue = useSelector(timeEndState);
  const searchInputValue = useSelector(searchInputState);
  const dispatch = useDispatch();
  const handleUpdateTimeStart = (newTimeStartValue: TimeProps) => {
    dispatch(updateTimeStart(newTimeStartValue));
  };
  const handleUpdateTimeEnd = (newTimeEndValue: TimeProps) => {
    dispatch(updateTimeEnd(newTimeEndValue));
  };
  const handleUpdateSearchInput = (newSearchInputValue: string) => {
    dispatch(updateSearchInput(newSearchInputValue));
  };
  const handleDeleteFormFilter = () => {
    dispatch(resetFormFilter());
  };
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
        <Stack spacing={'10px'} direction="row">
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
        </Stack>
        <Stack direction={'row'} spacing="10px" sx={{ mt: '12px' }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => console.log(timeStartValue, timeEndValue, searchInputValue)}
          >
            Lọc
          </Button>
          <Button variant="contained" color="primary" onClick={handleDeleteFormFilter}>
            Xóa
          </Button>
        </Stack>
        <EventTable />
      </Card>
    </>
  );
}
