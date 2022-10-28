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

import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import { replacePathParams } from 'src/common/utils/replaceParams';
import { TABLE_HEAD } from '../contants';
import { filterNameSelector, setFilterName } from '../event.slice';
import useShowSnackbar from '../hooks/useCustomSnackBar';
import { useDeleteListPrizeAdmin } from '../hooks/useDeleteListPrize';
import { useGetListPrize } from '../hooks/useGetListPrize';
import { IListPrize, IListPrizeParams } from '../interfaces';
import ListPrizeFilterBar from './components/ListPrizeFilterBar';
import { ListPrizeTableRow } from './components/ListPrizeTable';

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
  const mutationDetele = useDeleteListPrizeAdmin({
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
  };
  const filterName = useSelector(filterNameSelector);
  if (filterName) searchParams.searchText = filterName;

  const { data } = useGetListPrize(searchParams);
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

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };
  const handleDeleteRows = (ids: string[]) => {
    for (let i = 0; i < ids.length; i++) {
      mutationDetele.mutate(ids[i]);
      resetSelect();
    }
  };
  const handleEditRow = (id: string) => {
    navigate(replacePathParams(PATH_DASHBOARD.eventAdmin.editEventPrize, { id: id }));
  };

  const totalRecords = data?.data?.pagination?.totalRecords || 0;
  const isNotFound = !listPrize.length;
  return (
    <>
      <HeaderBreadcrumbs
        heading="Quà tặng sự kiện"
        links={[
          {
            name: BREADCUMBS.EVENT_PROMOTION_Q4,
            href: PATH_DASHBOARD.eventPromotionIV.root,
          },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Quà tặng sự kiện' },
        ]}
        action={
          <Stack direction="row" spacing={'10px'}>
            <Button
              variant="contained"
              to={PATH_DASHBOARD.eventAdmin.createPrize(id as string)}
              component={RouterLink}
            >
              Tạo mới
            </Button>
          </Stack>
        }
      />
      <Card>
        <Divider />
        <ListPrizeFilterBar filterName={filterName} onFilterName={handleFilterName} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listPrize.length}
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
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
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
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
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

export { ListPrizeDashboard };
