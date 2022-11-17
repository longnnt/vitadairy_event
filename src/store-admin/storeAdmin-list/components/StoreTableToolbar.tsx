import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider } from 'src/common/components/hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import { useDispatch } from 'src/common/redux/store';
import { FORMAT_DATE_NEWS } from 'src/store-admin/constants';
import { IStoreParams } from '../../interfaces';
import {
  initialState,
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText
} from '../../storeAdmin.slice';

// ----------------------------------------------------------------------

export const StoreTableToolbar = (props: { handleSearch: Function, isLoading: boolean }) => {
  const dispatch = useDispatch();
  const { handleSearch } = { ...props };
  const methods = useForm({
    defaultValues: initialState,
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  if (!watch().endDate && !watch().searchText && !watch().startDate) {
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
  }

  const onSubmit = (data: IStoreParams) => {
    dispatch(setSearchText(data.searchText as string));
    dispatch(setFirstScanStartDate(data.startDate));
    dispatch(setFirstScanEndDate(data.endDate));
  };

  const handleCancel = async () => {
    reset({
      searchText: '',
      startDate: null,
      endDate: null,
    });
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Grid container spacing={5} py="30px">
            <Grid item xs={10} md={4} ml="20px">
              <Stack spacing={'20px'}>
                <Controller
                  control={control}
                  {...register('searchText')}
                  render={({ field: { onChange } }) => (
                    <TextField
                      fullWidth
                      {...register('searchText')}
                      placeholder="Search..."
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
                <Box>
                  <LoadingButton
                    sx={{ size: '30px' }}
                    type="submit"
                    variant="contained"
                    size="medium"
                    onClick={() => handleSearch()}
                  >
                    Tìm kiếm
                  </LoadingButton>
                  <LoadingButton
                    sx={{ size: '30px', margin: 2 }}
                    color="inherit"
                    variant="contained"
                    size="medium"
                    onClick={handleCancel}
                  >
                    Xóa
                  </LoadingButton>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={10} md={3}>
              <Stack spacing={'20px'}>
                <Controller
                  name="startDate"
                  key={'startDate'}
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="Start date"
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
            </Grid>
            <Grid item xs={10} md={3}>
              <Controller
                name="endDate"
                key="endDate"
                control={control}
                render={({ field }: { field: any }) => (
                  <MobileDateTimePicker
                    {...field}
                    key="endDate"
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
