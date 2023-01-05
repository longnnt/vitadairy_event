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
  InputAdornment
} from '@mui/material';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';

import { DatePicker, DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Scrollbar from 'src/common/components/Scrollbar';
import { BREADCUMBS, FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues } from 'src/manage-event-quarter-one/common/constants';
import { schemaAddManageEvent } from 'src/manage-event-quarter-one/manageEvent.schema';
import { IProCodeSelect, ISubmitCreateEvent } from 'src/manage-event-quarter-one/common/interface';
import { getEventGroup, getProductCode } from 'src/manage-event-quarter-one/services';
import { usePostCreateEventAdmin } from 'src/manage-event-quarter-one/hooks/usePostCreateEventAdmin';
import { setProduct } from 'src/manage-event-quarter-one/manageEvent.slice';
import { STATUS } from 'src/event-promotion-IV/constant';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import { SelectSingleEvent } from './SelectSingleEvent';
import { setButtonType, buttonTypeState } from 'src/event-promotion-IV/eventPromotionIV.slice';

function CreateEventDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonTypeValue = useSelector(buttonTypeState);
  const methods = useForm<ISubmitCreateEvent>({
    resolver: yupResolver(schemaAddManageEvent),
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

  const { mutate, isSuccess, data } = usePostCreateEventAdmin({
    onError: () => {
      showErrorSnackbar('Tạo mới sự kiện thất bại');
    },
  });

  const onSubmit = (data: ISubmitCreateEvent) => {
    const formDataCreateEvent  =  {
      name: data.name,
      eventGroupId: data?.eventGroupId?.value as string,
      startDate: data.startDate,
      endDate: data.endDate,
      eventCustomerLimit: data.eventCustomerLimit as number,
      eventStoreLimit: data.eventStoreLimit as number,
      skus: data?.skus?.map((item) => item.value) || [],
      defaultWinRate: data.defaultWinRate as number,
      upRate: data.upRate as number,
      downRate: data.downRate as number,
      status: data.status ? STATUS.ACTIVE : STATUS.IN_ACTIVE,
    };
    mutate(formDataCreateEvent);
    dispatch(setProduct([]));
  };

  useDeepCompareEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.manageEventQuarterOne.list);
    }
  }, [isSuccess]);

  return (
    <>
      <HeaderBreadcrumbs
        heading={BREADCUMBS.MANAGE_CREATE_EVENT}
        links={[
          { name: BREADCUMBS.MANAGE_LIST_EVENT, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.MANAGE_CREATE_EVENT },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2 }}>
          <Scrollbar>
            <Stack spacing="26px">
              <Stack direction={'row'} spacing={2} marginTop={1}>
                <Stack width={700}>

              <RHFTextField name="name" label="Tên sự kiện*"  />
                </Stack>
                <Stack>

              <Box sx={{ zIndex: 1001 }} width={470}>
                <SelectSingleEvent
                  name={'eventGroupId'}
                  getAsyncData={getEventGroup}
                  placeholder="Mã nhóm sự kiện"
                  error={errors}
                />
              </Box>
                </Stack>
              </Stack>
              <Stack
                spacing={2}
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
                      <MobileDateTimePicker
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
              <Stack direction={'row'} spacing={2}>
                <RHFTextField sx={{width: '300px'}} name="eventCustomerLimit" label="Giới hạn trúng giải trên tệp người dùng*" />
                <RHFTextField sx={{width: '300px'}} name="eventStoreLimit" label="Giới hạn trúng giải trên tệp cửa hàng*" />
                <RHFSwitch name={'status'} label="Trạng thái" labelPlacement='start' />
              </Stack>

              <Box sx={{ zIndex: 500 }} height="65px">
                <RHFSelectPagitnationMultiple
                  name={'skus'}
                  getAsyncData={getProductCode}
                  placeholder="Mã sản phẩm*"
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

            </Stack>
          </Scrollbar>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Stack direction="row" spacing={2}>
          <Button
              variant="contained"
              type="submit"
              onClick={() => dispatch(setButtonType('saveSubmit'))}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(PATH_DASHBOARD.manageEventQuarterOne.list)}
            >
              Hủy
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};

export {CreateEventDashboard}