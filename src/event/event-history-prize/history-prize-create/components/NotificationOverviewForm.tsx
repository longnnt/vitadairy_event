import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom } from 'src/common/components/table';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { STYLE_GIFT, TABLE_HEAD_TRANSACTION_TYPE } from '../../constants';
import {
  setOpenModal,
  setOpenModalSelector,
  setTransactionType,
  setTransactionTypeSelector,
} from '../../event.slice';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { IGiftParams, ITransactionParams } from '../../interfaces';
import { TransactionTypeTableRow } from './TransactionTypeTableRows';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function NotificationOverviewForm() {
  const dispatch = useDispatch();
  const openModal = useSelector(setOpenModalSelector);
  const handleOpenModal = () => dispatch(setOpenModal(true));
  const handleCloseModal = () => dispatch(setOpenModal(false));
  const transactionType = useSelector(setTransactionTypeSelector);
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
  const searchParams: ITransactionParams = {
    page: page + 1,
    size: 10,
  };
  const { data: addTransaction } = useGetAllTranSacTion(searchParams);
  const dataTransaction = addTransaction?.data?.response || [];

  const { totalRecords } = addTransaction?.data?.pagination || {
    totalRecords: 0,
  };

  // useEffect(() => {
  //   dispatch(
  //     setTransactionType({
  //       id: 0,
  //       code: '',
  //       name: '',
  //       description: '',
  //       mainCode: '',
  //     })
  //   );
  // }, []);

  return (
    <Grid item xs={6}>
      <LabelStyle>Thông báo tổng quan</LabelStyle>
      <Card sx={{ p: 2, width: '100%' }}>
        <RHFTextField
          name={'ordinal'}
          key={'ordinal'}
          label="Thứ tự ưu tiên*"
          margin="dense"
        />
        <RHFTextField
          name="probability"
          key={'probability'}
          label="Tỉ lệ trúng quà của sự kiện(%)*"
          margin="dense"
        />
        <RHFTextField
          name="quantity"
          key={'quantity'}
          label="Tổng số lượng quà*"
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
        <Button
          variant="contained"
          color="info"
          size="large"
          onClick={handleOpenModal}
          sx={{ marginTop: 1 }}
        >
          Chọn Transaction Type
        </Button>
        <Box
          sx={{
            color: 'black',
            marginTop: 1.5,
          }}
        >
          {transactionType.description}
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
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
            Please choose a transaction type!
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
                  <TableHeadCustom headLabel={TABLE_HEAD_TRANSACTION_TYPE} />
                  <TableBody>
                    {dataTransaction.map((row) => (
                      <TransactionTypeTableRow
                        key={row.id}
                        row={row}
                        handleClose={handleCloseModal}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            {!!addTransaction?.data?.pagination?.totalPages && (
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
        <Typography marginTop={2}>Trạng thái quà</Typography>
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm;
