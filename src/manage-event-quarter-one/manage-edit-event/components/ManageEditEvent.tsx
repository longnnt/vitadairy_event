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
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues } from 'src/manage-event-quarter-one/common/constants';
import { schemaAddManageEvent } from 'src/manage-event-quarter-one/manageEvent.schema';
import {
  IEventGroup,
  IFormEditManageEvent,
  IFormManageEvent,
  IProCodeSelect,
} from 'src/manage-event-quarter-one/common/interface';
import { useGetEventOneById } from 'src/manage-event-quarter-one/hooks/useGetEventOneById';
import { getProductCode } from 'src/event-promotion-IV/service';
import { useEffect } from 'react';
import { getEventGroup } from 'src/manage-event-quarter-one/service';
import { useEventGroup } from 'src/manage-event-quarter-one/hooks/useEventGroup';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import { confirmEditSelector, openEditModalSelector, setConfirmEdit, setOpeneditModal } from 'src/event-promotion-IV/eventPromotionIV.slice';
import { STATUS } from 'src/event-promotion-IV/constant';
import { useEditEventOne } from 'src/manage-event-quarter-one/hooks/useEditEventOne';

function EditEventDashboard() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const dispatch:any = useDispatch();
  const confirmEdit = useSelector(confirmEditSelector);
  const openEditModal = useSelector(openEditModalSelector);
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const handleOpenEditModal:any = () => dispatch(setOpeneditModal(true));

  const methods = useForm<IFormEditManageEvent>({
    // resolver: yupResolver(schemaAddManageEvent),
    // defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;
  const { data, isLoading } = useGetEventOneById({
    id: parseInt('168' as string),
    callback: {
      onError: () => showErrorSnackbar('Lấy thông tin sự kiện thất bại'),
    },
  });
  useDeepCompareEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);
  useEffect(() => {
    if (data)
      setValue(
        'skus',
        data.skus.map((item: string) => ({ value: item, label: item }))
      );
  }, [data]);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess } = useEditEventOne({
    onError: () => {
      showErrorSnackbar('Chỉnh sửa sự kiện thất bại');
    },
    // onSuccess: () => {
    //   showSuccessSnackbar('Chỉnh sửa sự kiện thành công');
    // },
  });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.manageEventQuarterOne.list);
  }, [isSuccess]);
const {data:eventGroup}=useEventGroup()
useDeepCompareEffect(() => {
  const data = watch();
  if (confirmEdit) {
    const dataEdit: IFormEditManageEvent = {
      name: data?.name,
      eventGroupId: data?.eventGroupId,
      startDate: data.startDate,
      endDate: data.endDate,
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      eventCustomerLimit: data.eventCustomerLimit,
      eventStoreLimit: data.eventStoreLimit,
      skus: data.skus.map((item: any) => item.value),
      status: data.status ? STATUS.ACTIVE : STATUS.IN_ACTIVE,
      id:168
    };
    mutate({formEditData: dataEdit });
    dispatch(setConfirmEdit(false));
  }
}, [confirmEdit]);
const handleOnAgree = () => {
  dispatch(setConfirmEdit(true));
};
  const onSubmit = () => {
    handleOpenEditModal();
  };

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
              <Stack direction={'row'} spacing={2}>
                <RHFTextField name="name" label="Tên sự kiện*" />
                <RHFSelect name="eventGroupId" label="Tên nhóm sự kiện*" >
                {eventGroup?.map((option:any) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

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
                      <DateTimePicker
                        {...field}
                        label="Ngày bắt đầu*"
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
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <Stack position={'relative'} width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày kết thúc*"
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
              <Stack direction={'row'} spacing={2}>
                <RHFTextField
                  sx={{ width: '300px' }}
                  name="eventCustomerLimit"
                  label="Giới hạn trúng giải trên tệp người dùng*"
                />
                <RHFTextField
                  sx={{ width: '300px' }}
                  name="eventStoreLimit"
                  label="Giới hạn trúng giải trên tệp cửa hàng*"
                />
                <RHFSwitch name={'status'} label="Trạng thái" labelPlacement="start" />
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
            
            </Stack>
          </Scrollbar>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(PATH_DASHBOARD.manageEventQuarterOne.list)}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Chỉnh sửa
            </Button>
          </Stack>

        </Box>
        <ConfirmEditModal
                open={openEditModal}
                handleClose={handleCloseEditModal}
                handleOnAgree={handleOnAgree}
                type="Chỉnh sửa sự kiện Q1"
                colorType={true}

                // setConfirmEdit={setConfirmEdit}
              />
      </FormProvider>
    </>
  );
}

export { EditEventDashboard };
