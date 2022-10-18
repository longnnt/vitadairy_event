import { useState } from 'react';
// @mui
import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
// @types
import { IResShop_Invitation } from '../interfaces';
// components
import Iconify from 'src/common/components/Iconify';
// import { TableMoreMenu } from 'src/components/table';

// ----------------------------------------------------------------------

type Props = {
  row: IResShop_Invitation;
  selected?: boolean;
  onEditRow?: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow?: VoidFunction;
};

export default function InvitationTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const {
    storeCode,
    userName,
    phoneNumber,
    isSuccess,
    firstScanDate,
    registrationDate,
    qrCode,
  } = row;

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

      <TableCell align="left">{storeCode}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {userName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {phoneNumber}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {firstScanDate}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {registrationDate}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {qrCode}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <img style={thumbnailStyle} src={qrCode} alt={qrCode} />
      </TableCell>

      <TableCell align="left" title={isSuccess ? 'featured' : 'unFeatured'}>
        <Iconify
          icon={isSuccess ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',

            ...(!isSuccess && { color: 'warning.main' }),
          }}
        />
      </TableCell>

      {/* <TableCell align="right">
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
        /> */}
      {/* </TableCell> */}
    </TableRow>
  );
}
const thumbnailStyle: any = {
  border: '1px solid #ddd',
  border_radius: ' 10px',
  padding: '5px',
  width: '80px',
  height: '50px',
};
