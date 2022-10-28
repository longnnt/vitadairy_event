import { yupResolver } from '@hookform/resolvers/yup';
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
  FormHelperText,
} from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { schemaAddEvent } from '../schema';
import { useForm, Controller } from 'react-hook-form';
import {
  FormProvider,
  RHFRadioGroup,
  RHFTextField,
} from 'src/common/components/hook-form';
import useMessage from 'src/store-admin/hooks/useMessage';
import { useAddNewEvent } from '../hooks/useAddNewEvent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import uuidv4 from 'src/common/utils/uuidv4';
import { defaultValues } from '../constant';
import { IEventFormData } from '../interface';
import { useGetProductCode } from '../hooks/useGetProductCode';
import { useProductCode } from '../hooks/useProductCode';

const names = ['VCLG8S01', 'VMOM4S01', 'VCLG8S04', 'VCLG8S02', 'VCLG8S03'];

export const AddEvent = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schemaAddEvent),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useAddNewEvent({
    onSuccess: () => {
      showSuccessSnackbar('Tạo mới thành công');
    },
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });
  const onSubmit = (data: any) => {
    const formDataAddNewEvent: IEventFormData = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      skus: data.skus,
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      userRegisterDate: data.userRegisterDate,
      userLimit: data.userLimit,
      id: 100,
    };
    mutate(formDataAddNewEvent);
  };

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventPromotionIV.list);
  }, [isSuccess]);

  const skusCodeDataEvent = useProductCode({ size: 20 });

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: BREADCUMBS.CREATE_EVENT },
        ]}
      />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Thông tin tổng quát
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Scrollbar sx={{ marginTop: '20px' }}>
          <Card sx={{ p: '20px 40px 48px' }} variant="outlined">
            <Stack spacing="26px">
              <RHFTextField name="name" label="Tên sự kiện" fullWidth />
              <Stack
                spacing={'10px'}
                direction="row"
                alignItems={'center'}
                position="relative"
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <Stack position="relative" width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày bắt đầu"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            helperText={errors.startDate && errors.startDate?.message}
                            error={!!errors.startDate}
                          />
                        )}
                      />
                    </Stack>
                  )}
                />
                <Box sx={{ mx: 2 }}>-</Box>

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <Stack position={'relative'} width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày kết thúc"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            helperText={errors.endDate && errors.endDate?.message}
                            error={!!errors.endDate}
                          />
                        )}
                      />
                    </Stack>
                  )}
                />
              </Stack>

              <FormControl>
                <InputLabel error={errors.skus ? true : false}>Mã sản phẩm</InputLabel>
                <Controller
                  name="skus"
                  control={control}
                  render={({ field }) => (
                    <Stack position={'relative'} width="100%">
                      <Select
                        multiple
                        input={
                          <OutlinedInput
                            label="Mã sản phẩm"
                            error={errors.skus ? true : false}
                          />
                        }
                        fullWidth
                        {...field}
                        error={!!errors.skus}
                      >
                        {skusCodeDataEvent.map((item: string) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  )}
                />
                <FormHelperText error={!!errors.skus}>
                  {errors.skus?.message}
                </FormHelperText>
              </FormControl>

              <RHFTextField
                fullWidth
                label="Tỉ lệ trúng quà mặc định của người dùng %"
                name="defaultWinRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ cộng thêm khi người dùng không trúng quà %"
                name="upRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ bị trừ đi khi người dùng trúng quà %"
                name="downRate"
                type="number"
              />

              <RHFRadioGroup
                name="typeUser"
                options={[
                  { label: 'Toàn bộ người dùng', value: 'allUser' },
                  { label: 'Người dùng mới', value: 'newUser' },
                ]}
              />

              <Controller
                name="userRegisterDate"
                control={control}
                render={({ field }) => (
                  <Stack position={'relative'} width="100%">
                    <DatePicker
                      {...field}
                      label="Ngày tính người dùng mới"
                      inputFormat="dd/MM/yyyy a"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={
                            errors.userRegisterDate && errors.userRegisterDate.message
                          }
                          error={!!errors.userRegisterDate}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
              <RHFTextField
                name="userLimit"
                fullWidth
                label="Số lần người dùng nhận quà ..."
                type="number"
              />
            </Stack>
          </Card>
        </Scrollbar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Button variant="contained" color="secondary" type="submit">
            Lưu
          </Button>
          <Button variant="contained" sx={{ mx: '7px' }}>
            Lưu & chỉnh sửa
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
