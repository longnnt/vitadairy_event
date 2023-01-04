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
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { schemaAddEvent } from 'src/event-promotion-IV/schema';
import { DEFAULT_EDIT_VALUE, LIST_GROUP_EVENT } from 'src/event-q1-groupEvent/contants';
import { schemaAddEditGroupEvent } from 'src/event-q1-groupEvent/schema';
import { IDataListGroupEventById, IEventSelectProps, IFormDataGroupEvent, IListGroupEventById } from 'src/event-q1-groupEvent/interfaces';
import { useAddNewGroupEvent } from 'src/event-q1-groupEvent/hooks/useAddNewGroupEvent';
import { useGetEventNotInGroup } from 'src/event-q1-groupEvent/hooks/useGetEventNotInGroup';
import { useGetGroupEventById } from 'src/event-q1-groupEvent/hooks/useGetGroupEventById';
import { getEventNotInGroup, getGroupEventById } from 'src/event-q1-groupEvent/services';
import { useEditNewGroupEvent } from 'src/event-q1-groupEvent/hooks/useEditGroupEvent';
import { RHFSelectPaginationGroupEvent } from 'src/event-q1-groupEvent/common/components/RHFSelectPaginationMutiple';
import { useEffect } from 'react';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import { alertStatusGroupEventSelector, isConfirmEditGroupEventSelector, modalStatusGroupEventSelector, setAlert, setIsConfirmEdit, setModalStatus } from 'src/event-q1-groupEvent/groupEvent.slice';

export const EditGroupEventForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenEditModal = () => dispatch(setModalStatus(true));
  const handleCloseEditModal = () => dispatch(setModalStatus(false));
  const openEditModal = useSelector(modalStatusGroupEventSelector);
  const confirmEdit = useSelector(isConfirmEditGroupEventSelector);
  
  const handleOnAgree = () => {
    dispatch(setIsConfirmEdit(true));
  };

  const methods = useForm<IListGroupEventById>({
    resolver: yupResolver(schemaAddEditGroupEvent),
    defaultValues: DEFAULT_EDIT_VALUE,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;
  
  const {data:dataEventNotInGroup} = useGetEventNotInGroup();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const { mutate } = useEditNewGroupEvent({
    onError: () => {
      showErrorSnackbar('Tạo mới thất bại');
    },
    onSuccess:() => {
      showSuccessSnackbar('Tạo mới thành công');
      navigate(PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent);
    }
  });

  const onSubmit = (data: any) => {
    handleOpenEditModal();
  };  
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useGetGroupEventById({
    id: parseInt(id as string)
  });

  const dataGroupEventDetail = data?.data?.response;
  
  useDeepCompareEffect(() => {
    if (dataGroupEventDetail) {
      reset(dataGroupEventDetail);
    }
  }, [dataGroupEventDetail]);

  useEffect(() => {
    if (dataGroupEventDetail)
      setValue(
        'events',
        dataGroupEventDetail.events.map((item) => ({ value: item?.id, label: item?.name }))
      );
  }, [dataGroupEventDetail]);

  useDeepCompareEffect(() => {
    const dataForm = watch();
    if(confirmEdit){
      const formDataEditGroupEvent: IFormDataGroupEvent = {
        id: parseInt(id as string),
        name: dataForm.name,
        eventIds: dataForm.events.map((item: IEventSelectProps) => item.value),
      };
      mutate(formDataEditGroupEvent);
      dispatch(setIsConfirmEdit(false));
      navigate(PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent);
      showSuccessSnackbar('Chỉnh sửa thành công');
    }
  },[confirmEdit])
  
  return (
    <>
      <HeaderBreadcrumbs
        heading={BREADCUMBS.EDIT_GROUP_EVENT}
        links={[
          { name: BREADCUMBS.MANAGE_GROUP_EVENT, href: PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent},
          { name: BREADCUMBS.EDIT_GROUP_EVENT },
        ]}
      />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Thông tin Group Event
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ pt: 3}}>
            <Stack spacing="26px" >
              <Stack direction={'row'} spacing='26px'>
                <RHFTextField name="id" label="ID" disabled/>
                <RHFTextField name="name" label="Tên Group Event*" />
              </Stack>
                <Box sx={{ zIndex: 1001 }} minHeight="65px">
                  <RHFSelectPaginationGroupEvent
                    name={'events'}
                    getAsyncData={dataEventNotInGroup}
                    placeholder="Danh sách Event"
                    error={errors}
                  />
                  <FormHelperText error sx={{ marginLeft: '10px' }}>
                    {errors?.events?.message}
                  </FormHelperText>
                </Box>
            </Stack>
          </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '26px' }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              type="submit"
              // onClick={() => dispatch(setButtonType('saveSubmit'))}
            >
              Lưu thay đổi
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent)}
            >
              Hủy chỉnh sửa
            </Button>
          </Stack>
          
        </Box>
        <ConfirmEditModal
          open={openEditModal}
          handleClose={handleCloseEditModal}
          handleOnAgree={handleOnAgree}
          type="Chỉnh sửa group event"
          colorType={true}
          />
      </FormProvider>
    </>
  );
};
