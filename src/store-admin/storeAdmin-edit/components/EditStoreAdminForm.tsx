import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { defaultValues } from '../../constants';
import { useSelector } from 'react-redux';
import {
  adminDetailSelector,
  confirmEditSelector,
  openEditModalSelector,
  setConfirmEdit,
  setOpeneditModal,
} from 'src/admin/admin.slice';
import { useEditAdmin } from 'src/admin/hooks/useEditAdmin';
import { IFormAdmin } from 'src/admin/interfaces';
import { NewAdminSchema } from 'src/admin/schema';
import useMessage from 'src/store-admin/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { EditStoreAdminSchema } from 'src/store-admin/storeAdmin.schema';
import { useEditStoreAdmin } from 'src/store-admin/hooks/useEditStoreAdmin';
import { IFormStore, IFormStoreDetail } from 'src/store-admin/interfaces';
import { setStoreAdminDetailSelector } from 'src/store-admin/storeAdmin.slice';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function EditStoreAdminForm() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const dataStoreAdmin = useSelector(setStoreAdminDetailSelector);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { useDeepCompareEffect } = useDeepEffect();
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const openEditModal = useSelector(openEditModalSelector);
  const confirmEdit = useSelector(confirmEditSelector);

  const { mutate, isSuccess, isLoading } = useEditStoreAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa cửa hàng thành công');
    },
    onError: () => {
      showErrorSnackbar('Chỉnh sửa cửa hàng thất bại');
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.storeAdmin.list);
  }, [isSuccess]);

  const methods = useForm<IFormStore>({
    resolver: yupResolver(EditStoreAdminSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const dataRes = dataStoreAdmin?.response?.response;

  useEffect(() => {
    if (dataRes) {
      dataRes;
      reset(dataRes);
    }
  }, [dataStoreAdmin]);
  const onSubmit = (data: IFormStore) => {
    handleOpenEditModal();
  };
  useDeepCompareEffect(() => {
    const dataEditStore = watch();
    if (confirmEdit) {
      const dataEdit: IFormStore = {
        name: dataEditStore.name,
        phoneNumber: dataEditStore.phoneNumber,
        address: dataEditStore.address,
        isActive: dataEditStore.isActive,
        code: dataEditStore.code,
        qrLink: dataEditStore.qrLink,
        createdDate: dataEditStore.createdDate
      };
      mutate({ data: dataEdit });
      dispatch(setConfirmEdit(false));
    }
    console.log(dataEditStore)
    console.log(watch())
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
              <RHFTextField
                name="code"
                key={'code'}
                label="Mã định danh"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                name="name"
                key={'name'}
                label="Tên"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="phoneNumber"
                key={'phoneNumber'}
                label="Số điện thoại"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="address"
                key={'address'}
                label="Địa chỉ"
                InputLabelProps={{ shrink: true }}
              />
              <RHFSwitch
                name="isActive"
                key={'isActive'}
                label="Active"
                labelPlacement="start"
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
          type="Chỉnh sửa cửa hàng"
          colorType={true}
        />
      </FormProvider>
    </>
  );
}

export { EditStoreAdminForm };
