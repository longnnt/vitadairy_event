import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormProvider } from 'src/common/components/hook-form';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { ButtonType, DEFAULT_FORM_VALUE } from '../../constants';
import { createEventPrizeValidate } from '../../event.schema';
import {
  buttonTypeState,
  confirmEditSelector,
  editDataSelector,
  openEditModalSelector,
  popUpCodeSelector,
  popUpTypeSelector,
  setButtonType,
  setConfirmEdit,
  setEditData,
  setOpeneditModal,
} from '../../event.slice';
import { useAddEvent } from '../../hooks/useAddEvent';
import {
  IEventDetail,
  IFormCreateEvent,
  IGiftParams,
  ISelectPopup,
  IFormCreate,
  ISelect,
  IFormSubmitCreate,
} from '../../interfaces';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from 'react';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { fomatFormData } from '../utils';
import NotificationForm from './NotificationForm';
import NotificationOverviewForm from './NotificationOverviewForm';
import NotificationOverviewForm2 from './NotificationOverviewForm2';
import ProvinceTableForm from './ProvinceTableRow';

dayjs.extend(customParseFormat);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function HistoryNewForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const dispatch = useDispatch();
  const popUpType = useSelector(popUpTypeSelector);
  const popUpCode = useSelector(popUpCodeSelector);
  const buttonType = useSelector(buttonTypeState);
  const confirmEdit = useSelector(confirmEditSelector);
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const openEditModal = useSelector(openEditModalSelector);
  const editData = useSelector(editDataSelector);

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response?.provinces || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const provinceId = addProvinceVN
    ? addProvinceVN.map((item: ISelect) => item.value)
    : [];

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Đã lưu thành công', {
      variant: 'success',
    });
  };

  const onError = () => {
    enqueueSnackbar('Lưu thất bại', {
      variant: 'error',
    });
  };

  const { mutate, isLoading } = useAddEvent({ onSuccess, onError });
  const params = useParams();
  const id = params?.id;
  const idEventPrize = parseInt(id as string);

  const methods = useForm<IFormCreate>({
    resolver: yupResolver(createEventPrizeValidate(provinceId)),
    defaultValues: DEFAULT_FORM_VALUE,
  });

  const {
    reset,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (idEventPrize) {
      setValue('eventId', idEventPrize);
    }
  }, [idEventPrize]);

  const onSubmit = async (data: IFormCreate) => {
    if (popUpType === 'NULL') {
      data.popupLink = 'NULL';
    }
    data.popupCode = popUpCode;
    data.popupType = popUpType;
    handleOpenEditModal();
    const tempEditData = fomatFormData(data);
    dispatch(setEditData(tempEditData));
  };
  useDeepCompareEffect(() => {
    if (confirmEdit) {
      const newData = {
        ...editData,
        transactionTypeId: editData.transactionTypeId.value,
      } as unknown as IFormSubmitCreate;
      mutate(newData);
      dispatch(setConfirmEdit(false));
    }
  }, [confirmEdit, editData]);

  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };

  return (
    <>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid spacing={3} container>
                <NotificationOverviewForm />
                <NotificationOverviewForm2 />
              </Grid>
              <LabelStyle marginTop={2}>Thông báo</LabelStyle>
              <Card sx={{ p: 2, width: '100%', my: 1 }}>
                <NotificationForm />
              </Card>
              <LabelStyle marginTop={2}>Tỉnh thành</LabelStyle>
              <Card sx={{ p: 2 }}>
                <Stack direction={'column'} spacing="15px">
                  <Box>
                    <ProvinceTableForm />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            <Grid direction="row" justifyContent="flex-end" container mt={2}>
              <Box sx={{ paddingRight: 2 }}>
                <LoadingButton
                  color="inherit"
                  variant="outlined"
                  size="large"
                  type="submit"
                  loading={buttonType === ButtonType.SAVE_SUBMIT && isLoading}
                  onClick={() => dispatch(setButtonType(ButtonType.SAVE_SUBMIT))}
                >
                  Lưu
                </LoadingButton>
                <ConfirmEditModal
                  open={openEditModal}
                  handleClose={handleCloseEditModal}
                  handleOnAgree={handleOnAgree}
                  type="Lưu sự kiện"
                  colorType={true}
                />
              </Box>

              <Box>
                <LoadingButton
                  color="inherit"
                  variant="outlined"
                  size="large"
                  type="submit"
                  loading={buttonType === ButtonType.SAVE_CREATE_SUBMIT && isLoading}
                  onClick={() => dispatch(setButtonType(ButtonType.SAVE_CREATE_SUBMIT))}
                >
                  Lưu & Chỉnh sửa
                </LoadingButton>
              </Box>
              <ConfirmEditModal
                open={openEditModal}
                handleClose={handleCloseEditModal}
                handleOnAgree={handleOnAgree}
                type="Lưu và Chỉnh sửa sự kiện"
                colorType={true}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
