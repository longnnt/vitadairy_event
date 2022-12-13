import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip
} from '@mui/material';
import dayjs from 'dayjs';
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
import { FORMAT_DATE_EXPORT_FILE } from 'src/store-admin/constants';
import { TABLE_HEAD } from '../common/constants';
import { IParamsQuery, IResShopInvitation } from '../common/interfaces';
import { useGetAllShopInvitationByParams } from '../hooks/useGetAllShopInvitationByParams';
import {
  firstScanEndSelector,
  firstScanStartSelector,
  searchBySelector,
  searchTextSelector,
  statusSelector
} from '../invitationSlice';
import { getAllShopInvitationExport } from '../services';
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
  const searchBy = useSelector(searchBySelector);
  const params = useParams();
  const id = params?.id;

  const searchParams: IParamsQuery = {
    page: page,
    size: rowsPerPage,
    firstScanEndDate: firstScanEnd,
    firstScanStartDate: firstScanStart,
    searchText: searchText,
    status: statusSuccess,
    storeId: id,
    searchBy: searchBy,
  };

  const { data, refetch, isLoading } = useGetAllShopInvitationByParams(searchParams);
  const tableData = data?.response || [];

  const { totalRecords } = data?.pagination || {
    totalRecords: 0,
  };

  const exportFile = () => {
    const response = getAllShopInvitationExport();
    response
      .then((data) => {
        const fileLink = document.createElement('a');

        const blob = new Blob([data?.data], {
          type: 'text/csv; charset=utf-8',
        });

        const fileName = `export_store_invitation_${dayjs().format(
          FORMAT_DATE_EXPORT_FILE
        )}.csv`;

        fileLink.href = window.URL.createObjectURL(blob);
        fileLink.download = fileName;
        fileLink.click();
      })
      .catch((error) => console.log(error));
  };

  const { isCheckedAll, selectedIds, handleSelectItem, handleCheckAll } =
    useSelectMultiple(
      tableData?.map((item) => item.spoonCode),
      page
    );

  const handleSearch = () => {
    refetch();
    setPage(0);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <HeaderBreadcrumbs
        heading="Danh Sách Khách Hàng Nhập Mã Giới Thiệu Của Chủ Cửa Hàng"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          {
            name: BREADCUMBS.SHOP_INVITATION,
            href: PATH_DASHBOARD.storeAdmin.shop_invitation,
          },
          { name: BREADCUMBS.SHOP_INVITATION_lIST },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'akar-icons:file'} />}
            onClick={() => {
              exportFile();
            }}
          >
            Export
          </Button>
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
                headLabel={TABLE_HEAD}
                rowCount={
                  tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
              />

              <TableBody>
                {tableData?.map((row: IResShopInvitation) => (
                  <InvitationTableRow
                    key={row.storeCode}
                    row={{ ...row }}
                    selected={selectedIds.includes(row.storeCode)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.storeCode, e);
                    }}
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
