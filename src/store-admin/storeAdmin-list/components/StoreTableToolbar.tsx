import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider } from 'src/common/components/hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import { dispatch } from 'src/common/redux/store';
import { formatDateNews } from 'src/store-admin/constants';
import { IStoreParams } from '../../interfaces';
import {
  initialState,
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText,
} from '../../storeAdmin.slice';

// ----------------------------------------------------------------------

export const StoreTableToolbar = (props: { handleSearch: Function }) => {
  const { handleSearch } = { ...props };
  const methods = useForm({
    defaultValues: initialState,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: IStoreParams) => {
    dispatch(setSearchText(data.searchText as string));
    dispatch(setFirstScanStartDate(data.startDate as string));
    dispatch(setFirstScanEndDate(data.endDate as string));
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Grid container spacing={5} py="30px">
            <Grid item xs={10} md={4} ml="20px">
              <Stack spacing={'20px'}>
                <Controller
                  name="searchText"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      fullWidth
                      onChange={onChange}
                      name="searchText"
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
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={10} md={3}>
              <Stack spacing={'20px'}>
                <Controller
                  name="startDate"
                  key={'firstScanStartDate'}
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="Start date"
                      key={'firstScanStartDate'}
                      inputFormat={formatDateNews}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={10} md={3}>
              <Controller
                name="endDate"
                key="firstScanEndDate"
                control={control}
                render={({ field }: { field: any }) => (
                  <MobileDateTimePicker
                    {...field}
                    key="firstScanEndDate"
                    label="End date"
                    inputFormat={formatDateNews}
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
