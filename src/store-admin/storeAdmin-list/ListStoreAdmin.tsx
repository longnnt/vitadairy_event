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
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useGetAdmin } from 'src/admin/hooks/useGetAdmin';
import { emailSelector, setPermission } from 'src/auth/login/login.slice';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { dispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { SIZE, TABLE_HEAD,FORMAT_DATE_EXPORT_FILE } from '../constants';
import { useDeleteStoreAdmin } from '../hooks/useDeleteStoreAdmin';
import { useGetStoreAdmin } from '../hooks/useGetStoreAdmin';
import { useImportFile } from '../hooks/useImportFile';
import useMessage from '../hooks/useMessage';
import { IFormStore, IStoreParams } from '../interfaces';
import { exportStoreAdmin } from '../services';
import {
  endDateSelector,
  startDateSelector,
  searchTextSelector,
  setShowDataStore,
} from '../storeAdmin.slice';
import { StoreTableRow } from './components/StoreTableRow';
import { StoreTableToolbar } from './components/StoreTableToolbar';
import TableSkeleton from './components/TableSkeleton';

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

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const searchText = useSelector(searchTextSelector);
  const startDate = useSelector(startDateSelector);
  const endDate = useSelector(endDateSelector);

  const mutationDetele = useDeleteStoreAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Delete store successfully');
    },
    onError: () => {
      showErrorSnackbar('Delete store fail');
    },
  });

  const { mutate } = useImportFile({
    onSuccess: () => {
      showSuccessSnackbar('Import file successfully');
    },
    onError: () => {
      showErrorSnackbar('Import file fail');
    },
  });

  const searchParams: IStoreParams = {
    page: page,
    size: rowsPerPage,
    endDate: endDate,
    startDate: startDate,
    searchText: searchText,
  };

  if (searchText) searchParams.searchText = searchText;
  if (!searchText) delete searchParams.searchText;
  if (!endDate) delete searchParams.endDate;
  if (!startDate) delete searchParams.startDate;

  const { data, refetch, isLoading } = useGetStoreAdmin(searchParams);

  // =========GET PERMISSION==================
  const { data: admin } = useGetAdmin({size:SIZE});
  const mail = useSelector(emailSelector);
  const getPermission = admin?.response.find((item) => item.email === mail);
  dispatch(setPermission(getPermission?.permission));

  const listStoreAdmin = data?.response || [];

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
    for (let i = 0; i < ids.length; i++) {
      mutationDetele.mutate(ids[i]);
      resetSelect();
    }
  };

  const importFile = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      mutate(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const exportFile = () => {
    const response = exportStoreAdmin();
    response
      .then((data) => {
        const fileLink = document.createElement('a');

        const blob = new Blob([data?.data], {
          type: 'text/csv; charset=utf-8',
        });

        const fileName = `export_store_admin_${dayjs().format(
          FORMAT_DATE_EXPORT_FILE
        )}.csv`;

        fileLink.href = window.URL.createObjectURL(blob);
        fileLink.download = fileName;
        fileLink.click();
      })
      .catch((error) => console.log(error));
  };

  const handleEditRow = (id: string) => {};

  const { totalRecords } = data?.pagination || {
    totalRecords: 0,
  };

  const isNotFound = !listStoreAdmin.length;

  const handleSearch = () => {
    dispatch(setShowDataStore(true));
    refetch();
    setPage(0);
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách cửa hàng"
        links={[
          { name: BREADCUMBS.STORE_ADMIN, href: PATH_DASHBOARD.storeAdmin.root },
          { name: 'Danh sách cửa hàng' },
        ]}
        action={
          <>
            <Box marginRight="8px" display="inline">
              <Button
                variant="contained"
                startIcon={<Iconify icon={'mdi:file-import'} />}
                component="label"
              >
                Import
                <input hidden multiple type="file" onChange={importFile} />
              </Button>
            </Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              onClick={() => {
                exportFile();
              }}
            >
              Export
            </Button>
          </>
        }
      />
      <Card>
        <Divider />

        <StoreTableToolbar handleSearch={handleSearch} isLoading={isLoading} />

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
                // isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={listStoreAdmin.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                // onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listStoreAdmin.map((row: IFormStore) => (
                  <StoreTableRow
                    key={row.code}
                    row={{
                      ...row,
                    }}
                    selected={selectedIds.includes(row.code)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.code, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.code])}
                    onEditRow={() => handleEditRow(row.code)}
                  />
                ))}
                {Array.from(Array(rowsPerPage)).map((index) => {
                  return <TableSkeleton key={index} isNotFound={isLoading} />;
                })}

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
