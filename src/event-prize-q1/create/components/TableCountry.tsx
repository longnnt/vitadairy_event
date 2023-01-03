import { Box, Paper, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColumns, GridActionsCellItem } from "@mui/x-data-grid";
import { dataCountry, dataTest } from "src/event-prize-q1/constants";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, dispatch } from "src/common/redux/store";
import { handleAddNewRow, handleRemoveRow } from "src/event-prize-q1/eventPrizeQ1.slice";


export default function TableCountry() {

    const fields = useSelector((state) => state.eventPrizeQ1.fields)

    const columns: GridColumns = [
        {
            field: 'countryName',
            headerName: 'Tên tỉnh',
            flex: 1,
            editable: true,
            sortable: false,
            align: 'center',
            headerAlign:'center',
            type: 'singleSelect',
            valueOptions: dataCountry
        },
        {
            field: 'count',
            headerName: 'Số lượng',
            flex: 1,
            editable: true,
            sortable: false,
            type: "number",
            align: 'center',
            headerAlign:'center'

        },
        {
            field: 'startDate',
            headerName: 'Ngày bắt đầu',
            flex: 1,
            editable: true,
            sortable: false,
            type: "dateTime",
            align: 'center',
            headerAlign:'center'

        },
        {
            field: 'endDate',
            headerName: 'Ngày kết thúc',
            flex: 1,
            editable: true,
            sortable: false,
            type: "dateTime",
            align: 'center',
            headerAlign:'center'
        },
        {
            field: 'totalPrizeCountry',
            headerName: 'Tổng số giải ở tỉnh thành',
            flex: 1,
            editable: true,
            sortable: false,
            type: "number",
            align: 'center',
            headerAlign:'center'
        },
        {
            field: 'totalPrizeAllCountry',
            headerName: 'Tổng số giải ở tất cả tỉnh thành',
            flex: 1,
            editable: true,
            sortable: false,
            type: "number",
            align: 'center',
            headerAlign:'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            sortable: false,
            getActions: ({ id }) => {
                return [
                    //  @ts-ignore
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        onClick={() => {
                            dispatch(handleRemoveRow(id.toString()));
                        }}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleClickAddnewRow = () => {
        const idRandom = (Math.random() + 1).toString(36).substring(7);
        const newRow = {
            id: idRandom,
            countryName: 'Tỉnh Hà Giang',
            count: 0,
            startDate: null,
            endDate: null,
            totalPrizeCountry: 0,
            totalPrizeAllCountry: 0
        }

        dispatch(handleAddNewRow(newRow))
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pt: 10
                }}
            >
                <Typography variant="h5">
                    Tỉnh thành
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickAddnewRow}
                >
                    Thêm tỉnh thành
                </Button>
            </Box>
                <Box sx={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={fields}
                        columns={columns}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        autoHeight
                        disableColumnMenu={true}
                        disableColumnSelector={true}
                        hideFooter={true}
                        showCellRightBorder={true}
                        sx={{
                            boxShadow: 2,
                            marginTop: '30px',
                        }}
                    />
                </Box>
        </>
    )
}