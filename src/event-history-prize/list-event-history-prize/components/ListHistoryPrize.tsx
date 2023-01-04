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
  import { reset } from 'numeral';
  import React, { useEffect } from 'react';
  import { useDispatch } from 'react-redux';
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
  import { boolean, string } from 'yup';
  import { TABLE_HEAD } from '../../common/constants';
  import {
    firstScanEndSelector,
    firstScanStartSelector,
    searchTextSelector,
    // setShowData,
    // showDataSelector,
  } from '../../eventHistory.slice';
//   import { useDeletePrizeHistoryAdmin } from '../hooks/useDeletePrizeHistory';
  
//   import { useGetPrizeHistory } from '../hooks/useGetPrizeHistory';
  import { IPrizeHistory, IPrizeHistoryParams } from '../../common/interface';
//   import { exportPrizeHistory } from '../services';
  import { FilterBar } from '../components/FilterBar';
  import { PrizeHistoryTableRow } from '../components/HistoryTable';
//   import TableSkeleton from '../components/TableSkeleton';
  
  function EventPrizeHistoryDashboard() {
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
    const dispatch = useDispatch();
    const searchText = useSelector(searchTextSelector);
    const firstScanStart = useSelector(firstScanStartSelector);
    const firstScanEnd = useSelector(firstScanEndSelector);
    // const showData = useSelector(showDataSelector);
    const searchParams: IPrizeHistoryParams = {
      page: page,
      size: rowsPerPage,
      endDate: firstScanEnd,
      startDate: firstScanStart,
      searchText: searchText,
    };
    if (!searchText) delete searchParams.searchText;
    if (!firstScanEnd) delete searchParams.endDate;
    if (!firstScanStart) delete searchParams.startDate;
  
    // const { data, refetch, isLoading } = useGetPrizeHistory(searchParams);
    // const listStoreAdmin = data?.data?.response || [];
  
    // const {
    //   isCheckedAll,
    //   reset: resetSelect,
    //   selectedIds,
    //   handleSelectItem,
    //   handleCheckAll,
    // } = useSelectMultiple(
    //   listStoreAdmin.map((item) => item.id),
    //   page + 1
    // );
  
    const handleSearch = () => {
    //   dispatch(setShowData(true));
    //   refetch();
      setPage(0);
    };
  
    const handleDeleteRows = (ids: string[]) => {};
    useEffect(() => {
      return () => {
        // dispatch(setShowData(false));
      };
    }, []);
    const handleEditRow = (id: string) => {};
  
    const { totalRecords } =  {
      totalRecords: 0,
    };
    // const exportFile = () => {
    //   const response = exportPrizeHistory(searchParams);
    //   response
    //     .then((data) => {
    //       console.log(data);
  
    //       const fileLink = document.createElement('a');
  
    //       const blob = new Blob([data?.data], {
    //         type: 'text/csv; charset=utf-8',
    //       });
  
    //       const fileName = `export_prize_history_admin_${Date.now()}.csv`;
  
    //       fileLink.href = window.URL.createObjectURL(blob);
    //       fileLink.download = fileName;
    //       fileLink.click();
    //     })
    //     .catch((err) => console.log(err));
    // };
    // const isNotFound = !listStoreAdmin.length && !isLoading;
    return (
      <>
        <HeaderBreadcrumbs
          heading="Lịch sử trúng giải"
          links={[
            {
              name: BREADCUMBS.EVENT_PROMOTION_Q4,
              href: PATH_DASHBOARD.eventAdmin.historyPrize,
            },
            { name: 'Lịch sử trúng giải' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              onClick={() => {
                // exportFile();
                // navigate(PATH_DASHBOARD.eventAdmin.list);
              }}
            >
              Export
            </Button>
          }
        />
        <Card>
          <Divider />
          <FilterBar handleSearch={handleSearch} isLoading={true} />
  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {/* {!!selectedIds.length && (
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
              )} */}
  
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  // isSelectAll={isCheckedAll}
                  headLabel={TABLE_HEAD}
                //   rowCount={listStoreAdmin.length}
                  // numSelected={selectedIds.length}
                  onSort={onSort}
                  // onSelectAllRows={handleCheckAll}
                />
  
                <TableBody>
                  {/* {showData &&
                    listStoreAdmin.map((row: IPrizeHistory) => (
                      <PrizeHistoryTableRow
                        key={row.id}
                        row={{
                          ...row,
                          giftReceivedDate: new Date(row.giftReceivedDate).toLocaleString(),
                        }}
                        selected={selectedIds.includes(row.id)}
                        onSelectRow={(e) => {
                          handleSelectItem(row.id, e);
                        }}
                        onDeleteRow={() => handleDeleteRows([row.id])}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                  {Array.from(Array(rowsPerPage)).map((index) => {
                    return <TableSkeleton key={index} isNotFound={isLoading} />;
                  })}
                  <TableNoData isNotFound={isNotFound} /> */}
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
  
  export { EventPrizeHistoryDashboard };
  