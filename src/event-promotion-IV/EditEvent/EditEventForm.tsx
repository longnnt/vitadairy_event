import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormHelperText,
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
import { schemaAddEvent, schemaEditEvent } from '../schema';
import { ProductCodeModal } from '../components/ProductCodeModal';
import { IEventEditFormData, IProCodeSelect, IEventFormData } from '../interface';
import { RHFSelectPagitnation } from 'src/common/components/hook-form/RHFSelectPagination';
import { getProductCode } from '../service';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import { DEFAULT_EDIT_VALUE } from '../constant';

export const EditEventForm = () => {
  const navigate = useNavigate();

  const methods = useForm<IEventEditFormData>({
    resolver: yupResolver(schemaEditEvent),
    defaultValues: DEFAULT_EDIT_VALUE,
  });

  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useGetEventById({
    id: parseInt(id as string),
    callback: {
      onError: () => showErrorSnackbar('Lấy thông tin sự kiện thất bại'),
    },
  });
  const dataEventDetail = data?.data?.response;

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

  const watchUserType = watch('typeUser');

  const { mutate, isSuccess } = useEditEvent({
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    const formDataAddNewEvent = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      skus: data.skus.map((item: IProCodeSelect) => item.value),
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      userRegisterDate: data.userRegisterDate,
      userLimit: data.userLimit,
      id: Number(id),
    };
    mutate({ id: parseInt(id as string), formEditData: formDataAddNewEvent });
  };
  // const product = useSelector(productState);

  useDeepCompareEffect(() => {
    if (dataEventDetail) {
      reset(dataEventDetail);
      // dispatch(setProduct(dataEventDetail.skus));
    }
  }, [dataEventDetail]);

  useEffect(() => {
    if (dataEventDetail)
      setValue(
        'skus',
        dataEventDetail.skus.map((item: string) => ({ value: item, label: item }))
      );
  }, [dataEventDetail]);

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventPromotionIV.list);
  }, [isSuccess]);

  const handleRedirectToView = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };
  useDeepCompareEffect(() => {
    const data = watch();
    if (data.typeUser === 'allUser') data.userRegisterDate = null;
    if (confirmEdit) {
      const dataEdit: any = {
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
      mutate({ id: parseInt(id as string), formEditData: dataEdit });
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

              {/* <RHFTextField
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
              /> */}
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
                  <Stack
                    position={'relative'}
                    width="100%"
                    display={`${(watchUserType === 'allUser' && 'none') || 'display'}`}
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
          type="Chỉnh sửa sự kiện"
          colorType={true}

          // setConfirmEdit={setConfirmEdit}
        />
      </FormProvider>
    </>
  );
};
