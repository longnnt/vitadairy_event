import { Box, Divider, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { ConfirmEditModal } from "src/common/components/modal/ConfirmEditModal";
import { TableHeadCustom, TableNoData, TableSkeleton } from "src/common/components/table";
import useTable from "src/common/hooks/useTable";
import { dispatch, useSelector } from "src/common/redux/store";
import { dataTest, HEAD_LABELS } from "src/event-prize-q1/constants";
import { setCloseDeleteModal } from "src/event-prize-q1/eventPrizeQ1.slice";
import { useGetListPrize } from "src/event-prize-q1/hooks/useGetListPrize";
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

    const params = useParams();
    const eventId = params?.eventId || '';

    const { data, isLoading, isError } = useGetListPrize(parseInt(eventId));
    const listPrize = data?.data?.response || [];

    const totalRecords = data?.data?.pagination?.totalRecords || 0;
    const isNotFound = (!isLoading && !listPrize.length) || isError;

    const {openDeleteModal} = useSelector((state) => state.eventPrizeQ1)

    const handleCloseDeleteModal = () => {
        dispatch(setCloseDeleteModal());
    }

    const handleDeleteSingle = () => {

    }

    return (
        <>
            <Paper elevation={3}>
                <ConfirmEditModal
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    handleOnAgree={handleDeleteSingle}
                    type='Xóa giải thưởng sự kiện'
                    colorType={false}
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
                            {/* {listPrize.map((item) => (
                                <PrizeTableRow
                                    key={item.id}
                                    row={item}
                                />
                            ))} */}

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