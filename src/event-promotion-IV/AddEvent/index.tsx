import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues } from '../constant';
import {
  buttonTypeState,
  productState,
  setButtonType,
  setProduct,
  setUserType,
  userTypeState,
} from '../eventPromotionIV.slice';
import { useAddNewEvent } from '../hooks/useAddNewEvent';
import { IEventFormData, IProCodeSelect, UserType } from '../interface';
import { schemaAddEvent } from '../schema';
import { getProductCode } from '../service';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { RHFSelectPagitnation } from 'src/common/components/hook-form/RHFSelectPagination';

export const AddEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonTypeValue = useSelector(buttonTypeState);
  const methods = useForm({
    resolver: yupResolver(schemaAddEvent),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const { mutate, isSuccess, data } = useAddNewEvent({
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });

  const onSubmit = (data: any) => {
    const formDataAddNewEvent: IEventFormData = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      skus: data.skus.map((item: IProCodeSelect) => item.value),
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      userRegisterDate: data.userRegisterDate,
      userLimit: data.userLimit,
      id: 1,
    };
    mutate(formDataAddNewEvent);
    dispatch(setProduct([]));
  };

  useDeepCompareEffect(() => {
    const idEvent = data?.data?.response?.id;
    if (isSuccess) {
      if (buttonTypeValue !== 'saveSubmit') {
        navigate(PATH_DASHBOARD.eventPromotionIV.edit(+idEvent));
      } else {
        navigate(PATH_DASHBOARD.eventPromotionIV.list);
      }
    }
  }, [isSuccess]);

  const handleStatusUserType = (userType: string) => {
    dispatch(setUserType(userType as UserType));
  };
  const userTypeValue = useSelector(userTypeState);

  const product = useSelector(productState);

  useDeepCompareEffect(() => {
    if (product.length > 0) setValue('skus', product);
  }, [product?.length]);

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
          <Stack sx={{ p: '20px 40px 48px', backgroundColor: 'white' }}>
            <Stack spacing="26px">
              <RHFTextField name="name" label="Tên sự kiện*" fullWidth />
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

              <Box sx={{ zIndex: 1001 }}>
                <RHFSelectPagitnation
                  name={'skus'}
                  getAsyncData={getProductCode}
                  placeholder="Mã sản phẩm*"
                />
                {errors && <FormHelperText error>{errors?.skus?.message}</FormHelperText>}
              </Box>

              <RHFTextField
                fullWidth
                label="Tỉ lệ trúng quà mặc định của người dùng (%)*"
                name="defaultWinRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ cộng thêm khi người dùng không trúng quà (%)*"
                name="upRate"
                type="number"
              />
              <RHFTextField
                fullWidth
                label="Tỉ lệ bị trừ đi khi người dùng trúng quà (%)*"
                name="downRate"
                type="number"
              />
              <FormControl>
                <RadioGroup
                  defaultValue="allUser"
                  name="radio-buttons-group"
                  sx={{ flexDirection: 'row' }}
                  onChange={(e) => handleStatusUserType(e.target.value)}
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
              </FormControl>
              <Controller
                name="userRegisterDate"
                control={control}
                render={({ field }) => (
                  <Stack
                    position={'relative'}
                    width="100%"
                    sx={{
                      display: `${(userTypeValue === 'allUser' && 'none') || 'block'}`,
                    }}
                  >
                    <DatePicker
                      {...field}
                      label="Ngày tính người dùng mới"
                      inputFormat="dd/MM/yyyy"
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
                label="Số lần người dùng nhận quà tối đa*"
                type="number"
              />
            </Stack>
          </Stack>
        </Scrollbar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(PATH_DASHBOARD.eventPromotionIV.list)}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={() => dispatch(setButtonType('saveSubmit'))}
            >
              Thêm mới
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => dispatch(setButtonType('saveEditSubmit'))}
            >
              Thêm & Chỉnh sửa
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};
