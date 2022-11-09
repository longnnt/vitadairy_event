import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
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
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { parse, ParseResult } from 'papaparse';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  ButtonType,
  COLUMNS_HEADERS,
  defaultValues,
  FORMAT_DATE,
  popupTypeOption,
  POPUP_TYPE,
  STYLE_GIFT,
  TABLE_HEAD_GIFT,
} from '../../constants';
import { createEventPrizevalidate } from '../../event.schema';
import {
  giftSelecttor,
  popUpCodeSelector,
  popUpTypeSelector,
  setButtonType,
  setDataCities,
  setDataCitiesSelector,
  setFileCSV,
  setGift,
  setOpen,
  setOpenSelector,
  setPopUpCode,
  setPopUpType,
  setProvinceNewFormSelector,
} from '../../event.slice';
import { useAddEvent } from '../../hooks/useAddEvent';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { useGetGilf } from '../../hooks/useGetGilf';
import {
  IEventDetail,
  IFormCreateEvent,
  IGiftParams,
  ISelect,
  ISelectPopup,
} from '../../interfaces';
import { GiftTableRow } from './GiftTableRow';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import useShowSnackbar from 'src/common/hooks/useMessage';
import FullFeaturedCrudGrid from './ProvinceTableRow';
import useDeepEffect from 'src/common/hooks/useDeepEffect';

