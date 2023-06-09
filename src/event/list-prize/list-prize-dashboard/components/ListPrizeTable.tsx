import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import Can from 'src/common/lib/Can';
import { dispatch, useSelector } from 'src/common/redux/store';
import { alertStatusSelector, itemRowsSelector, setAlert } from '../../eventListPrize.slice';
import { IPropsListPrizeTableRow } from '../../interfaces';
import AlertDialog from './AlertConfirmDelete';
// ----------------------------------------------------------------------

function ListPrizeTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListPrizeTableRow) {
  const { id, giftName, ordinal, probability, quantity } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const itemRow = useSelector(itemRowsSelector);
  const alert = useSelector(alertStatusSelector);
  
  return (
    <TableRow hover selected={selected} sx={{ overflow: 'hidden' }}>
      <Can do="update" on="all">
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
      </Can>
      <TableCell align="left">{giftName}</TableCell>
      <TableCell align="center">{ordinal}</TableCell>
      <TableCell align="center">{quantity}</TableCell>
      <TableCell align="center">{probability} %</TableCell>
      <TableCell align="center">
        <Can do="update" on="all">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
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
                </Stack>
              </>
            }
          />
        </Can>
        
      </TableCell>
    </TableRow>
  );
}

export { ListPrizeTableRow };
