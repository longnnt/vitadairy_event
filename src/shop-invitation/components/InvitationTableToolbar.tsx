import { LoadingButton } from '@mui/lab';
import { Stack, InputAdornment, TextField, Box, Grid, Card, Button } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect } from 'src/common/components/hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import {
  initialState,
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText,
  setStatus,
} from '../invitationSlice';
import { dispatch } from 'src/common/redux/store';
import { IParamsQuery } from '../common/interfaces';

// ----------------------------------------------------------------------

type Props = {
  roleOptions: string[];
  searchText: string;
  statusSuccess: string;
  firstScanStart: string;
  firstScanEnd: string;
  onSearchText: (value: string) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InvitationTableToolbar = (handleSearch: any) => {
  const methods = useForm({
    defaultValues: initialState,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: IParamsQuery) => {
    if (data.searchText) dispatch(setSearchText(data.searchText));
    if (data.status) dispatch(setStatus(data.status));
    dispatch(setFirstScanStartDate(data.firstScanStartDate));
    dispatch(setFirstScanEndDate(data.firstScanEndDate));
  };
  const handleResetSearch = () => {
    reset();
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

                <RHFSelect name={'status'} key="status" label={'Status'}>
                  <option value="" />
                  <option value={'true'}>Success</option>
                  <option value={'false'}>Not Success</option>
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
                      type="submit"
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
                      inputFormat="dd/MM/yyyy hh:mm a"
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
                    inputFormat="dd/MM/yyyy hh:mm a"
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
