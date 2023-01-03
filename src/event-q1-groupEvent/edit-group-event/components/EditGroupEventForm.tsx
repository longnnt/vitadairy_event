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
import { schemaAddEvent } from 'src/event-promotion-IV/schema';
import { DEFAULT_EDIT_VALUE, LIST_GROUP_EVENT } from 'src/event-q1-groupEvent/contants';
import { schemaAddEditGroupEvent } from 'src/event-q1-groupEvent/schema';

export const EditGroupEventForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
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
  
  const onSubmit = (data: any) => {
    console.log('Submit OK');
  };
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
                <RHFTextField name="id" label="ID" required disabled/>
                <RHFTextField name="name" label="Tên Group Event*" />
              </Stack>
                <Box sx={{ zIndex: 1001 }} minHeight="65px">
                  <RHFSelectPagitnationMultiple
                    name={'skus'}
                    getAsyncData={LIST_GROUP_EVENT}
                    placeholder="Mã sản phẩm*"
                    error={errors}
                  />
                  <FormHelperText error sx={{ marginLeft: '10px' }}>
                    {errors?.eventIds?.message}
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
              Lưu
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent)}
            >
              Hủy
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};
