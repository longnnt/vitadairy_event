// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
  data?: boolean
  disabledCheck?: boolean
}

export default function RHFSwitch({ name, data, disabledCheck, onChange, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={data ? data : field.value} disabled={disabledCheck} onChange={onChange}/>}
        />
      }
      {...other}
    />
  );
}
