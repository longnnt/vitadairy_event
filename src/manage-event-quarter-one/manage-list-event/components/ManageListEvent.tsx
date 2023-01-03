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
import { dispatch, useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD, ROOTS_DASHBOARD } from 'src/common/routes/paths';
import { TABLE_HEAD } from '../../common/constants';
import { ListEventTableRow } from './ListEventTableRow';
import { ListEventTableToolbar } from './ListEventTableToolbar';
import { ListEventTableSkeleton } from './ListEventTableSkeleton';
import { confirmEditSelector, selectedIdsState, setConfirmEdit, setEndDateSelector, setOpeneditModal, setSearchBySelector, setSearchTextSelector, setSelectedIds, setStartDateSelector, setStatusSelector } from '../../manageEvent.slice';
import { IFormListEvent, IManageEventParams } from '../../common/interface';
import { useGetListEventAdmin } from 'src/manage-event-quarter-one/hooks/useGetListEventAdmin';
import { useDeleteEventId } from 'src/manage-event-quarter-one/hooks/useDeleteEventId';
import useMessage from 'src/store-admin/hooks/useMessage';
import useDeepEffect from 'src/common/hooks/useDeepEffect';

function ListEventDashboard() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected: selectedRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const dispatch = useDispatch();
  const searchText = useSelector(setSearchTextSelector);
  const status = useSelector(setStatusSelector);
  const startDate = useSelector(setStartDateSelector);
  const endDate = useSelector(setEndDateSelector);
  const searchBy = useSelector(setSearchBySelector);
  console.log('testSear',searchText)
  console.log('testSta',status)

  const searchParams: IManageEventParams = {
    page: page + 1,
    limit: rowsPerPage,
    searchText: searchText,
    searchBy: searchBy,
    startDate: startDate,
    endDate: endDate,
    status: status,
  };

  const { data, isLoading, refetch } = useGetListEventAdmin(searchParams);

  const listEventAdmin = data?.response  || []

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listEventAdmin.map((item) => item.id),
    page + 1
  );

  const mutationDetele = useDeleteEventId({
    onSuccess: () => {showSuccessSnackbar('Xóa sự kiện thành công')},
    onError: () => showErrorSnackbar('Xóa sự kiện thất bại'),
  })

  const handleDeleteRows = (ids: number[]) => {
    for (let i = 0; i < ids.length; i++) {
      mutationDetele.mutate(ids[i]);
      resetSelect();
    }
  };

  const handleEditRow = (id: number) => {
    // navigate(PATH_DASHBOARD.admin.edit(id));
  };
  

  const { totalRecords } = data?.pagination || {
    totalRecords: 0,
  };

  const isNotFound = !listEventAdmin.length && !isLoading;

  const handleSearch = () => {
    refetch();
    setPage(0);
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading={BREADCUMBS.MANAGE_LIST_EVENT}
        links={[
          { name: BREADCUMBS.MANAGE_EVENT, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.MANAGE_LIST_EVENT },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => {navigate(PATH_DASHBOARD.manageEventQuarterOne.new)}}
          >
            Tạo mới
          </Button>
        }
      />
      <Card>
        <Divider />
        <ListEventTableToolbar handleSearch={handleSearch} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={listEventAdmin.length}
                numSelected={selectedIds.length}
                onSort={onSort}
              />

              <TableBody>
                {listEventAdmin?.map((row: IFormListEvent) => (
                  <ListEventTableRow
                    key={row.id}
                    row={{ ...row }}
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

                <TableNoData isNotFound={!listEventAdmin?.length} />
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
        </Box>
      </Card>
    </>
  );
}

export { ListEventDashboard }