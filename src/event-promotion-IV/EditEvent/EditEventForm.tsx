import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Scrollbar from 'src/common/components/Scrollbar';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFRadioGroup,
  RHFTextField,
} from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues } from '../constant';
import { useEditEvent } from '../hooks/useEditEvent';
import { useGetEventById } from '../hooks/useGetEventById';
import { useProductCode } from '../hooks/useProductCode';
import { schemaAddEvent } from '../schema';

export const EditEventForm = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schemaAddEvent),
    defaultValues,
  });

  const params = useParams();
  const id = params?.id;

  const { data } = useGetEventById({
    id: parseInt(id as string),
    callback: {
      onSuccess: () => showSuccessSnackbar('Tải sự kiện thành công'),
      onError: () => showErrorSnackbar('Tải sự kiện thất bại'),
    },
  });

  const skusCodeDataEvent = useProductCode({ size: 20 });

  const dataEventDetail = data?.data?.response;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useEditEvent({
    onSuccess: () => {
      showSuccessSnackbar('Tạo mới thành công');
    },
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });

  const { useDeepCompareEffect } = useDeepEffect();
  const onSubmit = (data: any) => {
    const formDataAddNewEvent = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      skus: data.skus,
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      userRegisterDate: data.userRegisterDate,
      userLimit: data.userLimit,
      id: Number(id),
    };
    mutate({ id: parseInt(id as string), formEditData: formDataAddNewEvent });
  };

  useDeepCompareEffect(() => {
    if (dataEventDetail) {
      reset(dataEventDetail);
      let allUserOrNewUser = '';
      if (dataEventDetail?.userRegisterDate === null) {
        allUserOrNewUser = 'allUser';
      } else {
        allUserOrNewUser = 'newUser';
      }
      setValue('typeUser', allUserOrNewUser);
    }
  }, [dataEventDetail]);

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventPromotionIV.list);
  }, [isSuccess]);

  const handleRedirectToView = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };

  return (
    <>
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
                <InputLabel error={!!errors.skus}>Mã sản phẩm</InputLabel>
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
                        {skusCodeDataEvent.map((code: string) => (
                          <MenuItem key={code} value={code}>
                            {code}
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
              {/* <FormControl>
                <RadioGroup
                  name="radio-buttons-group"
                  sx={{ flexDirection: 'row' }}
                  value={userType}
                  onChange={(e) => handleUserType(e.target.value)}
                >
                  <FormControlLabel
                    value="allUser"
                    control={<Radio />}
                    label="Toàn bộ người dùng"
                  />
                  <FormControlLabel
                    value="newUser"
                    control={<Radio />}
                    label="Người dùng mới"
                  />
                </RadioGroup>
              </FormControl> */}

              <Controller
                name="userRegisterDate"
                control={control}
                render={({ field }) => (
                  <Stack
                    position={'relative'}
                    width="100%"
                    display={`${
                      (getValues().typeUser === 'allUser' && 'none') || 'display'
                    }`}
                  >
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
          <Button variant="contained" sx={{ mx: '7px' }} onClick={handleRedirectToView}>
            Hủy chỉnh sửa
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
