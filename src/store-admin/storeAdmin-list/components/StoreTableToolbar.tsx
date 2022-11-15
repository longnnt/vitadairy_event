import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
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

export const StoreTableToolbar = (props: { handleSearch: Function }) => {
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

  if (!watch().firstScanEndDate && !watch().searchText && !watch().firstScanStartDate) {
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
  }

  const onSubmit = (data: IStoreParams) => {
    dispatch(setSearchText(data.searchText as string));
    dispatch(setFirstScanStartDate(data.firstScanStartDate));
    dispatch(setFirstScanEndDate(data.firstScanEndDate));
  };

  const handleCancel = async () => {
    reset({
      searchText: '',
      firstScanStartDate: null,
      firstScanEndDate: null,
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
                  name="firstScanStartDate"
                  key={'firstScanStartDate'}
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      {...field}
                      label="Start date"
                      key={'firstScanStartDate'}
                      inputFormat={FORMAT_DATE_NEWS}
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
                  <DateTimePicker
                    {...field}
                    key="firstScanEndDate"
                    label="End date"
                    inputFormat={FORMAT_DATE_NEWS}
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
