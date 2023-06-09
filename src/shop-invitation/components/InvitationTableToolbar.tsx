import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect } from 'src/common/components/hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import { FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { dispatch } from 'src/common/redux/store';
import { SEARCH_BY, STATUS } from '../common/constants';
import { IParamsQuery } from '../common/interfaces';
import {
  initialState,
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchBy,
  setSearchText,
  setStatus,
} from '../invitationSlice';

// ----------------------------------------------------------------------

export const InvitationTableToolbar = (props: { handleSearch: Function }) => {
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

  if (!watch().firstScanEndDate && !watch().searchText && !watch().firstScanStartDate && !watch().searchBy && !watch().status) {
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
    dispatch(setSearchBy(''));
    dispatch(setStatus(''));
  }

  const onSubmit = (data: IParamsQuery) => {
    if (data.searchText) dispatch(setSearchText(data.searchText as string));
    if (data.status) dispatch(setStatus(data.status as string));
    dispatch(setSearchBy(data.searchBy as string));
    dispatch(setFirstScanStartDate(data.firstScanStartDate));
    dispatch(setFirstScanEndDate(data.firstScanEndDate));
  };
  const handleResetSearch = () => {
    reset({
      searchText: '',
      firstScanStartDate: null,
      firstScanEndDate: null,
      searchBy: '',
      status: '',
    });
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
    dispatch(setSearchBy(''));
    dispatch(setStatus(''));
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Grid container spacing={5} py="30px">
            <Grid item xs={10} md={4} ml="20px">
              <Stack spacing={'20px'}>
                <RHFSelect name={'searchBy'} key="searchBy" label={'Tìm kiếm theo...'}>
                  <option value="" />
                  <option value={SEARCH_BY.STORE_CODE}>Mã định danh</option>
                  <option value={SEARCH_BY.USER_NAME}>Tên khách hàng</option>
                  <option value={SEARCH_BY.PHONE_NUMBER}>Số điện thoại</option>
                </RHFSelect>
                <Controller
                  name="searchText"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      onChange={onChange}
                      value={value}
                      placeholder="Search text..."
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

                <RHFSelect name={'status'} key="status" label={'Trạng thái'}>
                  <option value="" />
                  <option value={STATUS.SUCCESS}>Success</option>
                  <option value={STATUS.FAIL}>Not Success</option>
                </RHFSelect>

                <Box>
                  <Stack direction={'row'} spacing="10px">
                    <LoadingButton
                      sx={{ size: '30px' }}
                      type="submit"
                      variant="contained"
                      size="medium"
                      onClick={() => handleSearch()}
                    >
                      Tìm kiếm
                    </LoadingButton>
                    <Button
                      sx={{ size: '30px' }}
                      type="reset"
                      variant="contained"
                      size="medium"
                      onClick={handleResetSearch}
                    >
                      Reset
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={10} md={3}>
              <Stack spacing={'20px'}>
                <Controller
                  name="firstScanStartDate"
                  key={'firstScanStartDate'}
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="Start date"
                      key={'firstScanStartDate'}
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
            </Grid>
            <Grid item xs={10} md={3}>
              <Controller
                name="firstScanEndDate"
                key="firstScanEndDate"
                control={control}
                render={({ field }: { field: any }) => (
                  <MobileDateTimePicker
                    {...field}
                    key="firstScanEndDate"
                    label="End date"
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
            </Grid>
          </Grid>
        </Card>
      </FormProvider>
    </>
  );
};
