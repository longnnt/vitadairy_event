import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  Switch,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import {
  IEventPrize,
  IFormCreateProvince,
  IFormSubmitCreate,
  IGiftParams,
  IPrizeCreateData,
  IProvinceData,
  IProvinceDetail,
  ISelectType,
} from 'src/event-prize-q1/interface';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSelector, dispatch } from 'src/common/redux/store';
import {
  setConfirmEdit,
  setCountPrizeProvince,
  setCrmTypeIdEdit,
  setFormEndDate,
  setFormStartDate,
  setGiftIdEdit,
  setIsCustomerExclusion,
  setIsCustomerGroupExclusion,
  setIsStoreExclusion,
  setIsStoreGroupExclusion,
  setOpenEditModal,
  setPrizeQuantityChange,
  setStatusPrize,
} from 'src/event-prize-q1/eventPrizeQ1.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import useMessage from 'src/common/hooks/useMessage';
import { useGetListProvince } from 'src/event-prize-q1/hooks/useGetListProvince';
import { createEventPrizeValidate } from 'src/event-prize-q1/prize.schema';
import dayjs from 'dayjs';
import { getCrmTransaction, getGift } from 'src/event-prize-q1/services';
import RHFSwitch from 'src/event-prize-q1/create/components/RHFSwitch';
import ProvinceTable from 'src/event-prize-q1/create/components/ProvinceTable';
import { useGetDetailPrize } from 'src/event-prize-q1/hooks/useGetDetailPrize';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { RHFSelectPaginationSingle } from './RHFSelectPaginationSingle';
import { useUpdateEventPrize } from 'src/event-prize-q1/hooks/useUpdateEventPrize';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { RHFSelectGift } from './RHFSelectGift';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { paramsProvince, searchParamsGift } from 'src/event-prize-q1/constants';
import { number } from 'yup';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';

