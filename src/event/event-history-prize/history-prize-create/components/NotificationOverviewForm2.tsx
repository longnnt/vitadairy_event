import {
  Box,
  Button,
  Card, Dialog, DialogContent, Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import ListPrizeFilterBar from 'src/event/list-prize/list-prize-dashboard/components/ListPrizeFilterBar';
import {
  popupTypeOption,
  POPUP_CODE,
  POPUP_TYPE,
  SIZE_PAGE,
  STYLE_GIFT,
  TABLE_HEAD_GIFT
} from '../../constants';
import {
  filterGiftSelector,
  giftSelecttor,
  popUpCodeSelector,
  popUpTypeSelector,
  setFileCSV,
  setFilterGift,
  setGift,
  setOpen,
  setOpenSelector,
  setPopUpCode,
  setPopUpType,
  setValueChoice,
  setValueChoiceSelector
} from '../../event.slice';
import { useGetAllProvince } from '../../hooks/useGetAllProvince';
import { useGetGilf } from '../../hooks/useGetGilf';
import { IFormCreate, IGiftParams, ISelectPopup } from '../../interfaces';
import { GiftTableRow } from './GiftTableRow';

function NotificationOverviewForm2() {
  const dispatch = useDispatch();
  const popUpType = useSelector(popUpTypeSelector);
  const popUpCode = useSelector(popUpCodeSelector);
  const open = useSelector(setOpenSelector);
  const gift = useSelector(giftSelecttor);
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));
  const filterGift = useSelector(filterGiftSelector);

  const {
    dense,
    page,
    order,
    setPage,
    orderBy,
    rowsPerPage,
    selected: selectedRows,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const changePopUpType = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue('popupType', event.target.value, {shouldValidate: true} );
    dispatch(setPopUpType(event.target.value));
  };
  const changePopUpCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue('popupCode', event.target.value,  {shouldValidate: true} );
    dispatch(setPopUpCode(event.target.value));
  };
  const searchParams: IGiftParams = {
    page: page + 1,
    size: SIZE_PAGE,
    keySearch: '',
  };
  if(filterGift.length > 2) searchParams.keySearch = filterGift;
  const { data: ListGift } = useGetGilf(searchParams);
  const dataGift = ListGift?.data?.response || [];
  const { totalRecords } = ListGift?.data?.pagination || {
    totalRecords: 0,
  };
  const handleFilterGift = (filterGift: string) => {
    dispatch(setFilterGift(filterGift));
  }

  useEffect(() => {
    dispatch(
      setGift({
        image: '',
        id: 0,
        name: '',
        type: '',
        money: '',
        point: 0,
        total: 0,
        active: false || true,
      })
    );

    return () => {
      dispatch(setPopUpType(''));
      dispatch(setPopUpCode(''));
      dispatch(setFileCSV([]));
    };
  }, []);

  const methods = useFormContext<IFormCreate>();

  const {
    reset,
    register,
    setValue,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  return (
    <Grid item xs={6} marginTop={3.5}>
      <Card sx={{ p: 3, width: '100%' }}>
        <Stack spacing={2}>
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
          value={popUpCode}
          margin="dense"
          onChange={(e) => {
            changePopUpCode(e);
          }}
        >
          <option value=""></option>
          <option value={POPUP_CODE.PUZZLE_PIECE}>PUZZLE PIECE</option>
          <option value={POPUP_CODE.OGGI}>OGGI</option>
          <option value={POPUP_CODE.FULL_SCREEN}>FULL SCREEN</option>
        </RHFSelect>
        {(popUpCode === POPUP_CODE.PUZZLE_PIECE || popUpCode === POPUP_CODE.OGGI) && (
          <>
            <RHFTextField
              name="popupTitle"
              key={'popupTitle'}
              label="Tiêu đề Pop up*"
              margin="dense"
            />
            <RHFTextField
              name="popupContent"
              key={'popupContent'}
              label="Nội dung Pop Up*"
              multiline
              rows={7}
              margin="dense"
            />
            <RHFTextField
              name="popupText"
              key={'popupText'}
              label="CTA*"
              margin="dense"
            />
          </>
        )}
        <Grid container spacing={0.5}>
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
            <Dialog
              open={open}
              onClose={() => {
                handleClose();
                dispatch(setFilterGift(''))
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              fullWidth
              maxWidth={'xl'}
            >
              <DialogContent sx={{ minHeight: 770 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: 'center', fontWeight: 'bold', py: '20px' }}
                >
                  Please choose a gift!
                </Typography>

                <ListPrizeFilterBar
                  filterName={filterGift}
                  onFilterName={handleFilterGift}
                  placeholder={'Lọc theo tên quà'}
                />

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
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
        </Stack>
        
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm2;
