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
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { confirmEditSelector, filterNameSelector, openEditModalSelector, selectedIdsState, setConfirmEdit, setConfirmPopup, setFilterName, setOpeneditModal, setSelectedIds } from '../admin.slice';
import { TABLE_HEAD } from '../constants';
import { useDeleteAdmin } from '../hooks/useDeleteAdmin';
import { useGetAdmin } from '../hooks/useGetAdmin';
import { IAdminParams, IFormAdmin } from '../interfaces';
import { AdminTableRow } from './components/AdminTableRow';
import useMessage from 'src/store-admin/hooks/useMessage';
import TableSkeleton from './components/TableSkeleton';
import { AlertDialogSlide } from './components/ModalConfirmDelete';
import Can from 'src/common/lib/Can';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';


function AdminListDashboard() {
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
  

  const { useDeepCompareEffect } = useDeepEffect();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const filterName = useSelector(filterNameSelector);

  const openEditModal = useSelector(openEditModalSelector);
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const selectedIdsValue = useSelector(selectedIdsState);




  const mutationDetele = useDeleteAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Delete admin successfully');
    },
    onError: () => {
      showErrorSnackbar('Delete admin fail');
    },
  });

  const searchParams: IAdminParams = {
    page: page,
    size: rowsPerPage,
  };

  if (filterName) searchParams.searchText = filterName;

  const { data,isLoading } = useGetAdmin(searchParams);
  const listAdmin = data?.response || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listAdmin.map((item) => item.id),
    page + 1
  );

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleDeleteRows = (ids: number[]) => {
    // dispatch(setConfirmPopup(true));
    handleOpenEditModal();
    dispatch(setSelectedIds(ids));
    resetSelect();
  };
  const confirmEdit = useSelector(confirmEditSelector);
  const {mutate} =useDeleteAdmin({
    onSuccess: () => {},
    onError: () => showErrorSnackbar('Xóa tài khoản thất bại'),
  })
  useDeepCompareEffect(() => {
    
    if (confirmEdit) {
      for (let i = 0; i < selectedIdsValue.length; i++) {
        mutate(selectedIdsValue[i]);
      }
      dispatch(setConfirmEdit(false));
    }
  }, [confirmEdit, selectedIdsValue]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.admin.edit(id));
  };
  const { totalRecords } = data?.pagination || {
    totalRecords: 0,
  };
  const isNotFound = !listAdmin.length && !isLoading;
  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách admin"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: 'List admins' },
        ]}
        action={
          <Can do="update" on="all">
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.admin.create}
            component={RouterLink}
          >
            Thêm mới
          </Button>
          </Can>
        }
      />
      <Card>
        <Divider />
        {/* <AlertDialogSlide  /> */}
        <ConfirmEditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            handleOnAgree={handleOnAgree}
            type='Xóa tài khoản'
            colorType={false}
            // setConfirmEdit={setConfirmEdit}
          />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listAdmin.length}
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
                rowCount={listAdmin.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listAdmin.map((row: IFormAdmin) => (
                  <AdminTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => {
                      handleEditRow(row.id);
                    }}
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

export { AdminListDashboard };
