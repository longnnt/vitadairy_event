import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider } from 'src/common/components/hook-form';

import { dispatch } from 'src/common/redux/store';
import { setEndDate, setSearchText, setStartDate } from '../eventPromotionIV.slice';

interface ISearchParamsProps {
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
}

const initialValue: ISearchParamsProps = {
  searchText: '',
  startDate: null,
  endDate: null,
};

export const EventTableToolbar = () => {
  const methods = useForm({
    defaultValues: initialValue,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ISearchParamsProps) => {
    dispatch(setSearchText(data.searchText));
    dispatch(setStartDate(data.startDate));
    dispatch(setEndDate(data.endDate));
  };

  const handleResetForm = () => {
    reset({
      endDate: null,
      startDate: null,
      searchText: '',
    });
    dispatch(setSearchText(''));
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={'20px'} direction="row">
        <Controller
          name="startDate"
          key={'firstScanStartDate'}
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="Ngày bắt đầu"
              key={'firstScanStartDate'}
              inputFormat={'dd/mm/yyyy hh:mm a'}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
        <Controller
          name="endDate"
          key="firstScanEndDate"
          control={control}
          render={({ field }: { field: any }) => (
            <MobileDateTimePicker
              {...field}
              key="firstScanEndDate"
              label="Ngày kết thúc"
              inputFormat={'dd/mm/yyyy hh:mm a'}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          )}
        />
        <Controller
          name="searchText"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tìm kiếm sự kiện</InputLabel>
              <OutlinedInput
                label="Tìm kiếm sự kiện"
                {...field}
                startAdornment={
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        />
      </Stack>
      <Stack direction={'row'} spacing="10px" sx={{ mt: '12px' }}>
        <Button variant="contained" color="info" type="submit">
          Lọc
        </Button>
        <Button variant="contained" color="primary" onClick={handleResetForm}>
          Xóa
        </Button>
      </Stack>
    </FormProvider>
  );
};
