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
import useShowSnackbar from 'src/common/hooks/useMessage';
  import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
  import useTable from 'src/common/hooks/useTable';
  import Can from 'src/common/lib/Can';
  import { dispatch, useSelector } from 'src/common/redux/store';
  import { PATH_DASHBOARD } from 'src/common/routes/paths';
  import { replacePathParams } from 'src/common/utils/replaceParams';
import { LIST_GROUP_EVENT, TABLE_HEAD_GROUP_EVENT } from 'src/event-q1-groupEvent/contants';
  import { confirmEditSelector, openEditModalSelector, setConfirmEdit, setOpeneditModal } from 'src/event/edit-event-prize/editEventPrize.Slice';
import ListGroupEventFilterBar from './GroupEventFilterBar';
import { IListGroupEvent } from 'src/event-q1-groupEvent/interfaces';
import { ListGroupEventTableRow } from './ListGroupEventTable';
import TableHeadGroupEvent from './TableHeadGroupEvent';
import ListGroupEventTableNoData from './ListGroupEventTableNoData';
  
  function ListGroupEventDashboard() {
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
    // const {mutate} = useDeleteListPrizeAdmin({
    //   onSuccess: () => {
    //     showSuccessSnackbar('Delete prize successfully');
    //   },
    //   onError: () => {
    //     showErrorSnackbar('Delete prize fail');
    //   },
    // });
  
    const params = useParams();
    const id = params?.id;
    // const searchParams: IListPrizeParams = {
    //   eventId: id,
    //   page: page,
    //   size: rowsPerPage,
    // };
    // const filterName = useSelector(filterNameSelector);
    const filterName = '';
    
    const { useDeepCompareEffect } = useDeepEffect();
    const openEditModal = useSelector(openEditModalSelector);
    const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
    const handleOpenEditModal = () => dispatch(setOpeneditModal(true));
    // const selectedIdsValue = useSelector(selectedIdsState);
    
    // if (filterName.length >2) searchParams.searchText = filterName;
  
    // const { data, isLoading } = useGetListPrize(searchParams);
    // const listGroupEvent = data?.data?.response || [];
    const listGroupEvent = LIST_GROUP_EVENT || [];
  
    const {
      isCheckedAll,
      reset: resetSelect,
      selectedIds,
      handleSelectItem,
      handleCheckAll,
    } = useSelectMultiple(
      listGroupEvent.map((item) => item.id),
      page + 1
    );
  
    // const alertStatus = useSelector(alertStatusSelector)
    // const itemRow= useSelector(itemRowsSelector)
    const handleFilterName = (filterName: string) => {
    //   dispatch(setFilterName(filterName));
    //   setPage(0);
    };
    const handleDeleteRows = (ids: number[]) => {
    //   handleOpenEditModal();
    //   dispatch(setSelectedIds(ids));
    };
    // const confirmEdit = useSelector(confirmEditSelector);
  
    // useDeepCompareEffect(() => {
    //   if (confirmEdit) {
    //     for (let i = 0; i < selectedIdsValue.length; i++) {
    //       mutate(selectedIdsValue[i]);
    //     }
    //     dispatch(setConfirmEdit(false));
    //     resetSelect();
    //   }
    // }, [confirmEdit, selectedIdsValue]);
    const handleEditRow = (id: number) => {
      navigate(PATH_DASHBOARD.eventQ1GroupEvent.editGroupEvent);
    };
  
    const totalRecords =  0;
    const isNotFound = !listGroupEvent.length;
    const tableHeight =400*rowsPerPage/5
    const handleOnAgree = () => {
      dispatch(setConfirmEdit(true));
    };
    return (
      <>
        <HeaderBreadcrumbs
          heading= {BREADCUMBS.LIST_GROUP_EVENT}
          links={[
            {
              name: BREADCUMBS.MANAGE_GROUP_EVENT,
              href: PATH_DASHBOARD.eventQ1GroupEvent.root,
            },
            { name: BREADCUMBS.LIST_GROUP_EVENT, href: PATH_DASHBOARD.eventQ1GroupEvent.listGroupEvent },
          ]}
          action={
            <Stack direction="row" spacing={'10px'}>
              <Can do="update" on="all">
                <Button
                    variant="contained"
                    to={PATH_DASHBOARD.eventQ1GroupEvent.addGroupEvent}
                    component={RouterLink}
                >
                    Tạo mới
                </Button>
              </Can>
            </Stack>
          }
        />
        <Card sx={{overflow: 'hidden'}}>
          {/* <Divider /> */}
          <ListGroupEventFilterBar filterName={filterName} onFilterName={handleFilterName} placeholder={'Nhập từ khóa tìm kiếm...'}/>
          <ConfirmEditModal
              open={openEditModal}
              handleClose={handleCloseEditModal}
              handleOnAgree={handleOnAgree}
              type='Xóa giải thưởng sự kiện'
              colorType={false}
            />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', minHeight: tableHeight }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadGroupEvent
                  isSelectAll={isCheckedAll}
                  headLabel={TABLE_HEAD_GROUP_EVENT}
                  rowCount={listGroupEvent.length}
                  numSelected={selectedIds.length}
                  onSort={onSort}
                  onSelectAllRows={handleCheckAll}
                />
  
                <TableBody>
                  {listGroupEvent.map((row: IListGroupEvent) => (
                    <ListGroupEventTableRow
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
                  {/* {Array.from(Array(rowsPerPage)).map((index) => {
                    return <ListPrizeTableSkeleton key={index} isNotFound={isLoading} />;
                  })} */}
                  <ListGroupEventTableNoData isNotFound={isNotFound}/>
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
  
  export { ListGroupEventDashboard };
  