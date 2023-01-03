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
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { RHFSelectPagitnationMultiple } from 'src/common/components/hook-form/RHFSelectPaginationMutiple';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';
import { defaultValues } from 'src/manage-event-quarter-one/common/constants';
import { schemaAddManageEvent } from 'src/manage-event-quarter-one/manageEvent.schema';
import { IFormManageEvent, IProCodeSelect } from 'src/manage-event-quarter-one/common/interface';

function CreateEventDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm({
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

  const onSubmit = (data: any) => {
    const formDataAddNewEvent: IFormManageEvent = {
      nameEvent: data.nameEvent,
      nameGroupEvent: data.nameGroupEvent,
      startDate: data.startDate,
      endDate: data.endDate,
      prizeWinningUser: data.prizeWinningUser,
      prizeWinningShop: data.prizeWinningShop,
      skus: data.skus.map((item: IProCodeSelect) => item.value),
      defaultWinRate: data.defaultWinRate,
      upRate: data.upRate,
      downRate: data.downRate,
      status: data.status,
      id: 1,
    };
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

              <RHFTextField name="nameEvent" label="Tên sự kiện*"  />
              <RHFTextField name="nameGroupEvent" label="Tên nhóm sự kiện*"  />
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

              <RHFTextField sx={{width: '300px'}} name="prizeWinningUser" label="Giới hạn trúng giải trên tệp người dùng*" />
              <RHFTextField sx={{width: '300px'}} name="prizeWinningShop" label="Giới hạn trúng giải trên tệp cửa hàng*" />
                <RHFSwitch name={'status'} label="Trạng thái" labelPlacement='start' />
              </Stack>

              <RHFSelect name='skus' label="Mã sản phẩm*">
              </RHFSelect>

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
              <Stack direction={'row'}>

              <RHFSwitch name={'deexCludeUserFile'} label="Giải loại trừ trên tệp người dùng" labelPlacement='start' />
              <RHFSwitch name={'deexCludeShopFile'} label="Giải loại trừ trên tệp cửa hàng" labelPlacement='start' />
              </Stack>

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
              onClick={() => {}}
            >
              Thêm mới
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
};

export {CreateEventDashboard}