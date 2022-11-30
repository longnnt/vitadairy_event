import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import { dispatch, useSelector } from 'src/common/redux/store';
import {
  ButtonType,
  DEFAULT_FORM_VALUE,
  DEFAULT_SIZE_GIFT,
  GIFT_POINT,
  NO_ID,
  popupTypeOption,
  POPUP_CODE,
  POPUP_TYPE,
} from '../common/constants';
import {
  IEventProvince,
  IFormEdit,
  IGiftDetail,
  IProvince,
  ISelect,
  ISelectPopup,
  ITransactionType,
} from '../common/interface';
import { fomatFormData, formatDataProvinces, tranferData } from '../common/utils';
import { eidtEventPrizevalidate } from '../editEvent.Schema';
import {
  buttonTypeSelector,
  choosenGiftPointSelector,
  confirmEditSelector,
  editDataSelector,
  filterGiftSelector,
  giftByIdSelector,
  leftGiftSelector,
  openEditModalSelector,
  popUpTypeSelector,
  setChoosenGiftPoint,
  setConfirmEdit,
  setEditData,
  setFilterGift,
  setGiftById,
  setLeftGift,
  setOpeneditModal,
  setPopUpCode,
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
import { getAllTransactionType } from '../service';
import { RHFSelectPaginationSingle } from 'src/common/components/hook-form/RHFSelectPaginationSingle';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

// import { SelectPaginationTransaction } from './SelectPaginationTransaction';

// -----------------------------------------------------------------------------

export const EditEventPrizeForm = () => {
  const navigate = useNavigate();
  const buttonType = useSelector(buttonTypeSelector);
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
  const leftGift = useSelector(leftGiftSelector);

  const changePopUpType = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue('popupType', event.target.value, { shouldValidate: true });
    dispatch(setPopUpType(event.target.value));
  };

  const changePopUpCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue('popupCode', event.target.value, { shouldValidate: true });
    dispatch(setPopUpCode(event.target.value));
  };

  const handleRedirectToList = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.list);
  };

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

  const { data: transactionType } = useGetAllTransactionType({ except: idEventPrize });
  const transactionTypeOptions = transactionType?.map((item: ITransactionType) => ({
    value: item.id,
    label: item.description,
  }));
  const defaultTransactionType = transactionTypeOptions?.filter(
    (item: any) => item.value === dataEventPrizeById?.transactionTypeId
  );
  useDeepCompareEffect(() => {
    if (dataEventPrizeById) {
      const data = tranferData(dataEventPrizeById);
      reset(data);
      setValue(
        'transactionTypeId',
        defaultTransactionType ? defaultTransactionType[0] : ({} as ISelect)
      );
    }
  }, [dataEventPrizeById, defaultTransactionType]);
  const searchParams = { except: idEventPrize };

  const methods = useForm<IFormEdit>({
    resolver: yupResolver(eidtEventPrizevalidate(provinceId, leftGift)),
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
  const watchQuantity = watch('quantity');
  const watchEventDetailProvinces = Object.values(watch('eventDetailProvinces'));
  let usedGift = 0;
  if (watchEventDetailProvinces) {
    watchEventDetailProvinces.map((item: IEventProvince) => {
      if (item.quantity) usedGift = usedGift + item?.quantity;
      if (item.extraquantity) usedGift = usedGift + Number(item?.extraquantity);
    });
  }

  useDeepCompareEffect(() => {
    dispatch(setLeftGift(watchQuantity - usedGift));
  }, [usedGift, watchQuantity]);

  const { data: giftDetail } = useGetGiftById(
    dataEventPrizeById ? dataEventPrizeById?.giftId : NO_ID
  );
  useDeepCompareEffect(() => {
    if (giftDetail) setChoosenGift(giftDetail?.data?.response);
  }, [giftDetail]);
  const { mutate } = useEditEventPrize();

  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));

  const onSubmit = async (data: IFormEdit) => {
    handleOpenEditModal();
    const tempEditData = fomatFormData(data);
    if (typeof tempEditData.transactionTypeId !== 'number')
      tempEditData.transactionTypeId = tempEditData.transactionTypeId.value;

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

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [choosenGift, setChoosenGift] = useState<IGiftDetail>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterGift = useSelector(filterGiftSelector)
  const paramsGift = { page: page, size: DEFAULT_SIZE_GIFT, keySearch:''};
  if(filterGift.length > 2) paramsGift.keySearch = filterGift

  const { data } = useGetAllGift(paramsGift);
  const giftDta = data?.data?.response ? data?.data?.response : [];
  
  useDeepCompareEffect(() => {
    if (choosenGift) {
      setValue('giftId', choosenGift.id);
    }
  }, [choosenGift]);

  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  return (
    <>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography fontWeight={'bold'}>Thông tin tổng quan </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="ordinal" key={'ordinal'} label="Thứ tự ưu tiên*" />
                  <RHFTextField
                    name="probability"
                    key={'probability'}
                    label="Tỷ lệ trúng quà của sự kiện (%)*"
                  />
                  <RHFTextField
                    name="quantity"
                    key={'quantity'}
                    label="Tổng số lượng quà*"
                  />
                  <Box sx={{ zIndex: 1001 }}>
                    <RHFSelectPaginationSingle
                      name={'transactionTypeId'}
                      placeholder="Transaction type"
                      getAsyncData={getAllTransactionType}
                      searchParams={searchParams}
                      error={errors}
                    />
                    <FormHelperText error sx={{ marginLeft: '10px' }}>
                      {errors?.transactionTypeId?.message}
                    </FormHelperText>
                  </Box>
                  <RHFTextField
                    disabled
                    name="winnerAmount"
                    key={'winnerAmount'}
                    label="Số lượng user đã trúng"
                  />

                  <Typography color="#919EAB">Trạng thái quà</Typography>
                  <RHFSwitch name="giftStatus" key={'giftStatus'} label="" />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <RHFTextField
                    name="popupImageLink"
                    key={'popupImageLink'}
                    label="Link hình ảnh popup*"
                  />
                  <RHFSelect
                    name={'popupType'}
                    key="popupType"
                    value={popUpTypedata}
                    label={'Pop up type'}
                    onChange={(e) => {
                      changePopUpType(e);
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
                      name="popupLink"
                      key={'PopupHtmllink'}
                      label="Popup html link*"
                    />
                  )}
                  {popUpTypedata === POPUP_TYPE.DEEP_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'popupDeepLink'}
                      label="Popup deep link*"
                    />
                  )}

                  <RHFSelect
                    name="popupCode"
                    key={'popupCode'}
                    label="Pop up Code"
                    placeholder="Pop up Code"
                    margin="dense"
                    onChange={(e) => {
                      changePopUpCode(e);
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
                        label="Tiêu đề Pop up*"
                      />
                      <RHFTextField
                        multiline
                        rows={5}
                        name="popUpCodeContent"
                        key={'popUpCodeContent'}
                        label="Nội dung Pop up*"
                      />
                      <RHFTextField
                        name="popUpCodeCTA"
                        key={'popUpCodeCTA'}
                        label="CTA*"
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
                    // onFilterGift={handleFilterGift}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>

          <Box py={'15px'}>
            <Typography fontWeight={'bold'}>Thông báo</Typography>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <RHFTextField
                  name="notificationTitle"
                  key={'notificationTitle'}
                  label="Tiêu đề thông báo*"
                />
                <RHFTextField
                  name={'notificationDescription'}
                  key={'notificationDescription'}
                  label="Nội dung thông báo*"
                />

                <RHFTextField
                  // simple
                  name="notificationContent"
                  key={'notificationContent'}
                  label="Mô tả thông báo*"
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
          <Grid direction="row" justifyContent="flex-end" container mt={2}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: '20%', alignSelf: 'flex-end' }}
              loading={buttonType === ButtonType.SAVE_SUBMIT && isLoading}
            >
              Lưu
            </LoadingButton>
            {buttonType === ButtonType.SAVE_SUBMIT && (
              <ConfirmEditModal open={openEditModal} handleClose={handleCloseEditModal} />
            )}
            <LoadingButton
              variant="contained"
              size="large"
              sx={{ width: '20%', marginLeft: 2, alignSelf: 'flex-end' }}
              color="inherit"
              loading={buttonType === ButtonType.UNSAVE_EDIT_SUBMIT && isLoading}
              onClick={handleRedirectToList}
            >
              Hủy chỉnh sửa
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
};
