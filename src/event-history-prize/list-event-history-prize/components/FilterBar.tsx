import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';

import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { FormProvider } from 'src/common/components/hook-form';
// components
import { Calendar } from '@mui/x-date-pickers/internals/components/icons';
import { Controller, useForm } from 'react-hook-form';
import { FORMAT_DATE_NEWS } from 'src/common/constants/common.constants';
import { dispatch } from 'src/common/redux/store';
import {
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText
} from '../../eventHistory.slice';
import { IFormFilter } from '../../common/interface';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;

  onFilterName: (value: string) => void;
};

export const FilterBar = (props: { handleSearch: Function,isLoading:boolean }) => {
  const { handleSearch, isLoading } = { ...props };
  const methods = useForm<IFormFilter>({
    defaultValues: {
      searchText: '',
      startDate: null,
      endDate: null,
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  if(!watch().endDate && !watch().searchText && !watch().startDate){
    dispatch(setSearchText(''));
    dispatch(setFirstScanStartDate(null));
    dispatch(setFirstScanEndDate(null));
  }
  const onSubmit = (data: IFormFilter) => {
    dispatch(setSearchText(data.searchText));
    dispatch(setFirstScanStartDate(data.startDate));
    dispatch(setFirstScanEndDate(data.endDate));
  };

  function timeout(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  const handleCancel =() => {
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
                    loading={isLoading}
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
                // name="endDate"
                {...register('endDate')}
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