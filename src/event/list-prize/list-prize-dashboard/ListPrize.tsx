import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { useEffect } from 'react';

import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import LoadingScreen from 'src/common/components/LoadingScreen';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import Can from 'src/common/lib/Can';
import { dispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { replacePathParams } from 'src/common/utils/replaceParams';
import { confirmEditSelector, openEditModalSelector, setConfirmEdit, setOpeneditModal } from 'src/event/edit-event-prize/editEventPrize.Slice';
import { TABLE_HEAD } from '../contants';
import { alertStatusSelector, filterNameSelector, setFilterName, setAlert, itemRowsSelector, isResetSelectSelector, setIsResetSelect, selectedIdsState, setSelectedIds } from '../eventListPrize.slice';
import useShowSnackbar from '../hooks/useCustomSnackBar';
import { useDeleteListPrizeAdmin } from '../hooks/useDeleteListPrize';
import { useGetListPrize } from '../hooks/useGetListPrize';
import { IListPrize, IListPrizeParams } from '../interfaces';
import AlertDialog from './components/AlertConfirmDelete';
import ListPrizeFilterBar from './components/ListPrizeFilterBar';
import { ListPrizeTableRow } from './components/ListPrizeTable';
import ListPrizeTableNoData from './components/ListPrizeTableNoData';
import ListPrizeTableSkeleton from './components/ListPrizeTableSkeleton';

function ListPrizeDashboard() {
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
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const {mutate} = useDeleteListPrizeAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Delete prize successfully');
    },
    onError: () => {
      showErrorSnackbar('Delete prize fail');
    },
  });

  const params = useParams();
  const id = params?.id;
  const searchParams: IListPrizeParams = {
    eventId: id,
    page: page,
    size: rowsPerPage,
  };
  const filterName = useSelector(filterNameSelector);
  const { useDeepCompareEffect } = useDeepEffect();
  const openEditModal = useSelector(openEditModalSelector);
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
  const selectedIdsValue = useSelector(selectedIdsState);
  
  if (filterName.length >2) searchParams.searchText = filterName;

  const { data, isLoading } = useGetListPrize(searchParams);
  const listPrize = data?.data?.response || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listPrize.map((item) => item.id),
    page + 1
  );

  const alertStatus = useSelector(alertStatusSelector)
  // const itemRow= useSelector(itemRowsSelector)
  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };
  const handleDeleteRows = (ids: number[]) => {
    handleOpenEditModal();
    dispatch(setSelectedIds(ids));
    
  };
  const confirmEdit = useSelector(confirmEditSelector);

  useDeepCompareEffect(() => {
    if (confirmEdit) {
      for (let i = 0; i < selectedIdsValue.length; i++) {
        mutate(selectedIdsValue[i]);
      }
      dispatch(setConfirmEdit(false));
      resetSelect();
    }
  }, [confirmEdit, selectedIdsValue]);
  const handleEditRow = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.eventAdmin.editEventPrize, { id: id }));
  };

  const totalRecords = data?.data?.pagination?.totalRecords || 0;
  const isNotFound = !listPrize.length;
  const tableHeight =400*rowsPerPage/5
  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  return (
    <>
      <HeaderBreadcrumbs
        heading="Giải thưởng sự kiện"
        links={[
          {
            name: BREADCUMBS.EVENT_PROMOTION_Q4,
            href: PATH_DASHBOARD.eventPromotionIV.root,
          },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Giải thưởng sự kiện' },
        ]}
        action={
          <Stack direction="row" spacing={'10px'}>
            <Can do="update" on="all">
            <Button
              variant="contained"
              to={PATH_DASHBOARD.eventAdmin.createPrize(id as string)}
              component={RouterLink}
            >
              Tạo mới
            </Button>
            <Button
              disabled={selectedIds.length ===0}
              variant="contained"
              color="error"
              onClick={() => handleDeleteRows(selectedIds)}
            >
              Xóa
            </Button>
            </Can>
          </Stack>
        }
      />
      <Card sx={{overflow: 'hidden'}}>
        <Divider />
        <ListPrizeFilterBar filterName={filterName} onFilterName={handleFilterName} placeholder={'Lọc theo tên quà tặng'}/>
        <ConfirmEditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            handleOnAgree={handleOnAgree}
            type='Xóa giải thưởng sự kiện'
            colorType={false}
          />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative', minHeight: tableHeight }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listPrize.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <></>
                  // <Tooltip title="Delete">
                  //   {/* <IconButton
                  //     color="primary"
                  //     onClick={() => handleDeleteRows(selectedIds)}
                  //   >
                  //     <Iconify icon={'eva:trash-2-outline'} />
                  //   </IconButton> */}
                  // </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={listPrize.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listPrize.map((row: IListPrize) => (
                  <ListPrizeTableRow
                    key={row.id}
                    row={{ ...row }}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() =>{handleDeleteRows([row.id])} }
                    onEditRow={() => handleEditRow(row.id)}
                    
                  />
                ))}
                {Array.from(Array(rowsPerPage)).map((index) => {
                  return <ListPrizeTableSkeleton key={index} isNotFound={isLoading} />;
                })}
                <ListPrizeTableNoData isNotFound={isNotFound && !isLoading}/>
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
            label="Thu gọn"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </>
  );
}

export { ListPrizeDashboard };
