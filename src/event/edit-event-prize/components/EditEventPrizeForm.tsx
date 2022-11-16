import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import LoadingScreen from 'src/common/components/LoadingScreen';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useShowSnackbar from 'src/common/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import {
  DEFAULT_FORM_VALUE,
  GIFT_POINT,
  NO_ID,
  popupTypeOption,
  POPUP_CODE,
  POPUP_TYPE,
} from '../common/constants';
import {
  IFormEdit,
  IGiftDetail,
  IProvince,
  ISelect,
  ISelectPopup,
  ITransactionType,
} from '../common/interface';
import { fomatFormData, formatDataProvinces, tranferData } from '../common/ultils';
import { eidtEventPrizevalidate } from '../editEvent.Schema';
import {
  choosenGiftPointSelector,
  confirmEditSelector,
  editDataSelector,
  giftByIdSelector,
  openEditModalSelector,
  popUpTypeSelector,
  setChoosenGiftPoint,
  setConfirmEdit,
  setEditData,
  setGiftById,
  setOpeneditModal,
  setPopUpType,
  setProvinceInfor,
} from '../editEventPrize.Slice';
import { useEditEventPrize } from '../hooks/useEditEventPrize';
import { useGetAllGift } from '../hooks/useGetAllGift';
import { useGetAllProvinceVN } from '../hooks/useGetAllProvinceVN';
import { useGetAllTransactionType } from '../hooks/useGetAllTransactionType';
import { useGetEventPrizeById } from '../hooks/useGetEventPrizeById';
import { useGetGiftById } from '../hooks/useGetGiftById';
import { GiftModal } from './GiftModal';
import PovinceTableForm from './ProvinceTableForm';
import { ConfirmEditModal } from './ConfirmEditModal';

// -----------------------------------------------------------------------------

