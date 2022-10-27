import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField
} from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { defaultValues, popupTypeOption, POPUP_TYPE } from '../../constants';
import { eventPrizeSchema } from '../../event.schema';
import { useAddEvent } from '../../hooks/useAddEvent';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { IFormCreateEvent, ISelectPopup } from '../../interfaces';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function HistoryNewForm() {
  const navigate = useNavigate();
  const [valueChoice, setValueChoice] = React.useState('all');
  const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueChoice((event.target as HTMLInputElement).value);
  };

  const [valueStartDate, setValueStartDate] = React.useState<Dayjs | null>(null);
  const [valueEndDate, setValueEndDate] = React.useState<Dayjs | null>(null);
  const [popUpType, setPopUpType] = useState<string>(POPUP_TYPE.HTML_LINK);
  const [popUpCode, setPopUpCode] = React.useState<string | null>('');
  const [idHolder, setidHolder] = React.useState<number | undefined>(0);
  const [provinceCount, setProvinCount] = useState<
    Array<{
      id: number;
      startDate: Dayjs | null;
      endDate: Dayjs | null;
      transactionType: string;
      countProvince: number;
      morePrize: number;
    }>
  >([
    {
      id: 0,
      startDate: null,
      endDate: null,
      transactionType: '',
      countProvince: 1,
      morePrize: 0,
    },
  ]);

  const removeCount = (index: number) => {
    setidHolder(index);
    console.log(index);
    console.log([...provinceCount].filter((item) => item.id !== idHolder));
    setProvinCount([...provinceCount].filter((item) => item.id !== idHolder));
  };

  const changePopUpType = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPopUpType(event.target.value);
    setValue('popupType', event.target.value);
  };
  const changePopUpCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPopUpCode(event.target.value);
    setValue('popupCode', event.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add event successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add event error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddEvent({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventAdmin.listPrize);
  }, [isSuccess]);

  const { data: addTransaction } = useGetAllTranSacTion();
  const dataTransaction = addTransaction?.data?.response || [];
  const addNewOption1 = dataTransaction.map((item) => ({
    key: item.id,
    name: item.description,
  }));

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response || [];
  const addNewOption2 = dataProvince.map((item) => ({
    key: item.id,
    name: item.name,
  }));

  const methods = useForm<IFormCreateEvent>({
    resolver: yupResolver(eventPrizeSchema),
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
    console.log(data)
    const dataEvent: IFormCreateEvent = {
      eventDetailProvinces: data.eventDetailProvinces,
      eventId: data.eventId,
      giftId: data.giftId,
      id: data.id,
      notificationContent: data.notificationContent,
      notificationDescription: data.notificationDescription,
      notificationTitle: data.notificationTitle,
      ordinal: data.ordinal,
      popupCode: data.popupCode,
      popupImageLink: data.popupImageLink,
      popupLink: data.popupLink,
      popupType: data.popupType,
      probability: data.probability,
      quantity: data.quantity,
      transactionTypeId: data.transactionTypeId,
    };
    mutate(dataEvent);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid spacing={3} container>
              <Grid item xs={6}>
                <LabelStyle>Thông báo tổng quan</LabelStyle>
                <Card sx={{ p: 3, width: '100%' }}>
                  <RHFTextField name={'ordinal'} label="Thứ tự ưu tiên" margin="dense" />
                  <RHFTextField
                    name={'probability'}
                    label="Tỉ lệ trúng quà của sự kiện(%)"
                    margin="dense"
                  />
                  <RHFTextField
                    name={'quantity'}
                    label="Tổng số lượng quà..."
                    margin="dense"
                  />
                  <RHFTextField
                    name={''}
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Số lượng quà user đã trúng"
                    margin="dense"
                  />
                  <RHFSelect
                    name={'transactionTypeId'}
                    label="Transaction type"
                    placeholder="Transaction type"
                    margin="dense"
                  >
                    <option value="" />
                    {addNewOption1.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 3, width: '100%' }}>
                  <RHFTextField
                    name={'popupImageLink'}
                    label="Link hình ảnh Pop up..."
                    margin="dense"
                  />
                  <RHFSelect
                    name="popupType"
                    label="Pop up Type"
                    placeholder="Pop up Type"
                    margin="dense"
                    onChange={(e) => {
                      const val = e.target.value;
                      setPopUpType(val);
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
                  {popUpType === POPUP_TYPE.HTML_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'PopupHtmllink'}
                      label="Popup html link"
                    />
                  )}
                  {popUpType === POPUP_TYPE.DEEP_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'popupDeepLink'}
                      label="Popup deep link"
                    />
                  )}
                  <RHFSelect
                    name="popupCode"
                    label="Pop up Code"
                    placeholder="Pop up Code"
                    margin="dense"
                    onChange={(e) => changePopUpCode(e)}
                    value={popUpCode}
                  >
                    <option value=""></option>
                    <option value="pp">PUZZLE PIECE</option>
                    <option value="o">OGGI</option>
                    <option value="fs">FULL_SCREEN</option>
                  </RHFSelect>
                  <RadioGroup
                    row
                    name="gifts"
                    value={valueChoice}
                    onChange={handleChangeChoice}
                  >
                    <FormControlLabel value="gift" control={<Radio />} label="Tặng Quà" />
                    <FormControlLabel
                      value="point"
                      control={<Radio />}
                      label="Tặng Điểm"
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="Tặng Quà và Điểm"
                    />
                  </RadioGroup>
                  <Grid container spacing={3}>
                    <Grid item xs>
                      <Button
                        fullWidth
                        sx={{ display: valueChoice !== 'point' ? 'block' : 'none' }}
                        variant="contained"
                        color="info"
                        size="large"
                      >
                        Chọn quà
                      </Button>
                    </Grid>
                    <Grid item xs>
                      <RHFTextField
                        type="number"
                        name={'point'}
                        label="Nhập điểm."
                        margin="dense"
                        sx={{ display: valueChoice !== 'gift' ? 'block' : 'none' }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <LabelStyle>Thông báo</LabelStyle>
            <Card sx={{ p: 3, width: '100%', my: 3 }}>
              <Grid>
                <RHFTextField
                  name={'notificationTitle'}
                  label="Tiêu đề thông báo"
                  margin="dense"
                />
                <RHFTextField
                  name={'notificationContent'}
                  label="Nội dung thông báo"
                  margin="dense"
                />
                <div>
                  <LabelStyle>Mô tả thông báo</LabelStyle>
                  <RHFEditor
                    className="category__text-editor"
                    simple
                    name={'notificationDescription'}
                  />
                </div>
              </Grid>
            </Card>
            <LabelStyle>Tỉnh thành</LabelStyle>
            <Card sx={{ p: 3, width: '100%' }}>
              <Grid>
                <Grid direction="row" justifyContent="flex-end" container>
                  <Box sx={{ paddingRight: 2 }}>
                    <Button color="inherit" variant="outlined" size="large">
                      Nhập
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color="inherit"
                      onClick={() => {
                        setidHolder((idHolder || 0) + 1);
                        setProvinCount([
                          ...provinceCount,
                          {
                            id: (idHolder || 0) + 1,
                            startDate: valueStartDate,
                            endDate: valueEndDate,
                            transactionType: '',
                            countProvince: 1,
                            morePrize: 1,
                          },
                        ]);
                      }}
                      variant="outlined"
                      size="large"
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                {provinceCount.map((item, index) => {
                  return (
                    <>
                      <Grid key={index} container spacing={3} sx={{ mt: 0.5 }}>
                        <Grid item xs>
                          <RHFSelect
                            name={`eventDetailProvinces.${index}.provinceId`}
                            key={`eventDetailProvinces.${index}.provinceId`}
                            label="Tỉnh thành"
                            placeholder="Tỉnh thành"
                          >
                            <option value="" />
                            {addNewOption2.map((option) => (
                              <option key={option.key} value={option.key}>
                                {option.name}
                              </option>
                            ))}
                          </RHFSelect>
                        </Grid>
                        <Grid item xs>
                          <RHFTextField
                            name={`eventDetailProvinces.${index}.quantity`}
                            key={`eventDetailProvinces.${index}.quantity`}
                            InputProps={{
                              readOnly: true,
                            }}
                            label="Tổng Số lượng giải theo tỉnh"
                          />
                        </Grid>
                        <Grid item xs>
                          <RHFTextField
                            name={`eventDetailProvinces.${index}.quantity`}
                            key={`eventDetailProvinces.${index}.quantity`}
                            label="Số giải nhập thêm"
                          />
                        </Grid>
                        <Grid item xs>
                        <Controller
                            name={`eventDetailProvinces.${index}.startDate`}
                            key={`eventDetailProvinces.${index}}.startDate`}
                            control={control}
                            render={({ field }: { field: any }) => (
                              <MobileDateTimePicker
                                {...field}
                                key="startDate"
                                label="Ngày bắt đầu"
                                inputFormat="dd/MM/yyyy hh:mm a"
                                renderInput={(params: any) => (
                                  <TextField {...params} fullWidth />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs>
                        <Controller
                            name={`eventDetailProvinces.${index}.endDate`}
                            key={`eventDetailProvinces.${index}.endDate`}
                            control={control}
                            render={({ field }: { field: any }) => (
                              <MobileDateTimePicker
                                {...field}
                                key="endDate"
                                label="Ngày kết thúc"
                                inputFormat="dd/MM/yyyy hh:mm a"
                                renderInput={(params: any) => (
                                  <TextField {...params} fullWidth />
                                )}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            color="inherit"
                            onClick={() => {
                              removeCount(item.id);
                            }}
                            variant="contained"
                            size="large"
                          >
                            -
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Card>
          </Grid>

          <Grid direction="row" justifyContent="flex-end" container mt={2}>
            <Box sx={{ paddingRight: 2 }}>
              <LoadingButton color="inherit" variant="outlined" size="large" type="submit">
                Lưu
              </LoadingButton>
            </Box>
            <Box>
              <LoadingButton color="inherit" variant="outlined" size="large" type='submit'>
                Lưu & Chỉnh sửa
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