dayjs.extend(customParseFormat);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function HistoryNewForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const [valueChoice, setValueChoice] = React.useState('all');
  const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueChoice((event.target as HTMLInputElement).value);
  };

  const dispatch = useDispatch();
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

  const gift = useSelector(giftSelecttor);
  const popUpType = useSelector(popUpTypeSelector);
  const popUpCode = useSelector(popUpCodeSelector);
  const open = useSelector(setOpenSelector);
  const dataCities = useSelector(setDataCitiesSelector);
  const dataProvinceform = useSelector(setProvinceNewFormSelector);
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  const removeCount = (provinceId: number) => {
    dispatch(
      setDataCities([...dataCities].filter((item) => item.provinceId !== provinceId))
    );
  };

  const handleChangeCity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    province: IEventDetail
  ) => {
    const newData: IEventDetail[] = [...dataCities];
    let itemEdit: IEventDetail = { ...province };

    // find edit index and item edit in array
    let provinceIdx = 0;
    newData.forEach((item, index) => {
      if (item.provinceId === province.provinceId) {
        itemEdit = item;
        provinceIdx = index;
      }
    });

    // get key edit
    const keyEdit = e.target.name.split('.')[2];
    //

    // edit detail data & update element in array
    newData[provinceIdx] = { ...itemEdit, [keyEdit]: e.target.value };

    // update data array
    dispatch(setDataCities(newData));
    setValue('eventDetailProvinces', newData);
  };

  useDeepCompareEffect(() => {
    if (dataProvinceform) setValue('eventDetailProvinces', dataProvinceform);
  }, [dataProvinceform]);

  const changePopUpType = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPopUpType(event.target.value));
    setValue('popupType', event.target.value);
  };
  const changePopUpCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPopUpCode(event.target.value));
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

  const { mutate, isLoading } = useAddEvent({ onSuccess, onError });
  const params = useParams();
  const id = params?.id;
  const idEventPrize = parseInt(id as string);

  const { data: addTransaction } = useGetAllTranSacTion();
  const dataTransaction = addTransaction?.data?.response || [];
  const addNewOption1 = dataTransaction.map((item) => ({
    key: item.id,
    name: item.description,
  }));

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response?.provinces || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const provinceId = addProvinceVN
    ? addProvinceVN.map((item: ISelect) => item.value)
    : [];

  const searchParams: IGiftParams = {
    page: page,
    size: 10,
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
        FORMAT_DATE;
        if (!allowedExtensions.includes(fileExtension)) {
          showErrorSnackbar('Không phải file csv');
          return;
        }
        dispatch(setFileCSV(inputFile));
        showSuccessSnackbar('Import file thành công');
      }
      if (!event.target.files[0]) return showErrorSnackbar('file không hợp lệ!!!');

      parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ',',
        fastMode: true,
        encoding: 'utf-8',
        transformHeader: (header: string, index: number) => COLUMNS_HEADERS[index],
        complete: async (results: ParseResult<IEventDetail>) => {
          const data: IEventDetail[] = results.data.map((item: IEventDetail) => ({
            name: item.name,
            provinceId: item.provinceId,
            quantity: item.quantity,
            startDate: dayjs(item.startDate, FORMAT_DATE),
            endDate: dayjs(item.endDate, FORMAT_DATE),
          }));

          dispatch(setDataCities(data));
          setValue('eventDetailProvinces', data);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(
      setGift({
        id: 0,
        name: '',
        type: '',
        money: '',
      })
    );

    return () => {
      dispatch(setPopUpType(''));
      dispatch(setPopUpCode(''));
      dispatch(setFileCSV([]));
      dispatch(setDataCities([]));
    };
  }, []);

  const methods = useForm<IFormCreateEvent>({
    resolver: yupResolver(createEventPrizevalidate(provinceId)),
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
                  <RHFTextField
                    name={'ordinal'}
                    key={'ordinal'}
                    label="Thứ tự ưu tiên"
                    margin="dense"
                  />
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
                    name="popupType"
                    key="popupType"
                    label="Pop up Type"
                    placeholder="Pop up Type"
                    margin="dense"
                    value={popUpType}
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
                  {popUpType === POPUP_TYPE.HTML_LINK && (
                    <RHFTextField
                      name="popupLink"
                      key={'popupHtmlLink'}
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
                    key={'popupCode'}
                    label="Pop up Code"
                    placeholder="Pop up Code"
                    margin="dense"
                    onChange={(e) => changePopUpCode(e)}
                    value={popUpCode}
                  >
                    <option value=""></option>
                    <option value="PUZZLE PIECE">PUZZLE PIECE</option>
                    <option value="OGGI">OGGI</option>
                    <option value="FULL_SCREEN">FULL_SCREEN</option>
                  </RHFSelect>
                  <RadioGroup
                    row
                    name={'giftId'}
                    key="giftId"
                    value={valueChoice}
                    onChange={handleChangeChoice}
                  >
                    <FormControlLabel value="gift" control={<Radio />} label="Tặng Quà" />
                    {/* <FormControlLabel
                      name={'giftId'}
                      value="point"
                      control={<Radio />}
                      label="Tặng Điểm"
                    />
                    <FormControlLabel
                      name={'giftId'}
                      value="all"
                      control={<Radio />}
                      label="Tặng Quà và Điểm"
                    /> */}
                  </RadioGroup>
                  <Grid container spacing={3}>
                    <Grid item xs>
                      <Button
                        sx={{
                          display: valueChoice !== 'point' ? 'block' : 'none',
                          width: '40%',
                          alignSelf: 'flex-start',
                        }}
                        variant="contained"
                        color="info"
                        size="large"
                        onClick={handleOpen}
                      >
                        Chọn quà
                      </Button>
                      <Box
                        sx={{
                          color: 'black',
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
                        <Box sx={STYLE_GIFT}>
                          <Scrollbar>
                            <TableContainer
                              sx={{
                                minWidth: 800,
                                maxHeight: 500,
                                position: 'relative',
                                overflowY: 'scroll',
                                overflowX: 'auto',
                              }}
                              component={Paper}
                            >
                              <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD_GIFT} />
                                <TableBody>
                                  {dataGift.map((row) => (
                                    <GiftTableRow
                                      key={row.id}
                                      row={row}
                                      handleClose={handleClose}
                                    />
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Scrollbar>
                          {!!ListGift?.data?.pagination?.totalPages && (
                            <TablePagination
                              rowsPerPageOptions={[10]}
                              component="div"
                              count={totalRecords}
                              rowsPerPage={10}
                              page={page}
                              onPageChange={onChangePage}
                              onRowsPerPageChange={onChangeRowsPerPage}
                            />
                          )}
                        </Box>
                      </Modal>
                    </Grid>
                    {/* <Grid item xs>
                      <RHFTextField
                        type="number"
                        name={'point'}
                        label="Nhập điểm."
                        margin="dense"
                        sx={{ display: valueChoice !== 'gift' ? 'block' : 'none' }}
                      />
                    </Grid> */}
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
                  {/* <RHFEditor
                    className="category__text-editor"
                    simple
                    name="notificationContent"
                    key={'notificationContent'}
                  /> */}
                  <RHFTextField
                    name="notificationContent"
                    key={'notificationContent'}
                    label="Nội dung thông báo"
                    margin="dense"
                  />
                </div>
              </Grid>
            </Card>
            <LabelStyle>Tỉnh thành</LabelStyle>
            <Card sx={{ p: 1.5 }}>
              <Stack direction={'column'} spacing="15px">
                <Box>
                  <FullFeaturedCrudGrid />
                </Box>
              </Stack>
            </Card>

            {/* <Card sx={{ p: 3, width: '100%' }}>
              <Grid sx={{ maxHeight: 370 }}>
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
                        dispatch(
                          setDataCities([
                            ...dataCities,
                            {
                              provinceId: dataCities.length,
                              startDate: dayjs(),
                              endDate: dayjs(),
                              quantity: 0,
                            },
                          ])
                        );
                      }}
                      variant="outlined"
                      size="large"
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid sx={{ maxHeight: 450, overflow: 'auto' }}>
                  {dataCities &&
                    dataCities.map((item, index) => {
                      return (
                        <Grid key={index} container spacing={3} sx={{ mt: 0.5 }}>
                          <Grid item xs={2.75}>
                            <RHFSelect
                              name={`eventDetailProvinces.${index}.provinceId`}
                              key={`eventDetailProvinces.${index}.provinceId`}
                              label="Tỉnh thành"
                              placeholder="Tỉnh thành"
                              value={item.provinceId}
                              onChange={(e) => handleChangeCity(e, item)}
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
                              label="Tổng số lượng giải theo tỉnh"
                              value={item.quantity}
                            />
                          </Grid>
                          <Grid item xs>
                            <RHFTextField
                              name={`eventDetailProvinces.${index}.extraquantity`}
                              key={`eventDetailProvinces.${index}.extraquantity`}
                              label="Số giải nhập thêm"
                              onChange={(e) => handleChangeCity(e, item)}
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
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      defaultValue={dayjs(
                                        item.startDate || null,
                                        FORMAT_DATE
                                      )}
                                      onChange={(e) => handleChangeCity(e, item)}
                                    />
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
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      defaultValue={dayjs(
                                        item.endDate || null,
                                        FORMAT_DATE
                                      )}
                                      onChange={(e) => handleChangeCity(e, item)}
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <Button
                              color="inherit"
                              onClick={() => removeCount(item?.provinceId)}
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
            </Card> */}
          </Grid>

          <Grid direction="row" justifyContent="flex-end" container mt={2}>
            <Box sx={{ paddingRight: 2 }}>
              <LoadingButton
                color="inherit"
                variant="outlined"
                size="large"
                type="submit"
                loading={isLoading}
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
                loading={isLoading}
                onClick={() => dispatch(setButtonType(ButtonType.SAVE_CREATE_SUBMIT))}
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
