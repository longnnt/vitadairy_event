import { LoadingButton } from '@mui/lab';
import { Stack, InputAdornment, TextField, Box, MenuItem, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
// components
import Iconify from 'src/common/components/Iconify';
import { FormProvider } from 'src/common/components/hook-form';
import { dispatch } from 'src/common/redux/store';
import { initialState } from 'src/event-q1-groupEvent/contants';
import { setFilterName } from 'src/event-q1-groupEvent/groupEvent.slice';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: () => void;
  placeholder: string;
};

export default function ListGroupEventFilterBar({
  filterName,
  onFilterName,
  placeholder,
}: Props) {
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
  const onSubmit = (data: any) => {
    dispatch(setFilterName(data.searchText as string));
  };

  const handleReset= () => {
    reset({
      searchText: '',
    });
    dispatch(setFilterName(''));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ py: 2, px: 1 }}
        alignItems="center"
        width="100%"
      >
        <Controller
          name="searchText"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              onChange={onChange}
              value={value}
              placeholder={placeholder}
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
        <Stack
          direction="row"
          spacing={3}
          width="25%"
          justifyContent={'center'}
          sx={{ height: '56px' }}
        >
          <LoadingButton variant="contained" type="submit" onClick={onFilterName}>
            Tìm kiếm
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={handleReset}>
            Hủy bỏ
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
