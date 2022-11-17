import {
  Box,
  Button,
  Card,
  Divider,
  IconButton, Table, TableBody,
  TableContainer,
  TablePagination,
  Tooltip
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import LoadingScreen from 'src/common/components/LoadingScreen';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetStoreAdminById } from 'src/shop-invitation/hooks/useGetStoreCode';
import { codeSelector } from 'src/store-admin/storeAdmin.slice';
import { TABLE_HEAD } from '../common/constants';
import { IParamsQuery, IResShopInvitation } from '../common/interfaces';
import { useGetAllShopInvitationByParams } from '../hooks/useGetAllShopInvitationByParams';
import { useGetAllShopInvitationExportCsv } from '../hooks/useGetAllShopInvitationExportCsv';
import {
  firstScanEndSelector,
  firstScanStartSelector,
  searchTextSelector,
  statusSelector
} from '../invitationSlice';
import InvitationTableRow from './InvitationTableRow';
import { InvitationTableToolbar } from './InvitationTableToolbar';
export default function ShopInvitation() {
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

  const searchText = useSelector(searchTextSelector);
  const statusSuccess = useSelector(statusSelector);
  const firstScanStart = useSelector(firstScanStartSelector);
  const firstScanEnd = useSelector(firstScanEndSelector);

  const searchParams: IParamsQuery = {
    page: page + 1,
    size: rowsPerPage,
    firstScanEndDate: firstScanEnd,
    firstScanStartDate: firstScanStart,
    searchText: searchText,
    status: statusSuccess,
  };

  const { data, refetch, isLoading } = useGetAllShopInvitationByParams(searchParams);
  const tableData: IResShopInvitation[] = data ? data : [];
  const { data: csvData } = useGetAllShopInvitationExportCsv();

  const { isCheckedAll, selectedIds, handleSelectItem, handleCheckAll } =
    useSelectMultiple(
      tableData?.map((item) => item.spoonCode),
      page + 1
    );

  const handleSearch = () => {
    refetch();
    setPage(0);
  }

  const params = useParams();
  const idParams = params?.id;
  const code = useSelector(codeSelector);

  const { data: dataStoreCode } = useGetStoreAdminById(code)

  console.log(dataStoreCode);
  console.log(code)

  return (
    <>
      {isLoading && <LoadingScreen />}
      <HeaderBreadcrumbs
        heading="Danh Sách Khách Hàng"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          {
            name: BREADCUMBS.SHOP_INVITATION,
            href: PATH_DASHBOARD.storeAdmin.shop_invitation,
          },
          { name: BREADCUMBS.SHOP_INVITATION_lIST },
        ]}
        action={
          <CSVLink data={csvData ? csvData.data : ''}>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              onClick={() => navigate(PATH_DASHBOARD.storeAdmin.shop_invitation)}
            >
              Export
            </Button>
          </CSVLink>
        }
      />
      <Card>
        <Divider />
        <InvitationTableToolbar handleSearch={handleSearch} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={tableData.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary">
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
                rowCount={
                  tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {tableData?.map((row: IResShopInvitation) => (
                  <InvitationTableRow
                    key={row.qrCode}
                    row={row}
                    selected={selectedIds.includes(row.spoonCode)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.spoonCode, e);
                    }}
                    // onDeleteRow={() => handleDeleteRows([row.storeCode])}
                    // onEditRow={() => handleEditRow(row.storeCode.toString())}
                  />
                ))}

                <TableNoData isNotFound={!tableData?.length} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={tableData ? tableData.length : 1}
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
