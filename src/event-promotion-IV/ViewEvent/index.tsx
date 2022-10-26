import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import useMessage from 'src/store-admin/hooks/useMessage';

import { useNavigate, useParams } from 'react-router-dom';
import uuidv4 from 'src/common/utils/uuidv4';
import { defaultValues } from '../constant';
import { useGetEventById } from '../hooks/useGetEventById';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export const ViewEvent = () => {
  const navigate = useNavigate();

  // const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const params = useParams();
  const id = params?.id;

  // const { data } = useGetEventById({
  //   id: parseInt(id as string),
  //   callback: {
  //     onSuccess: () => showSuccessSnackbar('Get Admin successfully'),
  //     onError: () => showErrorSnackbar('Get admin fail'),
  //   },
  // });
  const handleBackEventList = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };

  const handleEditEventAction = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.edit(id));
  };

  const fakeData = {
    name: 'soemthing',
    startDate: '2022-10-06T20:13:00.000Z',
    endDate: '2022-10-04T17:00:00.000Z',
    skus: ['Ralph Hubbard'],
    defaultWinRate: 1,
    upRate: 1,
    downRate: 1,
    userRegisterDate: '2022-09-30T17:00:00.000Z',
    userLimit: 1,
    id: '172ce2e3-2cb5-4815-9b27-888fc77594af',
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Xem sự kiện' },
        ]}
      />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Thông tin tổng quát
      </Typography>
      <Scrollbar sx={{ marginTop: '20px' }}>
        <Card sx={{ p: '20px 40px 48px' }} variant="outlined">
          <Stack spacing="26px">
            <TextField value={fakeData.name} label="Tên sự kiện" fullWidth disabled />
            <Stack
              spacing={'10px'}
              direction="row"
              alignItems={'center'}
              position="relative"
            >
              <DateTimePicker
                label="Ngày bắt đầu"
                inputFormat="dd/MM/yyyy hh:mm a"
                renderInput={(params) => <TextField {...params} fullWidth />}
                value={fakeData.startDate}
                disabled
                onChange={() => 0}
              />
              <Box sx={{ mx: 2 }}>-</Box>

              <DateTimePicker
                label="Ngày kết thúc"
                inputFormat="dd/MM/yyyy hh:mm a"
                renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={() => 0}
                disabled
                value={fakeData.endDate}
              />
            </Stack>

            <FormControl>
              <InputLabel>Mã sản phẩm</InputLabel>
              <Select
                multiple
                input={<OutlinedInput label="Mã sản phẩm" value={fakeData.skus} />}
                fullWidth
                disabled
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Tỉ lệ trúng quà mặc định của người dùng %"
              value={fakeData.defaultWinRate}
              disabled
            />
            <TextField
              value={fakeData.upRate}
              fullWidth
              label="Tỉ lệ cộng thêm khi người dùng không trúng quà %"
              disabled
            />
            <TextField
              value={fakeData.downRate}
              fullWidth
              label="Tỉ lệ bị trừ đi khi người dùng trúng quà %"
              disabled
            />
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="allUsre"
                  control={<Radio />}
                  label="Tất cả người dùng"
                  disabled
                />
                <FormControlLabel
                  value="newUser"
                  control={<Radio />}
                  label="Người dùng mới"
                  disabled
                  checked
                />
              </RadioGroup>
            </FormControl>

            <DatePicker
              label="Ngày tính người dùng mới"
              inputFormat="dd/MM/yyyy a"
              renderInput={(params) => <TextField {...params} fullWidth disabled />}
              onChange={() => 0}
              value={fakeData.userRegisterDate}
              disabled
            />

            <TextField
              fullWidth
              label="Số lần người dùng nhận quà ..."
              value={fakeData.userLimit}
              disabled
            />
          </Stack>
        </Card>
      </Scrollbar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
        <Button variant="contained" color="secondary" onClick={handleBackEventList}>
          Trở về
        </Button>
        <Button
          variant="contained"
          sx={{ mx: '7px' }}
          onClick={() => handleEditEventAction(Number(id))}
        >
          Chỉnh sửa
        </Button>
      </Box>
    </>
  );
};
