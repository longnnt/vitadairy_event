import { Box, Divider, FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { TableHeadCustom } from "src/common/components/table";
import useTable from "src/common/hooks/useTable";
import { dataTest, HEAD_LABELS } from "src/event-prize-q1/constants";
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

    return (
        <>
            <Paper elevation={3}>
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
                            {dataTest.map((item) => (
                                <PrizeTableRow
                                    key={item.id}
                                    row={item}
                                />
                            ))}
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
                        count={dataTest.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        style={{ border: 'none' }}
                        labelRowsPerPage={'Rows per page'}
                    />
                </Box>
            </Paper>
        </>
    )
}