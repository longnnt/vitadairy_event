import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  InputAdornment,
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

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { ProductCodeModal } from '../components/ProductCodeModal';
import { defaultValues } from '../constant';
import {
  buttonTypeState,
  productState,
  setButtonType,
  setIsOpenModal,
  setProduct,
  setUserType,
  userTypeState,
} from '../eventPromotionIV.slice';
import { useAddNewEvent } from '../hooks/useAddNewEvent';
import { IEventFormData, UserType } from '../interface';
import { schemaAddEvent } from '../schema';

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
    reset: resetSelect,
    setValue,
    formState: { errors },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess, data } = useAddNewEvent({
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
      id: 1,
    };
    mutate(formDataAddNewEvent);
    dispatch(setProduct([]));
  };

  useEffect(() => {
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

  useEffect(() => {
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
      <ProductCodeModal />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Scrollbar sx={{ marginTop: '20px' }}>
          <Card sx={{ p: '20px 40px 48px' }} variant="outlined">
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

              <RHFTextField
                name="skus"
                label="Mã sản phẩm"
                onClick={() => dispatch(setIsOpenModal(true))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ position: 'absolute', right: 0, marginRight: '10px' }}
                    >
                      <KeyboardArrowDownIcon />
                    </InputAdornment>
                  ),
                }}
              />

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
          </Card>
        </Scrollbar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => dispatch(setButtonType('saveSubmit'))}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            sx={{ mx: '7px' }}
            type="submit"
            onClick={() => dispatch(setButtonType('saveEditSubmit'))}
          >
            Lưu & chỉnh sửa
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
