import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import { defaultValues, permission, status } from '../../constants';
import { IFormAdmin } from 'src/admin/interfaces';
import { NewAdminSchema } from 'src/admin/schema';
import { useAddNewAdmin } from '../../hooks/useAddNewAccount';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function AddFormNewAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add admin successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add admin error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddNewAdmin({ onSuccess, onError });

  const methods = useForm<IFormAdmin>({
    resolver: yupResolver(NewAdminSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (data: IFormAdmin) => {
    const dataAddNewAccount = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      permission: data.permission,
      id: data.id,
    };
    mutate(dataAddNewAccount);
  };
  const handleCancel = () => {
    reset();
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <RHFSelect name="status" label="Status" placeholder="status">
                <option value="" />
                {status.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="permission" label="phân quyền" placeholder="phân quyền">
                <option value="" />
                {permission.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

              <RHFTextField name="email" label="Email address" />

              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add New
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="inherit"
              variant="contained"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
          </Stack>
        </Grid>
      </FormProvider>
    </>
  );
}

export { AddFormNewAdmin };