import { Box, Divider, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { TableHeadCustom, TableNoData, TableSkeleton } from "src/common/components/table";
import useMessage from "src/common/hooks/useMessage";
import useTable from "src/common/hooks/useTable";
import { dispatch, useSelector } from "src/common/redux/store";
import AlertConfirmDelete from "src/event-prize-q1/common/AlertConfirmDelete";
import { dataTest, HEAD_LABELS } from "src/event-prize-q1/constants";
import { setCloseConfirmDelete, setIdPrizeDelete, setOpenConfirmDelete } from "src/event-prize-q1/eventPrizeQ1.slice";
import { useDeleteListPrizeAdmin } from "src/event-prize-q1/hooks/useDeleteSinglePrize";
import { useGetListPrize } from "src/event-prize-q1/hooks/useGetListPrize";
import { IListPrizeData } from "src/event-prize-q1/interface";
import PrizeTableRow from "./PrizeTableRow";

export default function ListPrizeTable() {
    const {
        page,
        dense,
        rowsPerPage,
        setPage,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage
    } = useTable();

    const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
    const { openConfirmDelete, idPrizeDelete } = useSelector((state) => state.eventPrizeQ1);
    const params = useParams();
    const eventId = params?.eventId || '';

    const { data, isLoading, isError } = useGetListPrize(parseInt(eventId));
    const listPrize = data?.data?.response || [];

    const totalRecords = data?.data?.pagination?.totalRecords || 0;
    const isNotFound = (!isLoading && !listPrize.length) || isError;

    const handleCloseDeleteModal = () => {
        dispatch(setCloseConfirmDelete());
    }

    const { mutate } = useDeleteListPrizeAdmin({
        onSuccess: () => {
            showSuccessSnackbar('Xóa giải thưởng thành công');
        },
        onError: () => {
            showErrorSnackbar('Xóa giải thưởng thất bại!');
        },
    })

    const handleDeleteSingle = () => {
        if (idPrizeDelete !== 0) {
            mutate(idPrizeDelete)
        } else {
            showErrorSnackbar('Không tìm được thông tin giải thưởng!');
        }
        dispatch(setCloseConfirmDelete());
        dispatch(setIdPrizeDelete(0))

    }

    return (
        <>
            <Paper elevation={3}>
                <AlertConfirmDelete
                    open={openConfirmDelete}
                    handleClose={handleCloseDeleteModal}
                    handleConfirm={handleDeleteSingle}

                />
                <TableContainer
                    sx={{ minWidth: 800, position: 'relative' }}
                >
                    <Table
                        sx={{ minWidth: 750 }}
                        size={dense ? 'small' : 'medium'}
                    >
                        <TableHeadCustom
                            headLabel={HEAD_LABELS}
                            rowCount={dataTest.length}
                        />
                        <TableBody>
                            {listPrize.map((item: IListPrizeData) => (
                                <PrizeTableRow
                                    key={item.id}
                                    row={item}
                                />
                            ))}

                            {isLoading &&
                                Array.from(Array(rowsPerPage).keys()).map((index) => {
                                    return <TableSkeleton key={index} />
                                })}

                            <TableNoData isNotFound={isNotFound} />
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Box
                    display='flex' justifyContent={'space-between'} alignItems={'center'}
                    px={3}
                >
                    <FormControlLabel
                        label='Dense'
                        control={<Switch checked={dense} onChange={onChangeDense} />}
                    />
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 15]}
                        count={totalRecords}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                    />
                </Box>
            </Paper>
        </>
    )
}