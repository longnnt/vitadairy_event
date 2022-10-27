import {
  Table,
  TableContainer,
  TableBody,
  Tooltip,
  IconButton,
  Box,
  TablePagination,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { TABLE_HEAD } from '../constant';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import { useGetListEvent } from '../hooks/useGetListEvent';
import { EventSearchParams, PaginationProps, RowProps } from '../interface';
import { EventTableRow } from './EventTableRow';
import useMessage from 'src/store-admin/hooks/useMessage';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useNavigate } from 'react-router-dom';

export const EventTable = () => {
  const navigate = useNavigate();
  const { onChangeRowsPerPage, dense, onChangeDense, page, rowsPerPage, onChangePage } =
    useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const searchParams: EventSearchParams = { page: page, size: rowsPerPage };
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

  const onSuccess = () => {
    enqueueSnackbar('Detele events successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Detele events successfully', {
      variant: 'error',
    });
  };

  const { totalRecords, totalPages }: PaginationProps = data?.data.pagination || {
    totalRecords: 0,
  };

  const isNotFound = !dataListEvent.length;
  const mutationDelete = useDeleteEvents({ onSuccess, onError });
  const handleDeleteRows = (idsRowSeleted: number[]) => {
    if (idsRowSeleted.length) {
      mutationDelete.mutate(idsRowSeleted);
      resetSelect();
    }
  };

  console.log('data list', dataListEvent);
  const handleViewRow = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.view(id));
  };

  return (
    <>
      <Scrollbar sx={{ mt: '10px' }}>
        <TableContainer>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              rowCount={dataListEvent.length}
              numSelected={selectedIds.length}
              onSelectAllRows={handleCheckAll}
              isSelectAll={isCheckedAll}
              actions={
                <Tooltip title="Delete">
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteRows(selectedIds)}
                  >
                    {' '}
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
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
              {dataListEvent.map((row1: RowProps) => (
                <EventTableRow
                  key={row1.id}
                  row={row1}
                  selected={selectedIds.includes(row1.id)}
                  onSelectRow={(e) => handleSelectItem(row1.id, e)}
                  onDeleteRow={() => handleDeleteRows([row1.id])}
                  onViewRow={(r: any) => {
                    console.log(r.name);
                    handleViewRow(r.id);
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
