import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  responsiveFontSizes,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Scrollbar from 'src/common/components/Scrollbar';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFRadioGroup,
  RHFTextField,
} from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';

import {
  confirmEditSelector,
  openEditModalSelector,
  productState,
  setConfirmEdit,
  setIsOpenModal,
  setOpeneditModal,
  setProduct,
  setSelectedIds,
} from '../eventPromotionIV.slice';
import { useEditEvent } from '../hooks/useEditEvent';
import { useGetEventById } from '../hooks/useGetEventById';
import { schemaAddEvent } from '../schema';
import { ProductCodeModal } from '../components/ProductCodeModal';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
 
import { IEventEditFormData, IEventFormData } from '../interface';

export const EditEventForm = () => {
  const navigate = useNavigate();

  const defaultValues = {
    name: '',
    startDate: undefined,
    endDate: undefined,
    skus: [] as string[],
    defaultWinRate: 0,
    upRate: 0,
    downRate: 0,
    userRegisterDate: undefined,
    userLimit: 0,
  };

  const methods = useForm<IEventEditFormData>({
    resolver: yupResolver(schemaAddEvent),
    defaultValues,
  });
  
  const params = useParams();
  const id = params?.id;

  const { data } = useGetEventById({
    id: parseInt(id as string),
    callback: {
      onError: () => showErrorSnackbar('Lấy thông tin sự kiện thất bại'),
    },
  });
  const dataEventDetail= data?.data?.response

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { useDeepCompareEffect } = useDeepEffect();
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const openEditModal = useSelector(openEditModalSelector);
  const confirmEdit = useSelector(confirmEditSelector);



  const { mutate, isSuccess } = useEditEvent({
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });

  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    handleOpenEditModal();
   
  };
  const product = useSelector(productState);

  useDeepCompareEffect(() => {
    if (dataEventDetail) {
      reset(dataEventDetail)
      dispatch(setProduct(dataEventDetail.skus));
    }
  }, [dataEventDetail]);

  useEffect(() => {
    setValue('skus', product);
  }, [product]);

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventPromotionIV.list);
  }, [isSuccess]);

  const handleRedirectToView = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };
  useDeepCompareEffect(() => {
    const data = watch();
    if (confirmEdit) {
      const dataEdit:any={
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
      }
      mutate({id: parseInt(id as string), formEditData: dataEdit })
      dispatch(setConfirmEdit(false));

    }
  }, [confirmEdit]);
  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  return (
    <>
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

              <Controller
                name="userRegisterDate"
                control={control}
                render={({ field }) => (
                  <Stack
                    position={'relative'}
                    width="100%"
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
          <Button variant="contained" color="secondary" type="submit">
            Lưu
          </Button>
          <Button variant="contained" sx={{ mx: '7px' }} onClick={handleRedirectToView}>
            Hủy chỉnh sửa
          </Button>
        </Box>
        <ConfirmEditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            handleOnAgree={handleOnAgree}
            type='Chỉnh sửa sự kiện'
            colorType={true}

            // setConfirmEdit={setConfirmEdit}
          />
      </FormProvider>
    </>
  );
};
