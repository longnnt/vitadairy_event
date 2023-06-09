import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';

import { DatePicker, DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import Scrollbar from 'src/common/components/Scrollbar';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';

import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import { BREADCUMBS, FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import LoadingSkeletonViewEventScreen from '../components/LoadingViewEventPage';
import { ProductCodeModal } from '../components/ProductCodeModal';
import { DEFAULT_EDIT_VALUE, STATUS } from '../constant';
import {
  confirmEditSelector,
  openEditModalSelector,
  productState,
  setConfirmEdit,
  setOpeneditModal,
  setProduct,
} from '../eventPromotionIV.slice';
import { useEditEvent } from '../hooks/useEditEvent';
import { useGetEventById } from '../hooks/useGetEventById';
import { IEventEditFormData, IProCodeSelect } from '../interface';
import { schemaEditEvent } from '../schema';
import { getProductCode } from '../service';

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
      showErrorSnackbar('Chỉnh sửa sự kiện thất bại');
    },
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa sự kiện thành công');
    },
  });

  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    handleOpenEditModal();
  };
  const product = useSelector(productState);

  useDeepCompareEffect(() => {
    if (dataEventDetail) {
      reset(dataEventDetail);
      dispatch(setProduct(dataEventDetail.skus));
      const isActive: any = dataEventDetail.eventStatus;
      setValue('eventStatus', isActive === STATUS.ACTIVE);
      if (dataEventDetail.userRegisterDate === null) setValue('typeUser', 'allUser');
      else setValue('typeUser', 'newUser');
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
        skus: data.skus.map((item: IProCodeSelect) => item.value),
        defaultWinRate: data.defaultWinRate,
        upRate: data.upRate,
        downRate: data.downRate,
        userRegisterDate: data.userRegisterDate,
        userLimit: data.userLimit,
        status: data.eventStatus ? STATUS.ACTIVE : STATUS.IN_ACTIVE,
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
      {isLoading ? (
        <LoadingSkeletonViewEventScreen />
      ) : (
        <>
          <HeaderBreadcrumbs
            heading="CHỈNH SỬA SỰ KIỆN"
            links={[
              { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
              { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
              { name: 'Sửa sự kiện' },
            ]}
          />
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
                            <MobileDateTimePicker
                              {...field}
                              label="Ngày bắt đầu"
                              inputFormat={FORMAT_DATE_NEWS}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Calendar />
                                  </InputAdornment>
                                ),
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  helperText={
                                    errors.startDate && errors.startDate?.message
                                  }
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
                            <MobileDateTimePicker
                              {...field}
                              label="Ngày kết thúc"
                              inputFormat={FORMAT_DATE_NEWS}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Calendar />
                                  </InputAdornment>
                                ),
                              }}
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
                      <RHFSelectPagitnationMultiple
                        name={'skus'}
                        getAsyncData={getProductCode}
                        placeholder="Mã sản phẩm*"
                        error={errors}
                      />
                      {errors && (
                        <FormHelperText error sx={{ marginLeft: '10px' }}>
                          {errors?.skus?.message}
                        </FormHelperText>
                      )}
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
                    <FormControl sx={{ flexDirection: 'row', paddingLeft: 2 }}>
                      <RHFRadioGroup
                        name="typeUser"
                        options={[
                          { label: 'Toàn bộ người dùng', value: 'allUser' },
                          { label: 'Người dùng mới', value: 'newUser' },
                        ]}
                      />
                    </FormControl>

                    <Controller
                      name="userRegisterDate"
                      control={control}
                      render={({ field }) => (
                        <Stack
                          position={'relative'}
                          width="100%"
                          display={`${
                            (watchUserType === 'allUser' && 'none') || 'display'
                          }`}
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
                                  errors.userRegisterDate &&
                                  errors.userRegisterDate.message
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
                    <RHFSwitch name={'eventStatus'} label="" />
                  </Stack>
                </Card>
              </Scrollbar>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
                <Button variant="contained" color="primary" type="submit">
                  Lưu
                </Button>
                <Button
                  variant="contained"
                  sx={{ mx: '7px' }}
                  color="inherit"
                  onClick={handleRedirectToView}
                >
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
        </>
      )}
    </>
  );
};
