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
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { DateTimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField
} from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { defaultValues } from '../../constants';
import { NewEventSchema } from '../../event.schema';
import { useAddEvent } from '../../hooks/useAddEvent';
import {
  IFormCreateEvent,
  IFormEventValuesProps,
  ITransactionType
} from '../../interfaces';
import { useGetAllNewEvent } from '../../hooks/useGetAllNewEvent';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function HistoryNewForm() {
  const navigate = useNavigate();
  const [valueChoice, setValueChoice] = React.useState("all");
  const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValueChoice((event.target as HTMLInputElement).value);
  };

  const [valueStartDate, setValueStartDate] = React.useState<Dayjs | null>(null);

  const handleChangeStartDate = (newValue: Dayjs | null) => {
    setValueStartDate(newValue);
  };
  const [valueEndDate, setValueEndDate] = React.useState<Dayjs | null>(null);
  const [popUpType, setPopUpType] = React.useState<string | null>('');
  const [popUpCode, setPopUpCode] = React.useState<string | null>('');
  const [giftPoint, setGiftPoint] = React.useState<string | null>('');

  const handleChangeEndDate = (newValue: Dayjs | null) => {
    setValueEndDate(newValue);
  };

  const changePopUpType = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPopUpType(event.target.value);
  };
  const changePopUpCode = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPopUpCode(event.target.value);
  };

  const changeGiftPoint = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGiftPoint(event.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add events successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddEvent({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.eventAdmin.list);
  }, [isSuccess]);

  const { data: addNewEventData } = useGetAllNewEvent();
  console.log( addNewEventData)

  // console.log(JSON.parse( addNewEventData?.data || {}))
  // const accounts = addNewEventData?.data?.response || [];
  // const addNewOption = accounts.map((item: ITransactionType) => ({
  //   key: item.id,
  //   name: item.name,
  // }));
  // console.log(addNewOption);

  const methods = useForm<IFormEventValuesProps>({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IFormCreateEvent) => {
    console.log(data);
    const dataEvent: IFormCreateEvent = {
      eventDetailProvinces: {
        endDate: data.eventDetailProvinces.endDate,
        id: data.eventDetailProvinces.id,
        provinceId: data.eventDetailProvinces.provinceId,
        quantity: data.eventDetailProvinces.quantity,
        startDate: data.eventDetailProvinces.startDate,
      },
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
      transactionTypeId: 0,
    };
    mutate(dataEvent);
  };

  return (
    <>
      <FormProvider methods={methods}>
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
                    name={'quantity'}
                    label="Số lượng quà user đã trúng"
                    margin="dense"
                  />
                  <RHFSelect
                    name="transactionTypeId"
                    label="Transaction type"
                    placeholder="Transaction type"
                    margin="dense"
                  >
                    {/* <option value="" />
                    {addNewOption.map((option: ITransactionType) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))} */}
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
                    onChange={(e) => changePopUpType(e)}
                    value={popUpType}
                  >
                    <option value=""></option>
                    <option value="dl">DEEP_LINK</option>
                    <option value="hl">HTML_LINK</option>
                    <option value="nl">NULL</option>
                  </RHFSelect>
                  <RHFTextField
                    name={'popupLink'}
                    label="Pop up html link..."
                    margin="dense"
                    disabled={popUpType !== "hl"}
                  />
                  <RHFTextField
                    name={'popupLink'}
                    label="Pop up deep link..."
                    margin="dense"
                    disabled={popUpType !== "dl"}
                  />
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
                  <RadioGroup row name="gifts" value={valueChoice} onChange={handleChangeChoice}>
                    <FormControlLabel
                      value="gift"
                      control={<Radio />}
                      label="Tặng Quà"
                      
                    />
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
                      <Button fullWidth sx={{display: (valueChoice !== "point" ? "block" : "none")}} variant="contained" color="info" size="large">
                        Chọn quà
                      </Button>
                    </Grid>
                    <Grid item xs>
                      {/* <Button fullWidth color="info" variant="outlined" size="large">
                        Nhập điểm
                      </Button> */}
                      <RHFTextField
                        type='number'
                        name={'point'}
                        label="Nhập điểm."
                        margin="dense"
                        sx={{display: (valueChoice !== "gift" ? "block" : "none")}}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <LabelStyle>Thông báo</LabelStyle>
            <Card sx={{ p: 3, width: '100%', my: 3 }}>
              <Grid>
                <RHFTextField name={'notificationTitle'} label="Tiêu đề thông báo" margin="dense" />
                <RHFTextField name={'notificationContent'} label="Nội dung thông báo" margin="dense" />
                <div>
                  <LabelStyle>Mô tả thông báo</LabelStyle>
                  <RHFEditor className="category__text-editor" simple name={'notificationDescription'} />
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
                    <Button color="inherit" variant="outlined" size="large">
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs>
                    <RHFSelect
                      name="userType"
                      label="Tỉnh thành"
                      placeholder="Tỉnh thành"
                    >
                      <option value=""></option>
                     
                    </RHFSelect>
                  </Grid>
                  <Grid item xs>
                    <RHFTextField name={'quantity'} label="Tổng Số lượng giải theo tỉnh" />
                  </Grid>
                  <Grid item xs>
                    <RHFTextField name={'provinceId'} label="Số giải nhập thêm" />
                  </Grid>
                  <Grid item xs>
                  <DateTimePicker
                    label="Ngày bắt đầu"
                    inputFormat="MM/dd/yyyy"
                    value={valueStartDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </Grid>
                  <Grid item xs>
                  <DesktopDatePicker
                    label="Ngày kết thúc"
                    inputFormat="MM/dd/yyyy"
                    value={valueEndDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </Grid>
                  <Grid item xs={1}>
                    <Button color="inherit" variant="contained" size="large">
                      -
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid direction="row" justifyContent="flex-end" container mt={2}>
            <Box sx={{ paddingRight: 2 }}>
              <Button color="inherit" variant="outlined" size="large">
                Lưu
              </Button>
            </Box>
            <Box>
              <LoadingButton color="inherit" variant="outlined" size="large">
                Lưu & Chỉnh sửa
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
