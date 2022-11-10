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
  endDateState,
  isResetSelectState,
  searchTextState,
  setConfirmPopup,
  setIsResetSelect,
  setSelectedIds,
  startDateState,
} from '../eventPromotionIV.slice';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import { useGetListEvent } from '../hooks/useGetListEvent';
import { EventSearchParams, PaginationProps, RowProps } from '../interface';
import { EventTableRow } from './EventTableRow';
export const EventTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onChangeRowsPerPage, dense, onChangeDense, page, rowsPerPage, onChangePage } =
    useTable();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const startDateValue = useSelector(startDateState);
  const endDateValue = useSelector(endDateState);
  const searchTextValue = useSelector(searchTextState);
  const isResetSelect = useSelector(isResetSelectState);

  const searchParams: EventSearchParams = {
    page: page,
    size: rowsPerPage,
    startDate: startDateValue,
    endDate: endDateValue,
    searchText: searchTextValue,
  };

  const { data } = useGetListEvent({
    params: searchParams,
    callback: {
      onSuccess: () => showSuccessSnackbar('Tải sự kiện thành công'),
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

  const isNotFound = !dataListEvent.length;

  useEffect(() => {
    dispatch(setSelectedIds(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    resetSelect();
    dispatch(setIsResetSelect(false));
  }, [isResetSelect]);

  const handleViewRow = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.view(id));
  };

  const handleDeleteRows = (selectedIds: number[]) => {
    dispatch(setConfirmPopup(true));
    dispatch(setSelectedIds(selectedIds));
  };

  return (
    <>
      <AlertDialogSlide />
      <Scrollbar sx={{ mt: '10px' }}>
        <TableContainer>
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

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        {!!totalPages && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalRecords || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        )}

        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </>
  );
};
