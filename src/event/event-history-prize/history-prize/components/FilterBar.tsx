import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { FormProvider } from 'src/common/components/hook-form';
// components
import { Controller, useForm } from 'react-hook-form';
import { dispatch } from 'src/common/redux/store';
import { formatDateNews } from '../../constants';
import {
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText,
} from '../../event.slice';
import { IFormFilter, IHistoryListEventParams } from '../../interfaces';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;

  onFilterName: (value: string) => void;
};

export const FilterBar = (props: { handleSearch: Function }) => {
  const { handleSearch } = { ...props };
  const methods = useForm<IFormFilter>({
    defaultValues: {
      searchText: '',
      startDate: null,
      endDate: null,
    },
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: IFormFilter) => {
    dispatch(setSearchText(data.searchText));
    dispatch(setFirstScanStartDate(data.startDate));
    dispatch(setFirstScanEndDate(data.endDate));
  };

  const handleCancel = () => {
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
                  {...register('searchText')}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      fullWidth
                      {...register('searchText')}
                      placeholder="Search..."
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
                  // name="startDate"
                  {...register('startDate')}
                  key={'firstScanStartDate'}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
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
                // name="endDate"
                {...register('endDate')}
                key="firstScanEndDate"
                control={control}
                render={({ field }: { field: any }) => (
                  <DatePicker
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
