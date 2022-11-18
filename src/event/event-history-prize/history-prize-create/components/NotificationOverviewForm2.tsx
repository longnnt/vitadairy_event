import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  Typography,
  TablePagination,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  DEFAULT_FORM_VALUE,
  DEFAULT_FORM_VALUE_SUBMIT,
  popupTypeOption,
  POPUP_CODE,
  POPUP_TYPE,
  STYLE_GIFT,
  TABLE_HEAD_GIFT,
} from '../../constants';
import { createEventPrizevalidate } from '../../event.schema';
import {
  giftSelecttor,
  popUpCodeSelector,
  popUpTypeSelector,
  setFileCSV,
  setGift,
  setOpen,
  setOpenSelector,
  setPopUpCode,
  setPopUpType,
  setValueChoice,
  setValueChoiceSelector,
} from '../../event.slice';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { useGetGilf } from '../../hooks/useGetGilf';
import { IFormCreate, IFormCreateEvent, IGiftParams, ISelect, ISelectPopup } from '../../interfaces';
import { GiftTableRow } from './GiftTableRow';

function NotificationOverviewForm2() {
  const dispatch = useDispatch();
  const popUpType = useSelector(popUpTypeSelector);
  const popUpCode = useSelector(popUpCodeSelector);
  const open = useSelector(setOpenSelector);
  const gift = useSelector(giftSelecttor);
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));
  const valueChoice = useSelector(setValueChoiceSelector);

  const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValueChoice((event.target as HTMLInputElement).value));
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

  const searchParams: IGiftParams = {
    page: page + 1,
    size: 10,
  };
  const { data: ListGift } = useGetGilf(searchParams);
  const dataGift = ListGift?.data?.response || [];
  const { totalRecords } = ListGift?.data?.pagination || {
    totalRecords: 0,
  };

  const { data: addProvince } = useGetAllProvince();
  const dataProvince = addProvince?.data?.response?.provinces || [];
  const addProvinceVN = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const provinceId = addProvinceVN
    ? addProvinceVN.map((item: ISelect) => item.value)
    : [];

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
    };
  }, []);

  const methods = useForm<IFormCreate>({
    resolver: yupResolver(createEventPrizevalidate(provinceId)),
    defaultValues: DEFAULT_FORM_VALUE,
  });

  const {
    reset,
    setValue,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Grid item xs={6} marginTop={3.5}>
      <Card sx={{ p: 2, width: '100%' }}>
        <RHFTextField
          name="popupImageLink"
          key={'popupImageLink'}
          label="Link hình ảnh Pop up*"
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
          <RHFTextField name="popupLink" key={'popupHtmlLink'} label="Popup html link*" />
        )}
        {popUpType === POPUP_TYPE.DEEP_LINK && (
          <RHFTextField name="popupLink" key={'popupDeepLink'} label="Popup deep link*" />
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
          <option value={POPUP_CODE.PUZZLE_PIECE}>PUZZLE PIECE</option>
          <option value={POPUP_CODE.OGGI}>OGGI</option>
          <option value={POPUP_CODE.FULL_SCREEN}>FULL SCREEN</option>
        </RHFSelect>
        {(popUpCode === POPUP_CODE.PUZZLE_PIECE || popUpCode === POPUP_CODE.OGGI) && (
          <>
            <RHFTextField
              name="popUpCodeTitle"
              key={'popUpCodeTitle'}
              label="Tiêu đề Pop up*"
              margin="dense"
            />
            <RHFTextField
              name="popUpCodeContent"
              key={'popUpCodeContent'}
              label="Nội dung Pop Up*"
              multiline
              rows={7}
              margin="dense"
            />
            <RHFTextField
              name="popUpCodeCTA"
              key={'popUpCodeCTA'}
              label="CTA*"
              margin="dense"
            />
          </>
        )}
        <Grid container spacing={3}>
          <Grid item xs>
            <Button
              sx={{
                width: '40%',
                alignSelf: 'flex-start',
                marginTop: 1,
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
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: 'center', fontWeight: 'bold', py: '20px' }}
                >
                  Please choose a gift!
                </Typography>

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
        </Grid>
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm2;
