import { MenuItem, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import Iconify from "src/common/components/Iconify";
import { TableMoreMenu } from "src/common/components/table";
import { IListPrizeData } from "../../interface";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { replacePathParams } from "src/common/utils/replaceParams";
import { useGetGiftById } from "src/event/edit-event-prize/hooks/useGetGiftById";
import { dispatch } from "src/common/redux/store";
import { setIdPrizeDelete, setOpenConfirmDelete } from "src/event-prize-q1/eventPrizeQ1.slice";

type Props = {
    row: IListPrizeData
}

export default function PrizeTableRow({ row }: Props) {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

    const {data: giftRes} = useGetGiftById(row.giftId);
    const giftDetail = giftRes?.data?.response;

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
                {giftDetail?.name}
            </TableCell>
            <TableCell align="center">
                {row.quantity}
            </TableCell>
            <TableCell align="center">
                {row.startDate || '-'}
            </TableCell>
            <TableCell align="center">
                {row.endDate || '-'}
            </TableCell>
            <TableCell align="center">
                {row.ordinal}
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
                                    navigate(replacePathParams(PATH_DASHBOARD.eventPrizeQ1.edit, {eventId: row.eventId, prizeId: row.id}))
                                    handleCloseMenu();
                                }}
                            >
                                <EditIcon />
                                Chỉnh sửa
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    dispatch(setOpenConfirmDelete())
                                    dispatch(setIdPrizeDelete(row.id))
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