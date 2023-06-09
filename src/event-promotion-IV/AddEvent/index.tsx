import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS, FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues, STATUS, userTypeCons } from '../constant';
import {
  buttonTypeState,
  productState,
  setButtonType,
  setProduct,
  setUserType,
  userTypeState,
} from '../eventPromotionIV.slice';
import { useAddNewEvent } from '../hooks/useAddNewEvent';
import { IEventFormData, IProCodeSelect } from '../interface';
import { schemaAddEvent } from '../schema';
import { getProductCode } from '../service';

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
    watch,
    reset,
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
      status: data.status ? STATUS.ACTIVE : STATUS.IN_ACTIVE,
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

  const handleStatusUserType = (userType: userTypeCons) => {
    dispatch(setUserType(userType));
    setValue('typeUser', userType);
    if (userType === userTypeCons.ALLUSER) {
      reset({
        userRegisterDate: null,
      });
    }
  };
  const userTypeValue = useSelector(userTypeState);

  const product = useSelector(productState);

  return (
    <>
      <HeaderBreadcrumbs
        heading="TẠO MỚI SỰ KIỆN"
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
        <Card sx={{ padding: 2 }}>
          <Scrollbar>
            <Stack spacing="26px">
              <RHFTextField name="name" label="Tên sự kiện*" fullWidth sx={{ mt: 2 }} />
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
                        inputFormat={FORMAT_DATE_NEWS}
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
                        inputFormat={FORMAT_DATE_NEWS}
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

              <Box sx={{ zIndex: 1001 }} minHeight="65px">
                <RHFSelectPagitnationMultiple
                  name={'skus'}
                  getAsyncData={getProductCode}
                  placeholder="  Mã sản phẩm*  "
                  error={errors}
                />
                <FormHelperText error sx={{ marginLeft: '10px' }}>
                  {errors?.skus?.message}
                </FormHelperText>
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
                  sx={{ flexDirection: 'row', paddingLeft: 2 }}
                  onChange={(e) => handleStatusUserType(e.target.value as userTypeCons)}
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
                      label="Ngày tính người dùng mới*"
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
              <Typography marginTop={0.9} marginRight={1}>
                Trạng thái quà
              </Typography>
              <RHFSwitch name={'status'} label="" />
            </Stack>
          </Scrollbar>
        </Card>
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
