import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  FormProvider, RHFSelect,
  RHFTextField
} from 'src/common/components/hook-form';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  ButtonType, defaultValues, popupTypeOption,
  POPUP_TYPE,
  STYLE_GIFT,
  TABLE_HEAD_GIFT
} from '../../constants';
import { createEventPrizevalidate } from '../../event.schema';
import {
  giftSelecttor,
  popUpCodeSelector,
  popUpTypeSelector,
  setButtonType, setFileCSV,
  setGift,
  setOpen,
  setOpenSelector,
  setPopUpCode,
  setPopUpType,
  setProvinceNewFormSelector,
  setValueChoice,
  setValueChoiceSelector
} from '../../event.slice';
import { useAddEvent } from '../../hooks/useAddEvent';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { useGetGilf } from '../../hooks/useGetGilf';
import {
  IEventDetail,
  IFormCreateEvent,
  IGiftParams, ISelectPopup
} from '../../interfaces';
import { GiftTableRow } from './GiftTableRow';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import LoadingScreen from 'src/common/components/LoadingScreen';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import FullFeaturedCrudGrid from './ProvinceTableRow';
import NotificationOverviewForm from './NotificationOverviewForm';
import NotificationOverviewForm2 from './NotificationOverviewForm2';
import NotificationForm from './NotificationForm';

dayjs.extend(customParseFormat);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function HistoryNewForm() {
  const dispatch = useDispatch();
  const gift = useSelector(giftSelecttor);
  const dataProvinceform = useSelector(setProvinceNewFormSelector);

  const { useDeepCompareEffect } = useDeepEffect();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected: selectedRows,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  
  useDeepCompareEffect(() => {
    if (dataProvinceform) setValue('eventDetailProvinces', dataProvinceform);
  }, [dataProvinceform]);

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

  const methods = useForm<IFormCreateEvent>({
    resolver: yupResolver(createEventPrizevalidate()),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IFormCreateEvent) => {
    const eventDetailProvinces: Array<IEventDetail> = data.eventDetailProvinces.map(
      (item) => {
        let startDate = new Date().toISOString();
        let endDate = new Date().toISOString();

        if (item.endDate || item.startDate) {
          startDate = item.startDate
            ? item.startDate instanceof Date
              ? item.startDate.toISOString()
              : startDate
            : startDate;
          endDate = item.endDate
            ? item.endDate instanceof Date
              ? item.endDate.toISOString()
              : endDate
            : endDate;
        }
        if (item.extraquantity) {
          item.quantity =
            parseInt(item.quantity.toString()) + parseInt(item.extraquantity.toString());
          delete item.extraquantity;
        }
        return { ...item, startDate: startDate, endDate: endDate };
      }
    );
    if (data.popupType === 'NULL') {
      data.popupLink = 'NULL';
    }
    const dataEvent: IFormCreateEvent = {
      eventDetailProvinces,
      eventId: idEventPrize,
      giftId: gift.id,
      notificationContent: data.notificationContent,
      notificationDescription: data.notificationDescription,
      notificationTitle: data.notificationTitle,
      ordinal: data.ordinal,
      popupCode: data.popupCode,
      popupType: data.popupType,
      popupImageLink: data.popupImageLink,
      popupLink: data.popupLink,
      probability: data.probability,
      quantity: data.quantity,
      transactionTypeId: data.transactionTypeId,
    };
    mutate(dataEvent);
  };

  const loadingScreen: boolean = isLoading || isSubmitting;

  return (
    <>
      <Container>
        {loadingScreen && <LoadingScreen />}
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
                    <FullFeaturedCrudGrid />
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
                  onClick={() => dispatch(setButtonType(ButtonType.SAVE_SUBMIT))}
                >
                  Lưu
                </LoadingButton>
              </Box>
              <Box>
                <LoadingButton
                  color="inherit"
                  variant="outlined"
                  size="large"
                  type="submit"
                  onClick={() => dispatch(setButtonType(ButtonType.SAVE_CREATE_SUBMIT))}
                >
                  Lưu & Chỉnh sửa
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
