import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import Can from 'src/common/lib/Can';
import { dispatch, useSelector } from 'src/common/redux/store';
import { IPropsListGroupEventTableRow } from 'src/event-q1-groupEvent/interfaces';

// ----------------------------------------------------------------------

function ListGroupEventTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListGroupEventTableRow) {
  const { id, groupEvent } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // const itemRow = useSelector(itemRowsSelector);
  // const alert = useSelector(alertStatusSelector);
  
  return (
    <TableRow hover selected={selected} sx={{ overflow: 'hidden' }}>
      <Can do="update" on="all">
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell> */}
      </Can>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{groupEvent}</TableCell>
      <TableCell align="right">
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
                    Chỉnh sửa
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onDeleteRow();
                      handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Xóa
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

export { ListGroupEventTableRow };
