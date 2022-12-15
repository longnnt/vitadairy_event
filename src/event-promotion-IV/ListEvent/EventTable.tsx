import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import useMessage from 'src/store-admin/hooks/useMessage';
import { AlertDialogSlide } from '../components/ModalConfirmDelete';
import { TABLE_HEAD } from '../constant';
import {
  confirmEditSelector,
  endDateState,
  isResetSelectState,
  openEditModalSelector,
  searchTextState,
  selectedIdsState,
  setConfirmEdit,
  setConfirmPopup,
  setIsResetSelect,
  setOpeneditModal,
  setSelectedIds,
  startDateState,
} from '../eventPromotionIV.slice';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import { useGetListEvent } from '../hooks/useGetListEvent';
import { EventSearchParams, PaginationProps, RowProps } from '../interface';
import { EventTableRow } from './EventTableRow';
import TableSkeleton from './TableSkeleton';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';

export const EventTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onChangeRowsPerPage, dense, onChangeDense, page, rowsPerPage, onChangePage } =
    useTable();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const startDateValue = useSelector(startDateState);
  const endDateValue = useSelector(endDateState);
  const searchTextValue = useSelector(searchTextState);
  const isResetSelect = useSelector(isResetSelectState);

  const selectedIdsValue = useSelector(selectedIdsState);
  const openEditModal = useSelector(openEditModalSelector);
  const handleCloseEditModal = () => dispatch(setOpeneditModal(false));
  const handleOpenEditModal = () => dispatch(setOpeneditModal(true));

  const searchParams: EventSearchParams = {
    page: page,
    size: rowsPerPage,
    startDate: startDateValue,
    endDate: endDateValue,
    searchText: searchTextValue,
  };

  const { data,isLoading } = useGetListEvent({
    params: searchParams,
    callback: {
      onSuccess:()=>{},
      onError: () => showErrorSnackbar('Tải sự kiện thất bại'),
    },
  });

  const dataListEvent = data?.data?.response || [];
  const {
    isCheckedAll,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    reset: resetSelect,
  } = useSelectMultiple<number>(
    dataListEvent.map((row: RowProps) => row.id),
    page + 1
  );

  const { totalRecords, totalPages }: PaginationProps = data?.data.pagination || {
    totalRecords: 0,
  };

  const isNotFound = !dataListEvent.length && !isLoading;

  useEffect(() => {
    dispatch(setSelectedIds(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    resetSelect();
    dispatch(setIsResetSelect(false));
  }, [isResetSelect]);

  const {mutate} = useDeleteEvents({
    onSuccess: () => showSuccessSnackbar('Xóa sự kiện thành công'),
    onError: () => showErrorSnackbar('Xóa sự kiện thất bại'),
    onSuccessSend: () => showErrorSnackbar('Sự kiện đã có người trúng không thể xóa'),
  });
  const confirmEdit = useSelector(confirmEditSelector);
  
  useDeepCompareEffect(() => {
    
    if (confirmEdit) {
      if (selectedIdsValue.length) {
        mutate(selectedIdsValue);
        dispatch(setIsResetSelect(true));
      }
      dispatch(setConfirmEdit(false));
    }
  }, [confirmEdit, selectedIdsValue]);

  const handleViewRow = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.view(id));
  };

  const handleDeleteRows = (ids: number[]) => {
    handleOpenEditModal();
    dispatch(setSelectedIds(ids));
  };
  const handleOnAgree = () => {
    dispatch(setConfirmEdit(true));
  };
  const tableHeight =400*rowsPerPage/5
  return (
    <>
      {/* <AlertDialogSlide /> */
      <ConfirmEditModal
      open={openEditModal}
      handleClose={handleCloseEditModal}
      handleOnAgree={handleOnAgree}
      type='Xóa sự kiện'
      colorType={false}
      // setConfirmEdit={setConfirmEdit}
    />}
      <Scrollbar sx={{ mt: '10px' }}>
        <TableContainer sx={{ minWidth: 800, position: 'relative', minHeight: tableHeight }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              rowCount={dataListEvent.length}
              numSelected={selectedIds.length}
              onSelectAllRows={handleCheckAll}
              isSelectAll={isCheckedAll}
            />
          )}
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              isSelectAll={isCheckedAll}
              rowCount={dataListEvent.length}
              onSelectAllRows={handleCheckAll}
              numSelected={selectedIds.length}
            />
            <TableBody>
              {dataListEvent.map((row: RowProps) => (
                <EventTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.id)}
                  onSelectRow={(e) => handleSelectItem(row.id, e)}
                  onDeleteRow={() => handleDeleteRows([row.id])}
                  onViewRow={() => {
                    handleViewRow(row.id);
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
            count={totalRecords || 0}
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
    </>
  );
};
