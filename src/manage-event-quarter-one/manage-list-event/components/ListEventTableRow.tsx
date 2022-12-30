import { MenuItem, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { FORMAT_DATE_EVENT } from 'src/manage-event-quarter-one/common/constants';
import { IPropsListEventTableRow } from 'src/manage-event-quarter-one/common/interface';
import useMessage from 'src/store-admin/hooks/useMessage';
// ----------------------------------------------------------------------

function ListEventTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListEventTableRow) {
  const navigate = useNavigate();

  const {
    id,
    event,
    groupEvent,
    startDate,
    endDate,
    prizeWinningUser,
    prizeWinningShop,
    status,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>

      <TableCell align="left">{event}</TableCell>

      <TableCell align="left">{groupEvent}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(startDate).isValid() ? dayjs(startDate).format(FORMAT_DATE_EVENT) : ''}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(endDate).isValid() ? dayjs(endDate).format(FORMAT_DATE_EVENT) : ''}
      </TableCell>

      <TableCell align="left">{prizeWinningUser}</TableCell>

      <TableCell align="left">{prizeWinningShop}</TableCell>

      <TableCell align="left">{status}</TableCell>
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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

export { ListEventTableRow };

