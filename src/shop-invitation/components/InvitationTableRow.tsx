import { useState } from 'react';
// @mui
import { Checkbox, TableCell, TableRow } from '@mui/material';
// @types
import { IResShopInvitation } from '../common/interfaces';
// components
import Iconify from 'src/common/components/Iconify';
// import { TableMoreMenu } from 'src/components/table';

// ----------------------------------------------------------------------

type Props = {
  row: IResShopInvitation;
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
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell> */}

      <TableCell align="left">{storeCode}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {userName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {phoneNumber}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {new Date(firstScanDate).toUTCString()}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {new Date(registrationDate).toUTCString()}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {qrCode}
      </TableCell>

      <TableCell padding="checkbox">
        <Checkbox checked={isSuccess} disabled />
      </TableCell>
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
