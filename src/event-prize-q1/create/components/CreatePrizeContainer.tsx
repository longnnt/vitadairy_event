import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import {
  IFormSubmitCreate,
  IGiftParams,
  IPrizeCreateData,
  IProvinceData,
  IProvinceDetail,
  ISelectType,
} from 'src/event-prize-q1/interface';
import { DateTimePicker } from '@mui/x-date-pickers';
import { RHFSelectPrizeGift } from './RHFSelectPrizeGift';
import ProvinceTable from './ProvinceTable';
import { useSelector, dispatch } from 'src/common/redux/store';
import {
  setCountPrizeProvince,
  setFormEndDate,
  setFormStartDate,
  setIsCustomerExclusion,
  setIsCustomerGroupExclusion,
  setIsStoreExclusion,
  setIsStoreGroupExclusion,
  setStatusPrize,
} from 'src/event-prize-q1/eventPrizeQ1.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { getCrmTransaction, getGift } from 'src/event-prize-q1/services';
import { RHFSelectPaginationSingle } from 'src/common/components/hook-form/RHFSelectPaginationSingle';
import { createEventPrizeValidate } from 'src/event-prize-q1/prize.schema';
import { useGetListProvince } from 'src/event-prize-q1/hooks/useGetListProvince';
import { useAddEventPrize } from 'src/event-prize-q1/hooks/useAddEventPrize';
import useMessage from 'src/common/hooks/useMessage';
import dayjs from 'dayjs';
import RHFSwitch from './RHFSwitch';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { paramsProvince, searchParamsGift } from 'src/event-prize-q1/constants';

