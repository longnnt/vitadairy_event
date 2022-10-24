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
import { TableHeadCustom, TableSelectedActions } from 'src/common/components/table';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { TABLE_HEAD } from '../constant';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import { RowProps } from '../interface';
import { EventTableRow } from './EventTableRow';

function createDataEventList(
  id: number,
  nameEvent: string,
  startDate: number,
  endDate: number
) {
  return { nameEvent, startDate, endDate, id };
}

const rows = [
  createDataEventList(1, 'Frozen yoghurt', 1, 2),
  createDataEventList(2, 'Ice cream sandwich', 1, 2),
  createDataEventList(3, 'Eclair', 1, 2),
  createDataEventList(4, 'Cupcake', 1, 2),
  createDataEventList(5, 'Gingerbread', 1, 2),
  createDataEventList(6, 'Gingerbread', 1, 2),
  createDataEventList(7, 'Gingerbread', 1, 2),
];

export const EventTable = () => {
  const { onChangeRowsPerPage, dense, onChangeDense, page, rowsPerPage, onChangePage } =
    useTable();
  const { enqueueSnackbar } = useSnackbar();
  const {
    isCheckedAll,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    reset: resetSelect,
  } = useSelectMultiple(
    rows.map((row) => row.id),
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
  const mutationDelete = useDeleteEvents({ onSuccess, onError });
  const handleDeleteRows = (idsRowSeleted: number[]) => {
    if (idsRowSeleted.length) {
      mutationDelete.mutate(idsRowSeleted);
      resetSelect();
    }
  };
  return (
    <>
      <Scrollbar sx={{ mt: '10px' }}>
        <TableContainer>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              rowCount={rows.length}
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
              rowCount={rows.length}
              onSelectAllRows={handleCheckAll}
              numSelected={selectedIds.length}
            />
            <TableBody>
              {rows.map((row: RowProps) => (
                <EventTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.id)}
                  onSelectRow={(e) => handleSelectItem(row.id, e)}
                  onDeleteRow={() => handleDeleteRows([row.id])}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length || 0}
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
