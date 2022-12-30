import { MenuItem, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import Iconify from "src/common/components/Iconify";
import { TableMoreMenu } from "src/common/components/table";
import { IPrizeData } from "../../interface";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "src/common/routes/paths";

type Props = {
    row: IPrizeData
}

export default function PrizeTableRow({ row }: Props) {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
        setOpenMenu(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setOpenMenu(null);
    }

    return (
        <TableRow hover>
            <TableCell align="center">
                {row.id}
            </TableCell>
            <TableCell align="center">
                {row.name}
            </TableCell>
            <TableCell align="center">
                {row.count_prize}
            </TableCell>
            <TableCell align="center">
                {row.start_time}
            </TableCell>
            <TableCell align="center">
                {row.end_time}
            </TableCell>
            <TableCell align="center">
                {row.win_prize}
            </TableCell>
            <TableCell align="left">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    // onDeleteRow()
                                    navigate(PATH_DASHBOARD.eventPrizeQ1.edit)
                                    handleCloseMenu();
                                }}
                            >
                                <EditIcon />
                                Chỉnh sửa
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    // onDeleteRow()
                                    handleCloseMenu();
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon={'eva:trash-2-outline'} />
                                Xóa
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    )
}