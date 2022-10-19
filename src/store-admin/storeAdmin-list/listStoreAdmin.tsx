import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { dispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { TABLE_HEAD } from '../constants';
import { useDeleteStoreAdmin } from '../hooks/useDeleteStoreAdmin';
import { useGetStoreAdmin } from '../hooks/useGetStoreAdmin';
import { IFormStore, IStoreParams } from '../interfaces';
import { filterNameSelector, setFilterName } from '../storeAdmin.slice';
import { StoreTableRow } from './components/storeTableRow';

function StoreAdminListDashboard() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,

    selected: selectedRows,
    onSelectRow,
    onSelectAllRows,

    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () => {
    enqueueSnackbar('Delete store successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Delete store error', {
      variant: 'error',
    });
  };
  const filterName = useSelector(filterNameSelector);

  const mutationDetele = useDeleteStoreAdmin({ onSuccess, onError });

  const searchParams: IStoreParams = {
    page: page,
    size: rowsPerPage,
  };

  if (filterName) searchParams.searchText = filterName;

  const { data } = useGetStoreAdmin(searchParams);

  const listStoreAdmin = data?.data?.response?.response || [];  

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listStoreAdmin.map((item) => item.code),
    page + 1
  );

  const handleDeleteRows = (ids: string[]) => {
    for (let i = 0; i < ids.length; i++){
      mutationDetele.mutate(ids[i]);
      resetSelect();
    }
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.policy.editCategory(id));
  };

  const { totalRecords } = data?.data?.response?.pagination || {
    totalRecords: 0,
  };

  const isNotFound = !listStoreAdmin.length;
  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH CỬA HÀNG"
        links={[
          { name: BREADCUMBS.STORE_ADMIN, href: PATH_DASHBOARD.storeAdmin.root },
          { name: 'Danh sách' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'akar-icons:file'} />}
            to={PATH_DASHBOARD.storeAdmin.root}
            component={RouterLink}
          >
            Export
          </Button>
        }
        action2={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'akar-icons:file'} />}
            to={PATH_DASHBOARD.storeAdmin.root}
            component={RouterLink}
          >
            Export
          </Button>
        }
      />
      <Card>
        <Divider />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listStoreAdmin.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteRows(selectedIds)}
                    >
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={listStoreAdmin.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listStoreAdmin.map((row: IFormStore) => (
                  <StoreTableRow
                    key={row.code}
                    row={{ ...row, createdDate: new Date(row.createdDate).toLocaleString()}}
                    selected={selectedIds.includes(row.code)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.code, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.code])}
                    onEditRow={() => handleEditRow(row.code)}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </>
  );
}

export { StoreAdminListDashboard };

