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
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom, TableSelectedActions } from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { TABLE_HEAD_PRODUCT_CODE } from '../constant';
import {
  openModalState,
  setIsOpenModal,
  setProductCode,
} from '../eventPromotionIV.slice';
import { useProductCode } from '../hooks/useProductCode';
import { IProductCode } from '../interface';
import { ProductCodeTableRow } from './ProductCodeTableRow';

export const ProductCodeModal = () => {
  const { dense, onChangeDense, page, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultRowsPerPage: 10,
    });
  const { skusListData: skusCodeDataEvent, pagination } = useProductCode({
    page,
    size: rowsPerPage,
  });

  const {
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    reset: resetSelect,
    isCheckedAll,
  } = useSelectMultiple<number>(
    skusCodeDataEvent.map((row: IProductCode) => row.id),
    page + 1
  );

  const open = useSelector(openModalState);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setIsOpenModal(false));

  const totalRecords = pagination.totalRecords;

  const totalPages = pagination.totalPages;

  const productCodeWithId = skusCodeDataEvent.filter(function (product: IProductCode) {
    return selectedIds.some(function (id) {
      return product.id === id;
    });
  });

  const productCode = productCodeWithId.map((item: IProductCode) => item.code);

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
            if (productCode.length) dispatch(setProductCode(productCode));
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
                    selected={selectedIds.includes(item.id)}
                    onSelectRow={(e) => handleSelectItem(item.id, e)}
                    productCode={item.code}
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
