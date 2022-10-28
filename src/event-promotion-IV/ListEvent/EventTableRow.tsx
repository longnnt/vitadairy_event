import { TableCell, Checkbox, TableRow, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { fDate } from 'src/common/utils/formatTime';
import { openMenuState, udpateStatusMenu } from '../eventPromotionIV.slice';
import { EventTableRowProps } from '../interface';

export const EventTableRow = ({
  row,
  onSelectRow,
  selected,
  onDeleteRow,
  onViewRow,
}: EventTableRowProps) => {
  const navigate = useNavigate();
  const { name, startDate, endDate, id } = row;

  const dispatch = useDispatch();
  // const openMenu = useSelector(openMenuState);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setOpenMenuActions(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleEditEventAction = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.edit(id));
    setOpenMenuActions(null);
  };

  const handleClickView = () => {
    onViewRow(row);
    setOpenMenuActions(null);
  };
  const handleViewListPrize =(id: string) =>{ 
    navigate(PATH_DASHBOARD.eventAdmin.listPrize(id));
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell 
        align="left"
        onClick={() => handleViewListPrize(id.toString())}
      >
        {name}
      </TableCell>
      <TableCell align="left">{fDate(startDate)}</TableCell>
      <TableCell align="left">{fDate(endDate)}</TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleClickView}>
                <Iconify icon={'akar-icons:eye'} />
                View
              </MenuItem>
              <MenuItem onClick={() => handleEditEventAction(id)}>
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                sx={{ color: 'error.main' }}
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};
