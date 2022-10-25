import { Checkbox, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IPropsPrizeHistoryTableRow } from 'src/event/event-history-prize/interfaces';
import { IPropsListPrizeTableRow } from '../../interfaces';



// ----------------------------------------------------------------------

function ListPrizeTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListPrizeTableRow) {
  const { id, giftName, ordinal, probability, quantity  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>

      <TableCell align="left">{giftName}</TableCell>

      <TableCell align="left">{ordinal}</TableCell>
      <TableCell align="left">{quantity}</TableCell>
      <TableCell align="left">{probability}</TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'carbon:view-filled'} />
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
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
}

export { ListPrizeTableRow };

