import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IPropsAdminTableRow } from '../../interfaces';

function AdminTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsAdminTableRow) {
  const { email, firstName, lastName, status, id } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">{firstName}</TableCell>

      <TableCell align="left">{lastName}</TableCell>

      <TableCell align="left">{status}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
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
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

export { AdminTableRow };
