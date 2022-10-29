import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// import { } from 'fs';
// import { readFileSync } from 'fs';
import {
  Button,
  Card,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { parse, ParseResult } from 'papaparse';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { string } from 'yup';
import {
  defaultValues,
  popupTypeOption,
  POPUP_TYPE,
  StyleGift,
  TABLE_HEAD_GIFT,
} from '../../constants';
import { eventPrizeSchema } from '../../event.schema';
import { giftSelecttor } from '../../event.slice';
import { useAddEvent } from '../../hooks/useAddEvent';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { useGetGilf } from '../../hooks/useGetGilf';
import {
  IEventDetail,
  IFormCreateEvent,
  IGiftParams,
  ISelectPopup,
} from '../../interfaces';
import { GiftTableRow } from './GiftTableRow';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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

  const [valueStartDate, setValueStartDate] = React.useState<Dayjs | null>(null);
  const [valueEndDate, setValueEndDate] = React.useState<Dayjs | null>(null);
  const [popUpType, setPopUpType] = useState<string>(POPUP_TYPE.HTML_LINK);
  const [popUpCode, setPopUpCode] = React.useState<string | null>('');
  const [idHolder, setidHolder] = React.useState<number | undefined>(0);
  const [redirect, setRedirect] = React.useState<boolean>(true);
  const [filesCsv, setfilesCsv] = React.useState<Array<unknown>>([]);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const gift = useSelector(giftSelecttor);

  const keyName1 = 'Province name';
  const keyName2 = 'start-date';
  const keyName3 = 'end-date';

  type DataCSV = {
    id: number,
    amount: number,
    [keyName1] : string,
    [keyName2] : string | Dayjs | null,
    [keyName3] : string | Dayjs | null,
  };

  type DataCites = {
    id: number;
    name: string;
    amount: number;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };

  const [dataCities, setDataCities] = React.useState<DataCites[]>([]);

  // const [provinceCount, setProvinCount] = useState<
  //   Array<{
  //     id: number;
  //     startDate: Dayjs | null;
  //     endDate: Dayjs | null;
  //     transactionType: string;
  //     countProvince: number;
  //     morePrize: number;
  //   }>
  // >([]);

  const removeCount = (index: number) => {
    setidHolder(index);
    setDataCities([...dataCities].filter((item) => item.id !== idHolder));
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
    enqueueSnackbar('Đã lưu thành công', {
      variant: 'success',
    });
  };

  const onError = () => {
    enqueueSnackbar('Lưu thất bại', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useAddEvent({ onSuccess, onError });

  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    if (isSuccess && redirect)
      navigate(PATH_DASHBOARD.eventAdmin.listPrize(id as string));
  }, [isSuccess]);
  const idEventPrize = parseInt(id as string);

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

  const searchParams: IGiftParams = {
    page: page,
    size: rowsPerPage,
  };
  const { data: ListGift } = useGetGilf(searchParams);
  const dataGift = ListGift?.data?.response || [];
  const { totalRecords } = ListGift?.data?.pagination || {
    totalRecords: 0,
  };

  

  const importFile = async (event: any) => {
    try {
      const allowedExtensions = ['csv'];
      if (event.target.files.length) {
        const inputFile = event.target.files[0];

        const fileExtension = inputFile?.type.split('/')[1];
        if (!allowedExtensions.includes(fileExtension)) {
          enqueueSnackbar('không phải file csv')
          return;
        }
        setfilesCsv(inputFile);
      }
      if (!event.target.files[0]) return enqueueSnackbar('file không hợp lệ!!!');
      parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        encoding: "utf-8",
        complete: (results: ParseResult<DataCSV>) => {
          const test : DataCSV[] = results.data;
          const data : any = test.map(item => ({
            name: item[keyName1],
            id: item.id,
            amount: item.amount,
            startDate: item[keyName2],
            endDate: item[keyName3],
          }));
          setDataCities(data);
          enqueueSnackbar('import file thành công')
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
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
    const eventDetailProvinces = data.eventDetailProvinces.map((item) => {
      if (item.endDate || item.startDate) {
        const startDate = new Date(item.startDate).toISOString();
        const endDate = new Date(item.endDate).toISOString();
        return { ...item, startDate: startDate, endDate: endDate };
      }
    });
    const dataEvent: IFormCreateEvent = {
      eventDetailProvinces: eventDetailProvinces as Array<IEventDetail>,
      eventId: idEventPrize,
      giftId: gift.id,
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
                    name="probability"
                    key={'probability'}
                    label="Tỉ lệ trúng quà của sự kiện(%)"
                    margin="dense"
                  />
                  <RHFTextField
                    name="quantity"
                    key={'quantity'}
                    label="Tổng số lượng quà..."
                    margin="dense"
                  />
                  <RHFTextField
                    name="id"
                    key={'id'}
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Số lượng quà user đã trúng"
                    margin="dense"
                  />
                  <RHFSelect
                    name={'transactionTypeId'}
                    key="transactionTypeId"
                    label={'Transaction type'}
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
                    name="popupImageLink"
                    key={'popupImageLink'}
                    label="Link hình ảnh Pop up..."
                    margin="dense"
                  />
                  <RHFSelect
                    name={'popupType'}
                    key="popupType"
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
                      key={'popupLink'}
                      label="Popup html link"
                    />
                  )}
                  {popUpType === POPUP_TYPE.DEEP_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'popupLink'}
                      label="Popup deep link"
                    />
                  )}
                  <RHFSelect
                    name="popupCode"
                    key={'popupCode'}
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
                    name={'giftId'}
                    key="giftId"
                    // value={valueChoice}
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
                        onClick={handleOpen}
                      >
                        Chọn quà
                      </Button>
                      <Box
                        sx={{
                          color: 'white',
                          marginTop: '5px',
                          display: valueChoice !== 'point' ? 'block' : 'none',
                        }}
                      >
                        {gift.name}
                      </Box>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={StyleGift}>
                          <Scrollbar>
                            <TableContainer sx={{ position: 'relative' }}>
                              <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD_GIFT} />
                              </Table>
                              <TableBody>
                                {dataGift.map((row) => (
                                  <GiftTableRow
                                    key={row.id}
                                    row={row}
                                    handleClose={handleClose}
                                  />
                                ))}
                              </TableBody>
                            </TableContainer>
                          </Scrollbar>
                          {!!ListGift?.data?.pagination?.totalPages && (
                            <TablePagination
                              rowsPerPageOptions={[10, 15]}
                              component="div"
                              count={totalRecords}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={onChangePage}
                              onRowsPerPageChange={onChangeRowsPerPage}
                            />
                          )}
                        </Box>
                      </Modal>
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
                  name="notificationTitle"
                  key={'notificationTitle'}
                  label="Tiêu đề thông báo"
                  margin="dense"
                />
                <RHFTextField
                  name={'notificationDescription'}
                  key={'notificationDescription'}
                  label="Nội dung thông báo"
                  margin="dense"
                />
                <div>
                  <LabelStyle>Mô tả thông báo</LabelStyle>
                  <RHFEditor
                    className="category__text-editor"
                    simple
                    name="notificationContent"
                    key={'notificationContent'}
                  />
                </div>
              </Grid>
            </Card>
            <LabelStyle>Tỉnh thành</LabelStyle>
            <Card sx={{ p: 3, width: '100%' }}>
              <Grid sx={{maxHeight: 450}}>
                <Grid direction="row" justifyContent="flex-end" container>
                  <Box sx={{ paddingRight: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon={'mdi:file-import'} />}
                      component="label"
                    >
                      Nhập
                      <input hidden multiple type="file" onChange={importFile} />
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      color="inherit"
                      onClick={() => {
                        setidHolder((idHolder || 0) + 1);
                        setDataCities([
                          ...dataCities,
                          {
                            id: (idHolder || 0) + 1,
                            startDate: valueStartDate,
                            endDate: valueEndDate,
                            name: "",
                            amount: 0,
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
                <Grid sx={{maxHeight: 450, overflow:'auto'}}>
                  {dataCities && dataCities.map((item, index) => {
                    return (
                      <Grid key={index} container spacing={3} sx={{ mt: 0.5 }}>
                        <Grid item xs>
                          <RHFSelect
                            name={`eventDetailProvinces.${index}.provinceId`}
                            key={`eventDetailProvinces.${index}.provinceId`}
                            label="Tỉnh thành"
                            placeholder="Tỉnh thành"
                            value={item.name}

                          >
                            <option value="" />
                            {addNewOption2.map((option) => (
                              <option key={option.key} value={option.name} >
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
                            value={item.amount}
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
                              <DatePicker
                                {...field}
                                key="startDate"
                                label="Ngày bắt đầu"
                                inputFormat="dd/MM/yyyy"
                                value={dayjs(item.startDate  || null, "DD/MM/YYYY")}
                                renderInput={(params: any) => (
                                  <TextField {...params} fullWidth/>
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
                              <DatePicker
                                {...field}
                                key="endDate"
                                label="Ngày kết thúc"
                                inputFormat="dd/MM/yyyy"
                                value={dayjs(item.endDate  || null, "DD/MM/YYYY")}
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
                              removeCount(item?.id);
                            }}
                            variant="contained"
                            size="large"
                          >
                            -
                          </Button>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid direction="row" justifyContent="flex-end" container mt={2}>
            <Box sx={{ paddingRight: 2 }}>
              <LoadingButton
                color="inherit"
                variant="outlined"
                size="large"
                type="submit"
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
                onClick={(e) => {
                  setRedirect(false);
                }}
              >
                Lưu & Chỉnh sửa
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
