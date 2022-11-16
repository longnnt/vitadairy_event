// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps,Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <TextField
            {...field}
            fullWidth
            value={
              typeof field.value === 'number' && field.value === 0 ? '' : field.value
            }
            error={!!error}
            {...other}
          />
          <Typography component='span' sx={{color: error?.message ? 'red' : 'transparent' }}>{error?.message ? error?.message :'hello' }</Typography>
        </Stack>
      )}
    />
  );
}
