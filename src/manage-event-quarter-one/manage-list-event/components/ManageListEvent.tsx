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
import { PATH_DASHBOARD, ROOTS_DASHBOARD } from 'src/common/routes/paths';
import { TABLE_HEAD } from '../../common/constants';
import { ListEventTableRow } from './ListEventTableRow';
import { ListEventTableToolbar } from './ListEventTableToolbar';
import { ListEventTableSkeleton } from './ListEventTableSkeleton';
import { setEndDateSelector, setSearchBySelector, setSearchTextSelector, setStartDateSelector, setStatusSelector } from '../../manageEvent.slice';
import { IManageEventParams } from '../../common/interface';

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

  const searchText = useSelector(setSearchTextSelector);
  const statusSuccess = useSelector(setStatusSelector);
  const startDate = useSelector(setStartDateSelector);
  const endDate = useSelector(setEndDateSelector);
  const searchBy = useSelector(setSearchBySelector);

  const searchParams: IManageEventParams = {
    page: page,
    size: rowsPerPage,
    startDate: startDate,
    endDate: endDate,
    searchText: searchText,
    status: statusSuccess,
    searchBy: searchBy,
  };

  const { totalRecords } = {
    totalRecords: 0,
  };

  const handleSearch = () => {
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
            onClick={() => {}}
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
                // rowCount={
                //   tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                //     .length
                // }
                // numSelected={selectedIds.length}
                onSort={onSort}
              />

              <TableBody>
                {/* {tableData?.map((row: IResShopInvitation) => (
                  <InvitationTableRow
                    key={row.storeCode}
                    row={{ ...row }}
                    selected={selectedIds.includes(row.storeCode)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.storeCode, e);
                    }}
                  />
                ))}

                <TableNoData isNotFound={!tableData?.length} /> */}
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