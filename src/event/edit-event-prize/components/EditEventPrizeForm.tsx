import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'src/common/components/hook-form';
import {
  DATE_FORMAT,
  DEFAULT_FORM_VALUE,
  NO_ID,
  popupTypeOption,
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
import { eidtEventPrizeSchema } from '../editEvent.Schema';
import { useGetAllProvinceVN } from '../hooks/useGetAllProvinceVN';
import { useGetAllTransactionType } from '../hooks/useGetAllTransactionType';
import { useGetEventPrizeById } from '../hooks/useGetEventPrizeById';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEditEventPrize } from '../hooks/useEditEventPrize';
import useShowSnackbar from 'src/common/hooks/useMessage';
import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { GiftModal } from './GìiftModal';
import { convertExcelFileToObj, validateFileImportFormat } from '../common/ultils';
import Iconify from 'src/common/components/Iconify';
import { useGetAllGift } from '../hooks/useGetAllGift';
import { useGetGiftById } from '../hooks/useGetGiftById';
import _ from 'lodash';

// -----------------------------------------------------------------------------

export const EditEventPrizeForm = () => {
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const [giftPoint, setGiftPoint] = useState<string>('gift');
  const [popupTypeOp, setPopupTypeOp] = useState<string>(POPUP_TYPE.HTML_LINK);
  const [choosenGift, setChoosenGift] = useState<IGiftDetail>();

  const params = useParams();
  const idParams = params?.id;
  const idEventPrize = parseInt(idParams as string);
  const { data: dtaProvince } = useGetAllProvinceVN();
  const provincesData = dtaProvince?.data?.response?.provinces;
  const provinceOptions = provincesData?.map((item: IProvince) => ({
    value: item?.id,
    label: item?.name,
  }));
  const { data: dataEventPrizeById } = useGetEventPrizeById(idEventPrize);
  const dtaEventPrizeById = dataEventPrizeById?.data;

  const { data: transactionType } = useGetAllTransactionType();
  const dtaTransactionType = transactionType?.data;
  const transactionTypeOptions = dtaTransactionType?.response?.map(
    (item: ITransactionType) => ({
      value: item.id,
      label: item.description,
    })
  );

  const methods = useForm<IFormEdit>({
    resolver: yupResolver(eidtEventPrizeSchema),
    defaultValues: DEFAULT_FORM_VALUE,
  });
  const {
    setValue,
    handleSubmit,
    reset,
    control,
    resetField,
    formState: { isSubmitting, errors },
  } = methods;

  const { data: giftDetail } = useGetGiftById(
    dtaEventPrizeById ? dtaEventPrizeById?.response?.giftId : NO_ID
  );
  useDeepCompareEffect(() => {
    if (giftDetail) setChoosenGift(giftDetail?.data?.response);
  }, [giftDetail]);
  // ------------mutate---------------
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useEditEventPrize();

  const onSubmit = (data: IFormEdit) => {
    const tempDta = { ...data };
    delete tempDta.typeUser;

    const temp = data?.eventDetailProvinces?.map((item: IEventProvince) => {
      if (item.endDate || item.startDate) {
        const startDate = new Date(item.startDate).toISOString();
        const endDate = new Date(item.endDate).toISOString();
        item = { ...item, startDate: startDate, endDate: endDate };
      }
      if (typeof item.provinceId === 'string') {
        const provId = parseInt(item.provinceId);
        item = { ...item, provinceId: provId };
      }
      if (!(typeof item.extraquantity === 'string')) {
        delete item.extraquantity;
        item = { ...item, quantity: 0 };
      } else {
        const totalQuantities = +item.extraquantity;
        item = { ...item, quantity: totalQuantities };
      }
      return item;
    });
    tempDta.eventDetailProvinces = temp;

    mutate(tempDta, {
      onSuccess: () => {
        showSuccessSnackbar('edit successfully');
        setFileImport([]);
        for (let i = 0; i < fileImport.length; i++) {
          resetField(`eventDetailProvinces.${i}.extraquantity`);
        }
      },
      onError: () => {
        showErrorSnackbar('edit fail');
      },
    });
  };

  const handleCountProvince = () => {
    setFileImport([
      ...fileImport,
      {
        provinceId: fileImport.length + 100,
        startDate: new Date(),
        endDate: new Date(),
        quantity: 0,
      },
    ]);
  };
  const handleRemoveProvince = (provinceId: number) => {
    setFileImport([...fileImport].filter((item) => item.provinceId !== provinceId));
  };

  useDeepCompareEffect(() => {
    if (choosenGift) {
      setValue('giftId', choosenGift.id);
    }
  }, [choosenGift]);

  // ----------------set modal parameter---------------

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const SIZE = 10;
  const paramsGift = { page: page, size: SIZE };
  const { data } = useGetAllGift(paramsGift);
  const giftDta = data?.data?.response ? data?.data?.response : [];

  // ---------------set import file----------------------

  const [fileImport, setFileImport] = useState<IEventProvince[]>([]);
  useDeepCompareEffect(() => {
    if (dtaEventPrizeById?.response) {
      setFileImport(
        _.sortBy(dtaEventPrizeById?.response?.eventDetailProvinces, (o) => o.provinceId)
      );
      reset(dtaEventPrizeById?.response);
    }
  }, [dtaEventPrizeById]);

  const handleOnInuputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      convertExcelFileToObj(files[0], setFileImport, fileImport);
    }
    const testValidateImport = validateFileImportFormat(fileImport);
    if (!testValidateImport) {
      showErrorSnackbar('File import  không đúng định dạng');
    } else {
      showSuccessSnackbar('import file thành công');
    }
  };

  useEffect(() => {
    if (fileImport)
      setValue(
        'eventDetailProvinces',
        _.sortBy(fileImport, (o) => o.provinceId)
      );
  });

  return (
    <>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography fontWeight={'bold'}>Thông tin tổng quan </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField
                    name="ordinal"
                    key={'ordinal'}
                    label="Thứ tự ưu tiên..."
                  />
                  <RHFTextField
                    name="probability"
                    key={'probability'}
                    label="Tỷ lệ trúng quà của sự kiện (%)"
                  />
                  <RHFTextField
                    name="quantity"
                    key={'quantity'}
                    label="Tổng số lượng quà..."
                  />
                  <RHFTextField
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
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField
                    name="popupImageLink"
                    key={'popupImageLink'}
                    label="Link hình ảnh popup"
                  />
                  <RHFSelect
                    name={'popupType'}
                    key="popupType"
                    label={'Popup type'}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPopupTypeOp(val);
                      setValue('popupType', val);
                    }}
                  >
                    <option value="" />
                    {popupTypeOption.map((item: ISelectPopup) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </RHFSelect>
                  {popupTypeOp === POPUP_TYPE.HTML_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'PopupHtmllink'}
                      label="Popup html link"
                    />
                  )}
                  {popupTypeOp === POPUP_TYPE.DEEP_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'popupDeepLink'}
                      label="Popup deep link"
                    />
                  )}

                  <RHFTextField name="popupCode" key={'popupCode'} label="popupCode" />
                  <RHFRadioGroup
                    sx={{ justifyContent: 'flex-start' }}
                    name="typeUser"
                    defaultValue={'gift'}
                    onChange={(e) => {
                      setGiftPoint(e.target.value);
                    }}
                    options={[
                      { label: 'Tặng quà', value: 'gift' },
                      // { label: 'Tặng điểm', value: 'point' },
                      // { label: 'Tặng quà và điểm', value: 'giftandpoint' },
                    ]}
                  />
                  {giftPoint === 'gift' && (
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
                  {/* {giftPoint === 'point' && (
                    <RHFTextField name="point" key={'point'} label="Nhập điểm" />
                  )}
                  {giftPoint === 'giftandpoint' && (
                    <Stack direction={'row'} justifyContent="space-between">
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ width: '30%', alignSelf: 'flex-start' }}
                      >
                        Chọn quà
                      </Button>
                      <RHFTextField
                        sx={{ width: '30%' }}
                        size="medium"
                        name="giftandpoint"
                        key={'giftandpoint'}
                        label="Nhập điểm"
                      />
                    </Stack>
                  )} */}
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

                <RHFEditor
                  simple
                  name="notificationContent"
                  key={'notificationContent'}
                />
              </Stack>
            </Card>
          </Box>
          <Box py={'15px'}>
            <Typography fontWeight={'bold'}>Tỉnh thành</Typography>
            <Card sx={{ p: 3 }}>
              <Stack direction={'column'} spacing="15px">
                <Stack
                  direction={'row'}
                  spacing={1.5}
                  sx={{ mt: 3, alignSelf: 'flex-end' }}
                >
                  <input
                    type="file"
                    accept="xlsx,CSV"
                    ref={ref}
                    style={{ display: 'none' }}
                    onChange={(e) => handleOnInuputFile(e)}
                  />
                  <Button
                    fullWidth
                    startIcon={<Iconify icon={'mdi:file-import'} />}
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={() => ref?.current?.click()}
                  >
                    Nhập
                  </Button>

                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    size="medium"
                    onClick={handleCountProvince}
                  >
                    <AddIcon />
                  </Button>
                </Stack>
                <Box>
                  {fileImport?.map((item: IEventProvince, index: number) => (
                    <Box key={`eventDetailProvinces.${index}`} py="10px">
                      <Stack direction={'row'} spacing="3px">
                        <RHFSelect
                          name={`eventDetailProvinces.${index}.provinceId`}
                          key={`eventDetailProvinces.${index}.provinceId`}
                          label={'Tỉnh thành'}
                        >
                          <option value="" />
                          {provinceOptions?.map((item: ISelect) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFTextField
                          disabled
                          name={`eventDetailProvinces.${index}.quantity`}
                          key={`eventDetailProvinces.${index}.quantity`}
                          label="Tổng số lượng giải theo tỉnh"
                        />
                        <RHFTextField
                          name={`eventDetailProvinces.${index}.extraquantity`}
                          key={`eventDetailProvinces.${index}.extraquantity`}
                          label="Số giải nhập thêm"
                        />
                        <Controller
                          name={`eventDetailProvinces.${index}.startDate`}
                          key={`eventDetailProvinces.${index}}.startDate`}
                          control={control}
                          render={({ field }: { field: any }) => (
                            <MobileDateTimePicker
                              {...field}
                              key="startDate"
                              label="Start date"
                              inputFormat={DATE_FORMAT}
                              renderInput={(params: any) => (
                                <TextField {...params} fullWidth />
                              )}
                            />
                          )}
                        />
                        <Controller
                          name={`eventDetailProvinces.${index}.endDate`}
                          key={`eventDetailProvinces.${index}.endDate`}
                          control={control}
                          render={({ field }: { field: any }) => (
                            <MobileDateTimePicker
                              {...field}
                              key="startDate"
                              label="End date"
                              inputFormat={DATE_FORMAT}
                              renderInput={(params: any) => (
                                <TextField {...params} fullWidth />
                              )}
                            />
                          )}
                        />
                        <Button
                          // fullWidth
                          color="error"
                          variant="contained"
                          size="small"
                          sx={{ width: '50px', height: '50px' }}
                          onClick={() => handleRemoveProvince(item.provinceId)}
                        >
                          <RemoveRoundedIcon />
                        </Button>
                      </Stack>
                    </Box>
                  ))}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: '20%', alignSelf: 'flex-end' }}
                >
                  Lưu
                </Button>
              </Stack>
            </Card>
          </Box>
        </FormProvider>
      </Container>
    </>
  );
};
