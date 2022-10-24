import { TableCell, Checkbox, TableRow, MenuItem } from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { openMenuState, udpateStatusMenu } from '../eventPromotionIV.slice';
import { EventTableRowProps } from '../interface';

export const EventTableRow = ({
  row,
  onSelectRow,
  selected,
  onDeleteRow,
}: EventTableRowProps) => {
  const navigate = useNavigate();
  const { nameEvent, startDate, endDate, id } = row;
  const dispatch = useDispatch();
  const openMenu = useSelector(openMenuState);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    dispatch(udpateStatusMenu(e.currentTarget));
  };
  const handleCloseMenu = () => {
    dispatch(udpateStatusMenu(null));
  };

  const handleEditEvent = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.edit(id));
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{nameEvent}</TableCell>
      <TableCell align="left">{startDate}</TableCell>
      <TableCell align="left">{endDate}</TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem>
                <Iconify icon={'akar-icons:eye'} />
                View
              </MenuItem>
              <MenuItem onClick={() => handleEditEvent(id)}>
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