export default function EditPrizeContainer() {
  const {
    isStoreExclusion,
    isStoreGroupExclusion,
    isCustomerExclusion,
    isCustomerGroupExclusion,
    crmTypeIdEdit,
    countPrizeProvince,
    statusPrize,
    giftIdEdit,
    prizeQuantityChange,
    openEditModal,
    confirmEdit,
  } = useSelector((state) => state.eventPrizeQ1);
  const navigate = useNavigate();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const { eventId, prizeId } = useParams();

  const { data: prizeDetail } = useGetDetailPrize(parseInt(prizeId || ''));
  const prizeDataDetail: IEventPrize = prizeDetail?.data?.response || {};

  const { data: addProvince } = useGetListProvince(paramsProvince);
  const dataProvince = addProvince?.data?.response || [];
  const addProvinceVN = dataProvince?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const provinceId = addProvinceVN
    ? addProvinceVN.map((item: ISelectType) => item.value)
    : [];

  const methods = useForm<IPrizeCreateData>({
    resolver: yupResolver(createEventPrizeValidate(provinceId)),
    defaultValues: {
      quantity: prizeDataDetail.quantity || 0,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
    resetField,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSuccess = () => {
    dispatch(setCrmTypeIdEdit(0));
    dispatch(setGiftIdEdit(0));
    dispatch(setFormStartDate(null));
    dispatch(setFormEndDate(null));
    dispatch(setIsStoreExclusion(false));
    dispatch(setIsStoreGroupExclusion(false));
    dispatch(setIsCustomerExclusion(false));
    dispatch(setIsCustomerGroupExclusion(false));
    dispatch(setCountPrizeProvince(0));
    dispatch(setPrizeQuantityChange(null));

    showSuccessSnackbar('Sửa thông tin giải thành công');
    navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: eventId }));
  };

  const onError = () => {
    showErrorSnackbar('Chỉnh sửa thông tin giải thất bại');
  };

  const { mutate, isLoading } = useUpdateEventPrize({ onSuccess, onError });

  const onSubmit = (data: any) => {
    if (
      countPrizeProvince >
      data.quantity + (prizeQuantityChange ? prizeQuantityChange : 0)
    ) {
      return showErrorSnackbar(
        'Số lượng giải ở các tỉnh thành cộng lại cần nhỏ hơn hoặc bằng số lượng tổng giải thưởng có'
      );
    }
    const isCountProvinceData = Object.values(data.eventDetailProvinces).length === 0;

    if(!data.startDate && !data.endDate && isCountProvinceData) {
        setError('startDate', { type: 'required', message: 'Vui lòng ngày bắt đầu' });
        setError('endDate', { type: 'required', message: 'Vui lòng ngày kết thúc' });
        return;
    }

    const isHasStartDateEndDate = data.startDate || data.endDate;
    const isRequiredDatetime = !data.startDate || !data.endDate;
    const isTimeValid =
      new Date(data.startDate?.toString()).getTime() >= new Date(data.endDate?.toString()).getTime() &&
      data.startDate &&
      data.endDate;

    if (isHasStartDateEndDate) {
      // @ts-ignore
      setValue('eventDetailProvinces', {});
    }

    if (isCountProvinceData) {
      if (isRequiredDatetime) {
        !data.startDate &&
          setError('startDate', { type: 'required', message: 'Vui lòng ngày bắt đầu' });
        !data.endDate &&
          setError('endDate', { type: 'required', message: 'Vui lòng ngày kết thúc' });
        return;
      }

      if (isTimeValid)
        return setError('startDate', {
          type: 'required',
          message: 'Ngày bắt đầu phải trước ngày kết thúc',
        });
    }
    dispatch(setOpenEditModal(true));
  };

  useDeepCompareEffect(() => {
    const data = watch();
    if (confirmEdit) {
      let dataSend: IFormSubmitCreate = {
        id: prizeDataDetail?.id,
        quantity: prizeQuantityChange ? prizeQuantityChange : 0,
        eventId: parseInt(eventId || ''),
        giftId: giftIdEdit,
        startDate: data.startDate,
        endDate: data.endDate,
        ordinal: data.ordinal,
        status: statusPrize,
        crmTransactionTypeId: crmTypeIdEdit,
        isCustomerExclusion: isCustomerExclusion,
        isCustomerGroupExclusion: isCustomerExclusion ? isCustomerGroupExclusion : false,
        isStoreExclusion: isStoreExclusion,
        isStoreGroupExclusion: isStoreExclusion ? isStoreGroupExclusion : false,
      };

      if (data.eventDetailProvinces && data.eventDetailProvinces !== undefined) {
        const array: IProvinceDetail[] = [];
        const dataProvince: IFormCreateProvince =
          data.eventDetailProvinces as unknown as IFormCreateProvince;
        const eventDetailProvincesArray = Object.keys(data.eventDetailProvinces)?.map(
          (item: string) => {
            const dataConvert = {
              provinceId: dataProvince[item].provinceId,
              quantity: dataProvince[item].quantity,
              startDate: dayjs(dataProvince[item].startDate),
              endDate: dayjs(dataProvince[item].endDate),
            };
            array.push(dataConvert);
          }
        );
        dataSend = {
          ...dataSend,
          eventDetailProvinces: array as unknown as IProvinceData[],
        };
      }

      if (watch().startDate || watch().endDate) {
        dataSend.eventDetailProvinces = null;
    }
      mutate(dataSend);
      dispatch(setConfirmEdit(false));
    }
  }, [confirmEdit]);

  const handleCloseEditModal = () => dispatch(setOpenEditModal(false));

  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };

  useDeepCompareEffect(() => {
    if (prizeDataDetail) {
      const data = {
        giftId: prizeDataDetail.giftId,
        quantity: prizeDataDetail.quantity,
        startDate: prizeDataDetail.startDate,
        endDate: prizeDataDetail.endDate,
        ordinal: prizeDataDetail.ordinal,
        crmTransactionTypeId: prizeDataDetail.crmTransactionTypeId,
      };
      reset(data);
      dispatch(setCrmTypeIdEdit(prizeDataDetail.crmTransactionTypeId));
      dispatch(setGiftIdEdit(prizeDataDetail.giftId));
      dispatch(setFormStartDate(prizeDataDetail.startDate));
      dispatch(setFormEndDate(prizeDataDetail.endDate));
      dispatch(setIsStoreExclusion(prizeDataDetail.isStoreExclusion));
      dispatch(setIsStoreGroupExclusion(prizeDataDetail.isStoreGroupExclusion));
      dispatch(setIsCustomerExclusion(prizeDataDetail.isCustomerExclusion));
      dispatch(setIsCustomerGroupExclusion(prizeDataDetail.isCustomerGroupExclusion));
      dispatch(setStatusPrize(prizeDataDetail.status));
      dispatch(setPrizeQuantityChange(null));
    }
  }, [prizeDataDetail]);

  useDeepCompareEffect(() => {
    if(watch('startDate') || watch('endDate') ){
        // @ts-ignore
      setValue('eventDetailProvinces', {});
    }
  }, [watch('startDate'), watch('endDate') ])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack direction={'row'} spacing={3}>
            <RHFTextField
              name="id"
              type="number"
              label="ID"
              sx={{ width: '20%' }}
              value={prizeDataDetail?.id}
              disabled
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ width: '40%', zIndex: 1100 }}>
              <RHFSelectGift
                name={'giftId'}
                placeholder="Tên giải*"
                getAsyncData={getGift}
                searchParams={searchParamsGift}
                error={errors}
                valueGift={prizeDataDetail?.giftId}
              />
              <FormHelperText error sx={{ marginLeft: '10px' }}>
                {errors?.giftId?.message}
              </FormHelperText>
            </Box>

            <RHFTextField
              name="quantity"
              type="number"
              label="Số lượng đang có*"
              sx={{ width: '20%' }}
              onWheelCapture={(e) => {
                (document.activeElement as HTMLElement).blur();
              }}
              value={prizeDataDetail?.quantity}
              disabled
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              name="quantityChange"
              type="number"
              label="Số lượng nhập vào"
              sx={{ width: '20%' }}
              onWheelCapture={(e) => {
                (document.activeElement as HTMLElement).blur();
              }}
              value={prizeQuantityChange}
              onChange={(e) => {
                dispatch(setPrizeQuantityChange(parseFloat(e.target.value)));
              }}
            />
          </Stack>
          <Stack direction={'row'} spacing={3}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
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
                        helperText={errors.startDate && errors.startDate?.message}
                        error={!!errors.startDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Stack position={'relative'} width="100%">
                  <DateTimePicker
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

          <Stack direction={'row'} spacing={3}>
            <RHFTextField
              name="ordinal"
              key={'ordinal'}
              type="number"
              label="Thứ tự trúng giải*"
              InputLabelProps={{ shrink: true }}
              onWheelCapture={(e) => {
                (document.activeElement as HTMLElement).blur();
              }}
            />
          </Stack>
          <Box sx={{ zIndex: 1001, marginTop: 1 }}>
            <RHFSelectPaginationSingle
              name={'crmTransactionTypeId'}
              getAsyncData={getCrmTransaction}
              searchParams={{ page: 0 }}
              placeholder="CRM Transaction Type*"
              error={errors}
              defaultvalue={prizeDataDetail?.crmTransactionTypeId}
            />
            <FormHelperText error sx={{ marginLeft: '10px' }}>
              {errors?.crmTransactionTypeId?.message}
            </FormHelperText>
          </Box>

          <Stack spacing={5} direction="row">
            <Box sx={{ width: '50%' }}>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1" sx={{color: '#919EAB'}}>
                  Giải loại trừ event theo tệp chủ shop
                </Typography>
                <Switch
                  checked={prizeDataDetail?.isStoreExclusion}
                  onClick={(e) => e.preventDefault()}
                  disabled
                />
              </Stack>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1" sx={{color: '#919EAB'}}>
                  Giải loại trừ event group theo tệp chủ shop
                </Typography>
                <Switch
                  checked={prizeDataDetail?.isStoreGroupExclusion}
                  onClick={(e) => e.preventDefault()}
                  disabled
                />
              </Stack>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1">Trạng thái giải</Typography>
                <RHFSwitch
                  name="status"
                  label=""
                  data={statusPrize}
                  onChange={() => dispatch(setStatusPrize(!statusPrize))}
                />
              </Stack>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1" sx={{color: '#919EAB'}}>
                  Giải loại trừ event theo tệp người dùng
                </Typography>
                <Switch
                  checked={prizeDataDetail?.isCustomerExclusion}
                  onClick={(e) => e.preventDefault()}
                  disabled
                />
              </Stack>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1" sx={{color: '#919EAB'}}>
                  Giải loại trừ event group theo tệp người dùng
                </Typography>
                <Switch
                  checked={prizeDataDetail?.isCustomerGroupExclusion}
                  onClick={(e) => e.preventDefault()}
                  disabled
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {!watch().startDate && !watch().startDate && (
        <ProvinceTable 
        dataProvinceAPI={prizeDataDetail?.eventDetailProvinces}
        countWonPrize={prizeDataDetail?.totalWonAmount}
         />
      )}

      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ width: '100%', mt: 5 }}
      >
        <Button variant="contained" type="submit">
          Lưu thay đổi
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            navigate(
              replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: eventId })
            );
          }}
        >
          Hủy
        </Button>
      </Stack>
      <ConfirmEditModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleOnAgree={handleOnAgree}
        type="Chỉnh sửa giải thưởng này"
        colorType={true}
      />
    </FormProvider>
  );
}
