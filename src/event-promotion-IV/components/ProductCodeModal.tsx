import {
  Stack,
  Box,
  Button,
  Card,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Dialog,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom, TableSelectedActions } from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { TABLE_HEAD_PRODUCT_CODE } from '../constant';
import {
  filterProductCodeState,
  openModalState,
  productState,
  setIsOpenModal,
  setProduct,
  setSearchProductCode,
} from '../eventPromotionIV.slice';
import { useProductCode } from '../hooks/useProductCode';
import { EventSearchParams, IProductCode } from '../interface';
import ProductCodeFilterBar from './FilterProductCodeBar';
import { ProductCodeTableRow } from './ProductCodeTableRow';

export const ProductCodeModal = () => {
  const { dense, onChangeDense, page, rowsPerPage, onChangePage, onChangeRowsPerPage, setPage } =
    useTable({
      defaultRowsPerPage: 5,
    });
  

  const searchParams:EventSearchParams ={
    page: page + 1,
    size: rowsPerPage,
  } 
  const filterProductCode = useSelector(filterProductCodeState);
  if (filterProductCode) searchParams.searchText = filterProductCode;
  
  const { skusListData: skusCodeDataEvent, pagination } = useProductCode(searchParams);

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

  const handleFilterProductCode = (filterProductCode: string) => {
    dispatch(setSearchProductCode(filterProductCode));
    setPage(0);
  };

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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ minWidth: 500 }}>
        <Stack sx={{padding: 2}} spacing={2} direction={'row'} justifyContent='space-between'>
          <Typography variant='h4'>Danh sách mã sản phẩm</Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Stack>
        <ProductCodeFilterBar filterName={filterProductCode} onFilterName={handleFilterProductCode}/>
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
    </Dialog>
  );
};
