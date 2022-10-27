import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'src/common/components/hook-form';
import { DEFAULT_FORM_VALUE, popupTypeOption, POPUP_TYPE } from '../common/constants';
import {
  IEventProvince,
  IFormEdit,
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
// -----------------------------------------------------------------------------

export const EditEventPrizeForm = () => {
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const [provinceCount, setProvinceCount] = useState<number>(1);
  const [giftPoint, setGiftPoint] = useState<string>('gift');
  const [popupTypeOp, setPopupTypeOp] = useState<string>(POPUP_TYPE.HTML_LINK);
  const [giftProvince, setGiftProvince] = useState<IEventProvince[]>([]);

  const params = useParams();
  const idParams = params?.id;
  const idEventPrize = parseInt(idParams as string);
  const { data: dtaEventPrizeById } = useGetEventPrizeById(idEventPrize);
  // console.log('databyid', dtaEventPrizeById);
  const { data: dtaProvince } = useGetAllProvinceVN();
  const provinceOptions = dtaProvince?.data?.response?.provinces?.map(
    (item: IProvince) => ({
      value: item?.id,
      label: item?.name,
    })
  );
  const { data: transactionType } = useGetAllTransactionType();
  const dtaTransactionType = transactionType?.data;
  const transactionTypeOptions = dtaTransactionType?.response?.map(
    (item: ITransactionType) => ({
      value: item.id,
      label: item.code,
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
    formState: { isSubmitting, errors },
  } = methods;

  useDeepCompareEffect(() => {
    if (dtaEventPrizeById?.data?.response) {
      setProvinceCount(dtaEventPrizeById?.data?.response?.eventDetailProvinces?.length);
      reset(dtaEventPrizeById?.data?.response);
      setGiftProvince(dtaEventPrizeById?.data?.response?.eventDetailProvinces);
    }
  }, [dtaEventPrizeById]);
  const { mutate } = useEditEventPrize();
  const onSubmit = (data: IFormEdit) => {
    // console.log('form data', data);
    const tempDta = { ...data };
    delete tempDta.typeUser;
    const temp = data?.eventDetailProvinces?.map((item: IEventProvince) => {
      if (!(typeof item.extraquantity === 'string')) {
        delete item.extraquantity;
        return item;
      } else {
        const quantities = +item.quantity + +item.extraquantity;
        item = { ...item, quantity: quantities };
        return item;
      }
    });
    tempDta.eventDetailProvinces = temp;
    // console.log('temp>>>>', tempDta);

    mutate(tempDta, {
      onSuccess: () => {
        showSuccessSnackbar('edit successfully');
      },
      onError: () => {
        showErrorSnackbar('edit fail');
      },
    });
  };

  const handleCountProvince = () => {
    const temp = provinceCount;
    setProvinceCount(temp + 1);
  };
  const handleRemoveProvince = (index: number) => {
    const tempArr = [...giftProvince];
    tempArr.splice(index, 1);
    setGiftProvince(tempArr);
  };
  useDeepCompareEffect(() => {
    setValue('eventDetailProvinces', giftProvince);
    setProvinceCount(giftProvince.length);
  }, [giftProvince]);

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
                    sx={{ justifyContent: 'space-around' }}
                    name="typeUser"
                    defaultValue={'gift'}
                    onChange={(e) => {
                      setGiftPoint(e.target.value);
                    }}
                    options={[
                      { label: 'Tặng quà', value: 'gift' },
                      { label: 'Tặng điểm', value: 'point' },
                      { label: 'Tặng quà và điểm', value: 'giftandpoint' },
                    ]}
                  />
                  {giftPoint === 'gift' && (
                    <RHFSelect name={'giftId'} key="giftId" label={'Chọn quà'}>
                      <option value="" />
                      <option value="1">test</option>
                    </RHFSelect>
                  )}
                  {giftPoint === 'point' && (
                    <RHFTextField name="point" key={'point'} label="Nhập điểm" />
                  )}
                  {giftPoint === 'giftandpoint' && (
                    <Stack direction={'row'} spacing={2}>
                      <RHFSelect
                        name={' giftIdandpoint'}
                        key=" giftIdandpoint"
                        label={'Chọn quà'}
                      >
                        <option value="" />
                      </RHFSelect>
                      <RHFTextField
                        name="giftandpoint"
                        key={'giftandpoint'}
                        label="Nhập điểm"
                      />
                    </Stack>
                  )}
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
                  <Button fullWidth color="secondary" variant="contained" size="large">
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
                  {Array.from(Array(provinceCount)).map((c, index) => {
                    return (
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
                                label="End date"
                                inputFormat="dd/MM/yyyy hh:mm a"
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
                                inputFormat="dd/MM/yyyy hh:mm a"
                                renderInput={(params: any) => (
                                  <TextField {...params} fullWidth />
                                )}
                              />
                            )}
                          />
                          <Button
                            fullWidth
                            color="error"
                            variant="contained"
                            size="small"
                            sx={{ width: '10px' }}
                            onClick={() => handleRemoveProvince(index)}
                          >
                            <RemoveRoundedIcon />
                          </Button>
                        </Stack>
                      </Box>
                    );
                  })}
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
