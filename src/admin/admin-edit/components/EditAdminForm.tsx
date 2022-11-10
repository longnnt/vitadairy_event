import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { defaultValues, permission, status } from '../../constants';
import { useSelector } from 'react-redux';
import { adminDetailSelector } from 'src/admin/admin.slice';
import { useEditAdmin } from 'src/admin/hooks/useEditAdmin';
import { IFormAdmin } from 'src/admin/interfaces';
import { NewAdminSchema } from 'src/admin/schema';
import useMessage from 'src/store-admin/hooks/useMessage';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function EditFormAdmin() {
  // const showPassword = useSelector(showPasswordSelector);
  const params = useParams();
  const dataAdmin = useSelector(adminDetailSelector);
  const id = params?.id;
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess,isLoading } = useEditAdmin({
    onSuccess: () => {
    },
    onError: () => {
      showErrorSnackbar('Get admin fail');
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.admin.list);
  }, [isSuccess]);

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
  const dataRes = dataAdmin?.response;
  useEffect(() => {
    if (dataRes) {
      dataRes;
      reset(dataRes);
    }
  }, [dataAdmin]);
  const onSubmit = async (data: IFormAdmin) => {
    const dataEdit = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      permission: data.permission,
      id: data.id,
    };
    mutate({ data: dataEdit, id: parseInt(id as string) });
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
              <RHFSelect name="status" label="Status" InputLabelProps={{ shrink: true }}>
                <option value="" />
                {status.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="permission"
                label="phân quyền"
                InputLabelProps={{ shrink: true }}
              >
                <option value="" />
                {permission.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

              <RHFTextField
                name="email"
                label="Email address"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                name="firstName"
                label="First Name"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="lastName"
                label="Last Name"
                InputLabelProps={{ shrink: true }}
              />
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
              loading={isLoading}

            >
              Edit
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

export { EditFormAdmin };
