import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { defaultValues } from '../../constants';
import { useSelector } from 'react-redux';
import { adminDetailSelector, confirmEditSelector, openEditModalSelector, setConfirmEdit, setOpeneditModal } from 'src/admin/admin.slice';
import { useEditAdmin } from 'src/admin/hooks/useEditAdmin';
import { IFormAdmin } from 'src/admin/interfaces';
import { NewAdminSchema } from 'src/admin/schema';
import useMessage from 'src/store-admin/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { EditStoreAdminSchema } from 'src/store-admin/storeAdmin.schema';
import { useEditStoreAdmin } from 'src/store-admin/hooks/useEditStoreAdmin';
import { IFormStoreDetail } from 'src/store-admin/interfaces';
import { setStoreAdminDetailSelector } from 'src/store-admin/storeAdmin.slice';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function EditStoreAdminForm() {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const dataStoreAdmin = useSelector(setStoreAdminDetailSelector)
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { useDeepCompareEffect } = useDeepEffect();
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const openEditModal = useSelector(openEditModalSelector);
  const confirmEdit = useSelector(confirmEditSelector);

  const { mutate, isSuccess,isLoading } = useEditStoreAdmin({
    onSuccess: () => { 
      showSuccessSnackbar('Chỉnh sửa cửa hàng thành công')
    },
    onError: () => {
      showErrorSnackbar('Chỉnh sửa cửa hàng thất bại');
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.storeAdmin.list);
  }, [isSuccess]);

  const methods = useForm<IFormStoreDetail>({
    resolver: yupResolver(EditStoreAdminSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const dataRes = dataStoreAdmin?.response;
  useEffect(() => {
    if (dataRes) {
      dataRes;
      reset(dataRes);
    }
  }, [dataStoreAdmin]);
  const onSubmit = async (data: IFormStoreDetail) => {
    handleOpenEditModal();
  };
  useDeepCompareEffect(() => {
    const data = watch();
    if (confirmEdit) {
      const dataEdit:IFormStoreDetail={
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        isActive: data.isActive,
        code: data.code,
      }
      mutate({ data: dataEdit, id: parseInt(id as string) })
      dispatch(setConfirmEdit(false));

    }
  }, [confirmEdit]);
  const handleCancel = () => {
    reset();
  };
  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

              <RHFTextField
                name="code"
                label="Mã định danh"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                name="name"
                label="Tên"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="phoneNumber"
                label="Số điện thoại"
                InputLabelProps={{ shrink: true }}
              />
              <RHFSwitch
                    name="isActive"
                    label="Active"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
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
        <ConfirmEditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            handleOnAgree={handleOnAgree}
            type='Chỉnh sửa tài khoản'
            colorType={true}
            // setConfirmEdit={setConfirmEdit}
          />
      </FormProvider>
    </>
  );
}

export { EditStoreAdminForm };
