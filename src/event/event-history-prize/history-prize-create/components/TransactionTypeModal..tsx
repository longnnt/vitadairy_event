import {
    Box,
    Button,
    Card,
    Modal,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
  } from '@mui/material';
  import { useEffect } from 'react';
  import Scrollbar from 'src/common/components/Scrollbar';
  import { TableHeadCustom, TableSelectedActions } from 'src/common/components/table';
  import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
  import useTable from 'src/common/hooks/useTable';
  import { useDispatch, useSelector } from 'src/common/redux/store';
  import { TABLE_HEAD_TRANSACTION_TYPE } from '../../constants';
  import {
    setOpenModalSelector,
    setTransactionTypeSelector,
    setIsOpenModal,
    setTransactionType,
  } from '../../event.slice';
  import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
  import { ITransactionTypeCode } from '../../interfaces';
  import { TransactionTypeTableRows } from './TransactionTypeTableRows';
  
  export const ProductCodeModal = () => {
    const { dense, onChangeDense, page, rowsPerPage, onChangePage, onChangeRowsPerPage } =
      useTable({
        defaultRowsPerPage: 5,
      });
    const { skusListData: skusCodeDataEvent, pagination } = useProductCode({
      page: page + 1,
      size: rowsPerPage,
    });
  
    const {
      selectedIds,
      handleSelectItem,
      handleCheckAll,
      setSelectedIds,
      reset: resetSelect,
      isCheckedAll,
    } = useSelectMultiple<string>(
      skusCodeDataEvent.map((row: IProductCode) => row.code),
      page + 1
    );
  
    const open = useSelector(openModalState);
    const dispatch = useDispatch();
  
    const handleClose = () => dispatch(setIsOpenModal(false));
  
    const totalRecords = pagination.totalRecords;
  
    const totalPages = pagination.totalPages;
  
    const product = useSelector(productState);
  
    useEffect(() => {
      dispatch(setProduct(selectedIds));
    }, [selectedIds]);
  
    useEffect(() => {
      setSelectedIds(product);
    }, [product]);
  
    return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ width: '500px', margin: '0 auto' }}>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
            }}
            sx={{ ml: '10px', my: '10px' }}
          >
            X
          </Button>
          <Scrollbar>
            <TableContainer>
              {!!selectedIds.length && (
                <TableSelectedActions
                  rowCount={skusCodeDataEvent.length}
                  numSelected={selectedIds.length}
                  onSelectAllRows={handleCheckAll}
                  isSelectAll={isCheckedAll}
                />
              )}
              <Table>
                <TableHeadCustom
                  headLabel={TABLE_HEAD_PRODUCT_CODE}
                  isSelectAll={isCheckedAll}
                  rowCount={skusCodeDataEvent.length}
                  onSelectAllRows={handleCheckAll}
                  numSelected={selectedIds.length}
                />
                <TableBody>
                  {skusCodeDataEvent.map((item: any) => (
                    <ProductCodeTableRow
                      key={item.id}
                      selected={selectedIds.includes(item.code)}
                      onSelectRow={(e) => handleSelectItem(item.code, e)}
                      product={item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
  
          <Box sx={{ position: 'relative' }}>
            {!!totalPages && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={totalRecords || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            )}
          </Box>
        </Card>
      </Modal>
    );
  };
  