export const EditEventPrizeForm = () => {
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();

  const params = useParams();
  const idParams = params?.id;
  const idEventPrize = parseInt(idParams as string);
  const { data: provincesData } = useGetAllProvinceVN();
  const { data: eventPrizeById, isLoading } = useGetEventPrizeById(idEventPrize);

  const provinceOptions = provincesData?.map((item: IProvince) => ({
    value: item?.id,
    label: item?.name,
  }));
  const provinceId = provinceOptions
    ? provinceOptions.map((item: ISelect) => item.value)
    : [];

  const dataEventPrizeById = useSelector(giftByIdSelector);
  const choosenGiftPoint = useSelector(choosenGiftPointSelector);
  const popUpTypedata = useSelector(popUpTypeSelector);
  const openEditModal = useSelector(openEditModalSelector);
  const confirmEdit = useSelector(confirmEditSelector);
  const editData = useSelector(editDataSelector);

  useDeepCompareEffect(() => {
    if (eventPrizeById) {
      const data = formatDataProvinces(eventPrizeById.eventDetailProvinces);
      dispatch(setGiftById(eventPrizeById));
      dispatch(setProvinceInfor(data));
      dispatch(setPopUpType(eventPrizeById.popupType));
    }
  }, [eventPrizeById]);

  useDeepCompareEffect(() => {
    if (popUpTypedata) setValue('popupType', popUpTypedata);
  }, [popUpTypedata]);

  useDeepCompareEffect(() => {
    if (dataEventPrizeById) {
      const data = tranferData(dataEventPrizeById);
      reset(data);
    }
  }, [dataEventPrizeById]);

  const { data: transactionType } = useGetAllTransactionType({ except: idEventPrize });
  const transactionTypeOptions = transactionType?.map((item: ITransactionType) => ({
    value: item.id,
    label: item.description,
  }));

  const methods = useForm<IFormEdit>({
    resolver: yupResolver(eidtEventPrizevalidate(provinceId)),
    defaultValues: DEFAULT_FORM_VALUE,
  });
  const {
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const watchPopupCode = watch('popupCode');

  const { data: giftDetail } = useGetGiftById(
    dataEventPrizeById ? dataEventPrizeById?.giftId : NO_ID
  );
  useDeepCompareEffect(() => {
    if (giftDetail) setChoosenGift(giftDetail?.data?.response);
  }, [giftDetail]);
  // ------------mutate---------------
  const { mutate } = useEditEventPrize();

  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));

  const onSubmit = async (data: IFormEdit) => {
    handleOpenEditModal();
    const tempEditData = fomatFormData(data);
    dispatch(setEditData(tempEditData));
  };
  useDeepCompareEffect(() => {
    if (confirmEdit) {
      mutate(editData, {
        onSuccess: () => {
          showSuccessSnackbar('editting is successfull');
          dispatch(setConfirmEdit(false));
        },
        onError: () => {
          showErrorSnackbar('editting is fail');
          dispatch(setConfirmEdit(false));
        },
      });
    }
  }, [confirmEdit, editData]);

  // ----------------set modal parameter---------------

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [choosenGift, setChoosenGift] = useState<IGiftDetail>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const SIZE = 10;
  const paramsGift = { page: page, size: SIZE };
  const { data } = useGetAllGift(paramsGift);
  const giftDta = data?.data?.response ? data?.data?.response : [];
  useDeepCompareEffect(() => {
    if (choosenGift) {
      setValue('giftId', choosenGift.id);
    }
  }, [choosenGift]);

  const loadingScreen: boolean = isLoading || isSubmitting;

  return (
    <>
      <Container>
        {loadingScreen && <LoadingScreen />}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography fontWeight={'bold'}>Thông tin tổng quan </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField
                    required
                    name="ordinal"
                    key={'ordinal'}
                    label="Thứ tự ưu tiên"
                  />
                  <RHFTextField
                    required
                    name="probability"
                    key={'probability'}
                    label="Tỷ lệ trúng quà của sự kiện (%)"
                  />
                  <RHFTextField
                    required
                    name="quantity"
                    key={'quantity'}
                    label="Tổng số lượng quà"
                  />
                  <RHFTextField
                    disabled
                    name="winnerAmount"
                    key={'winnerAmount'}
                    label="Số lượng user đã trúng"
                  />
                  <RHFSelect
                    name={'transactionTypeId'}
                    key="transactionTypeId"
                    label={'Transaction Type'}
                  >
                    <option value="" />
                    {transactionTypeOptions?.map((item: ISelect) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <Typography>Trạng thái quà</Typography>
                  <RHFSwitch name="giftStatus" key={'giftStatus'} label="" />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField
                    required
                    name="popupImageLink"
                    key={'popupImageLink'}
                    label="Link hình ảnh popup"
                  />
                  <RHFSelect
                    required
                    name={'popupType'}
                    key="popupType"
                    label={'Popup type'}
                    onChange={(e) => {
                      const val = e.target.value;
                      dispatch(setPopUpType(val));
                    }}
                  >
                    <option value="" />
                    {popupTypeOption.map((item: ISelectPopup) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </RHFSelect>
                  {popUpTypedata === POPUP_TYPE.HTML_LINK && (
                    <RHFTextField
                      required
                      name="popupLink"
                      key={'PopupHtmllink'}
                      label="Popup html link"
                    />
                  )}
                  {popUpTypedata === POPUP_TYPE.DEEP_LINK && (
                    <RHFTextField
                      required
                      name="popupLink"
                      key={'popupDeepLink'}
                      label="Popup deep link"
                    />
                  )}

                  <RHFSelect
                    name="popupCode"
                    key={'popupCode'}
                    label="Pop up Code"
                    placeholder="Pop up Code"
                    margin="dense"
                    onChange={(e) => {
                      const val = e.target.value;
                      setValue('popupCode', val);
                    }}
                  >
                    <option value=""></option>
                    <option value={POPUP_CODE.PUZZLE_PIECE}>PUZZLE PIECE</option>
                    <option value={POPUP_CODE.OGGI}>OGGI</option>
                    <option value={POPUP_CODE.FULL_SCREEN}>FULL_SCREEN</option>
                  </RHFSelect>
                  {(watchPopupCode === POPUP_CODE.OGGI ||
                    watchPopupCode === POPUP_CODE.PUZZLE_PIECE) && (
                    <>
                      <RHFTextField
                        name="popUpCodeTitle"
                        key={'popUpCodeTitle'}
                        label="Tiêu đề Pop up"
                        required
                      />
                      <RHFTextField
                        multiline
                        rows={5}
                        name="popUpCodeContent"
                        key={'popUpCodeContent'}
                        label="Nội dung Pop up"
                        required
                      />
                      <RHFTextField
                        name="popUpCodeCTA"
                        key={'popUpCodeCTA'}
                        label="CTA"
                        required
                      />
                    </>
                  )}
                  <RHFRadioGroup
                    sx={{ justifyContent: 'flex-start' }}
                    name="typeUser"
                    defaultValue={'gift'}
                    onChange={(e) => {
                      dispatch(setChoosenGiftPoint(e.target.value));
                    }}
                    options={[
                      { label: 'Tặng quà', value: 'gift' },
                      // { label: 'Tặng điểm', value: 'point' },
                      // { label: 'Tặng quà và điểm', value: 'giftandpoint' },
                    ]}
                  />
                  {choosenGiftPoint === GIFT_POINT.GIFT && (
                    <Stack direction={'column'} spacing="10px">
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ width: '30%', alignSelf: 'flex-start' }}
                        onClick={handleOpen}
                      >
                        Chọn quà
                      </Button>
                      {choosenGift && (
                        <Card sx={{ p: 3 }}>
                          <Typography fontWeight="bold">
                            Name: {choosenGift.name}
                          </Typography>
                          <Typography fontWeight="bold">
                            Price: {choosenGift.money}-VND
                          </Typography>
                        </Card>
                      )}
                    </Stack>
                  )}

                  <GiftModal
                    open={open}
                    handleClose={handleClose}
                    setChoosenGift={setChoosenGift}
                    setPage={setPage}
                    giftDta={giftDta}
                    page={page}
                    totalRecords={data ? data?.data?.pagination?.totalRecords : 0}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>

          <Box py={'15px'}>
            <Typography fontWeight={'bold'}>Thông báo</Typography>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name="notificationTitle"
                  key={'notificationTitle'}
                  label="Tiêu đề thông báo"
                />
                <RHFTextField
                  name={'notificationDescription'}
                  key={'notificationDescription'}
                  label="Nội dung thông báo"
                />

                <RHFTextField
                  // simple
                  name="notificationContent"
                  key={'notificationContent'}
                  label="Nội dung"
                  multiline
                  rows={7}
                />
              </Stack>
            </Card>
          </Box>
          <Box py={'15px'}>
            <Typography fontWeight={'bold'}>Tỉnh thành</Typography>
            <Card sx={{ p: 3 }}>
              <Stack direction={'column'} spacing="15px">
                <Box>
                  <PovinceTableForm />
                </Box>
              </Stack>
            </Card>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: '20%', alignSelf: 'flex-end' }}
            loading={isSubmitting}
          >
            Lưu
          </LoadingButton>
          <ConfirmEditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            // setConfirmEdit={setConfirmEdit}
          />
        </FormProvider>
      </Container>
    </>
  );
};