export default function CreatePrizeContainer() {
  const {
    isStoreExclusion,
    isStoreGroupExclusion,
    isCustomerExclusion,
    isCustomerGroupExclusion,
    countPrizeProvince,
    statusPrize,
  } = useSelector((state) => state.eventPrizeQ1);
  const navigate = useNavigate();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const params = useParams();
  const eventId = params?.eventId;

  const { data: addProvince } = useGetListProvince(paramsProvince);
  const dataProvince = addProvince?.data?.response || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const provinceId = addProvinceVN
    ? addProvinceVN.map((item: ISelectType) => item.value)
    : [];

  const methods = useForm<IPrizeCreateData>({
    resolver: yupResolver(createEventPrizeValidate(provinceId)),
    defaultValues: {
      isCustomerExclusion: false,
      isStoreExclusion: false,
      isCustomerGroupExclusion: false,
      isStoreGroupExclusion: false,
      status: false,
      startDate: null,
      endDate: null,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    clearErrors,
    setError,
    register,
    formState: { errors },
  } = methods;

  const onSuccess = () => {
    showSuccessSnackbar('Tạo giải thành công');

    dispatch(setFormStartDate(null));
    dispatch(setFormEndDate(null));
    dispatch(setIsStoreExclusion(false));
    dispatch(setIsStoreGroupExclusion(false));
    dispatch(setIsCustomerExclusion(false));
    dispatch(setIsCustomerGroupExclusion(false));
    dispatch(setCountPrizeProvince(0));

    navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, { eventId: eventId }));
  };

  const onError = () => {
    showErrorSnackbar('Lưu giải thất bại');
  };

  const { mutate, isLoading } = useAddEventPrize({ onSuccess, onError });

  const onSubmit = (data: any) => {
    if (countPrizeProvince > data.quantity) {
      return showErrorSnackbar(
        'Số lượng giải ở các tỉnh thành cộng lại cần nhỏ hơn hoặc bằng số lượng tổng giải thưởng có'
      );
    }

    if (eventId === undefined) {
      return showErrorSnackbar('Không tìm thấy event. Vui lòng thử lại');
    }

    const isCountProvinceData = Object.values(data.eventDetailProvinces).length === 0;
    const isRequiredDatetime = !data.startDate || !data.endDate;
    const isTimeValid =
      new Date(data.startDate).getTime() >= new Date(data.endDate).getTime() &&
      data.startDate &&
      data.endDate;

    if (isCountProvinceData) {
      if (isRequiredDatetime) {
        !data.startDate &&
          setError('startDate', {
            type: 'required',
            message: 'Vui lòng nhập ngày bắt đầu',
          });
        !data.endDate &&
          setError('endDate', {
            type: 'required',
            message: 'Vui lòng nhập ngày kết thúc',
          });
        return;
      }

      if (isTimeValid)
        return setError('startDate', {
          type: 'required',
          message: 'Ngày bắt đầu phải trước ngày kết thúc',
        });
    }

    let dataSend: IFormSubmitCreate = {
      quantity: data.quantity,
      eventId: parseInt(eventId),
      giftId: data.giftId.value,
      startDate: data.startDate,
      endDate: data.endDate,
      ordinal: data.ordinal,
      status: statusPrize,
      crmTransactionTypeId: data.crmTransactionTypeId.value,
      isCustomerExclusion: isCustomerExclusion,
      isCustomerGroupExclusion: isCustomerGroupExclusion,
      isStoreExclusion: isStoreExclusion,
      isStoreGroupExclusion: isStoreGroupExclusion,
    };

    if (data.eventDetailProvinces && data.eventDetailProvinces !== undefined) {
      const array: IProvinceData[] = [];
      const eventDetailProvincesArray = Object.keys(data.eventDetailProvinces)?.map(
        (item) => {
          const dataConvert = {
            provinceId: data.eventDetailProvinces[item].provinceId,
            quantity: parseInt(data.eventDetailProvinces[item].quantity),
            startDate: dayjs(data.eventDetailProvinces[item].startDate),
            endDate: dayjs(data.eventDetailProvinces[item].endDate),
          };
          array.push(dataConvert);
        }
      );
      dataSend = { ...dataSend, eventDetailProvinces: array };
    // dataSend = {...dataSend, eventDetailProvinces: data.eventDetailProvinces}
    }

    if (watch().startDate || watch().endDate) {
      dataSend.eventDetailProvinces = null;
    }
    mutate(dataSend);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack direction={'row'} spacing={3}>
            <Box sx={{ width: '70%', zIndex: 1100 }}>
              <RHFSelectPrizeGift
                name={'giftId'}
                placeholder="Tên giải*"
                getAsyncData={getGift}
                searchParams={searchParamsGift}
                error={errors}
              />
              <FormHelperText error sx={{ marginLeft: '10px' }}>
                {errors?.giftId?.message}
              </FormHelperText>
            </Box>

            <RHFTextField
              name="quantity"
              type="number"
              label="Số lượng tổng giải*"
              sx={{ width: '30%' }}
              onWheelCapture={(e) => {
                (document.activeElement as HTMLElement).blur();
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
                    label="Ngày bắt đầu*"
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
                    label="Ngày kết thúc*"
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
                <Typography variant="body1">
                  Giải loại trừ event theo tệp chủ shop
                </Typography>
                <RHFSwitch
                  name="isStoreExclusion"
                  label=""
                  data={isStoreExclusion}
                  onChange={() => dispatch(setIsStoreExclusion(!isStoreExclusion))}
                />
              </Stack>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1">
                  Giải loại trừ event group theo tệp chủ shop
                </Typography>
                <RHFSwitch
                  name="isStoreGroupExclusion"
                  label=""
                  data={isStoreGroupExclusion}
                  onChange={() =>
                    dispatch(setIsStoreGroupExclusion(!isStoreGroupExclusion))
                  }
                  disabledCheck={!isStoreExclusion}
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
                <Typography variant="body1">
                  Giải loại trừ event theo tệp người dùng
                </Typography>
                <RHFSwitch
                  name="isCustomerExclusion"
                  label=""
                  data={isCustomerExclusion}
                  onChange={() => dispatch(setIsCustomerExclusion(!isCustomerExclusion))}
                />
              </Stack>
              <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction="row"
                sx={{ width: '65%' }}
              >
                <Typography variant="body1">
                  Giải loại trừ event group theo tệp người dùng
                </Typography>
                <RHFSwitch
                  name="isCustomerGroupExclusion"
                  label=""
                  data={isCustomerGroupExclusion}
                  onChange={() =>
                    dispatch(setIsCustomerGroupExclusion(!isCustomerGroupExclusion))
                  }
                  disabledCheck={!isCustomerExclusion}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {!watch().startDate && !watch().endDate && <ProvinceTable />}

      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ width: '100%', mt: 5 }}
      >
        <Button variant="contained" type="submit">
          Lưu
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
    </FormProvider>
  );
}
