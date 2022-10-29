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
import { useGetEventById } from '../hooks/useGetEventById';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { defaultValues } from '../constant';

export const ViewEvent = () => {
  const navigate = useNavigate();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const params = useParams();
  const id = params?.id;

  const { data } = useGetEventById({
    id: parseInt(id as string),
    callback: {
      onSuccess: () => showSuccessSnackbar('Lấy thông tin sự kiện thành công'),
      onError: () => showErrorSnackbar('Lấy thông tin sự kiện thất bại'),
    },
  });

  const eventDetail = data?.data || [];

  const {
    name,
    startDate,
    endDate,
    defaultWinRate,
    upRate,
    downRate,
    userRegisterDate,
    userLimit,
    skus,
  } = eventDetail.response || defaultValues;
  const handleBackEventList = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };

  const handleEditEventAction = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.edit(id));
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: BREADCUMBS.VIEW_EVENT },
        ]}
      />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Thông tin tổng quát
      </Typography>
      <Scrollbar sx={{ marginTop: '20px' }}>
        <Card sx={{ p: '20px 40px 48px' }} variant="outlined">
          <Stack spacing="26px">
            <TextField value={name} label="Tên sự kiện" fullWidth disabled />
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
                value={startDate}
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
                value={endDate}
              />
            </Stack>

            <FormControl>
              <InputLabel>Mã sản phẩm</InputLabel>
              <Select
                multiple
                input={<OutlinedInput label="Mã sản phẩm" value={skus} />}
                fullWidth
                disabled
              >
                {skus.map((item: string, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Tỉ lệ trúng quà mặc định của người dùng %"
              value={defaultWinRate}
              disabled
            />
            <TextField
              value={upRate}
              fullWidth
              label="Tỉ lệ cộng thêm khi người dùng không trúng quà %"
              disabled
            />
            <TextField
              value={downRate}
              fullWidth
              label="Tỉ lệ bị trừ đi khi người dùng trúng quà %"
              disabled
            />
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                sx={{ flexDirection: 'row' }}
                defaultValue={(userRegisterDate !== null && 'newUser') || 'allUser'}
              >
                <FormControlLabel
                  value="allUser"
                  control={<Radio />}
                  label="Tất cả người dùng"
                  disabled
                />
                <FormControlLabel
                  value="newUser"
                  control={<Radio />}
                  label="Người dùng mới"
                  disabled
                />
              </RadioGroup>
            </FormControl>

            <DatePicker
              label="Ngày tính người dùng mới"
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  disabled
                  sx={{ display: `${(userRegisterDate === null && 'none') || 'block'}` }}
                />
              )}
              onChange={() => 0}
              value={userRegisterDate}
              disabled
            />

            <TextField
              fullWidth
              label="Số lần người dùng nhận quà ..."
              value={userLimit}
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
