import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect } from 'src/common/components/hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import { FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { useDispatch } from 'src/common/redux/store';
import {
  initialState,
  setEndDate,
  setSearchBy,
  setSearchText,
  setStartDate,
  setStatus,
} from 'src/manage-event-quarter-one/manageEvent.slice';
import { SEARCH_BY, STATUS } from '../../common/constants';
import { IManageEventParams } from '../../common/interface';

// ----------------------------------------------------------------------

export const ListEventTableToolbar = (props: { handleSearch: Function }) => {
  const dispatch = useDispatch();
  const { handleSearch } = { ...props };
  const methods = useForm({
    defaultValues: initialState,
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  if (
    !watch().searchText &&
    !watch().startDate &&
    !watch().endDate &&
    !watch().searchBy &&
    !watch().status
  ) {
    dispatch(setSearchText(''));
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
    dispatch(setSearchBy(''));
    dispatch(setStatus(''));
  }

  const onSubmit = (data: IManageEventParams) => {
    if (data.searchText) dispatch(setSearchText(data.searchText as string));
    if (data.status) dispatch(setStatus(data.status as string));
    dispatch(setSearchBy(data.searchBy as string));
    dispatch(setStartDate(data.startDate));
    dispatch(setEndDate(data.endDate));
  };
  const handleResetSearch = () => {
    reset({
      searchText: '',
      startDate: null,
      endDate: null,
      searchBy: '',
      status: '',
    });
    dispatch(setSearchText(''));
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
    dispatch(setSearchBy(''));
    dispatch(setStatus(''));
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Grid container spacing={5} py="30px">
            <Grid item xs={10} md={4} ml="20px">
              <Stack direction="row" spacing={3} width={950}>
                <RHFSelect
                  name={'searchBy'}
                  key="searchBy"
                  label={'Tìm kiếm theo...'}
                  sx={{ width: '100%' }}
                >
                  <option value=""></option>
                  <option value={SEARCH_BY.EVENT_NAME}>Sự kiện</option>
                  <option value={SEARCH_BY.EVENT_GROUP_NAME}>Nhóm sự kiện</option>
                </RHFSelect>
                <Controller
                  name="searchText"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      onChange={onChange}
                      value={value}
                      placeholder="Tìm kiếm sự kiện..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify
                              icon={'eva:search-fill'}
                              sx={{ color: 'text.disabled', width: 20, height: 20 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <RHFSelect
                  name={'status'}
                  key="status"
                  label={'Trạng thái'}
                  sx={{ width: '100%' }}
                >
                  <option value=""></option>
                  <option value={STATUS.ACTIVE}>Active</option>
                  <option value={STATUS.IN_ACTIVE}>Inactive</option>
                </RHFSelect>
                <LoadingButton
                  sx={{ width: '50%' }}
                  type="submit"
                  variant="contained"
                  size="large"
                  onClick={() => handleSearch()}
                >
                  Tìm kiếm
                </LoadingButton>
                <Button
                  sx={{ width: '50%' }}
                  type="reset"
                  variant="contained"
                  color="inherit"
                  size="large"
                  onClick={handleResetSearch}
                >
                  Hủy bỏ
                </Button>
              </Stack>
              <Stack direction={'row'} width={700} spacing={3} marginTop={2}>
                <Stack>
                  <Controller
                    name="startDate"
                    key={'startDate'}
                    control={control}
                    render={({ field }) => (
                      <MobileDateTimePicker
                        {...field}
                        label="Ngày bắt đầu"
                        key={'startDate'}
                        inputFormat={FORMAT_DATE_NEWS}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Calendar />
                            </InputAdornment>
                          ),
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    )}
                  />
                </Stack>
                <Stack>
                  <Controller
                    name="endDate"
                    key="endDate"
                    control={control}
                    render={({ field }: { field: any }) => (
                      <MobileDateTimePicker
                        {...field}
                        key="endDate"
                        label="Ngày kết thúc"
                        inputFormat={FORMAT_DATE_NEWS}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Calendar />
                            </InputAdornment>
                          ),
                        }}
                        renderInput={(params: any) => <TextField {...params} fullWidth />}
                      />
                    )}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </FormProvider>
    </>
  );
};
