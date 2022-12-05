import { useState } from 'react';
// @mui
import { Checkbox, TableCell, TableRow } from '@mui/material';
// @types
import { IResShopInvitation } from '../common/interfaces';
// components
import Iconify from 'src/common/components/Iconify';
import _ from 'lodash';
import dayjs from 'dayjs';
import { FORMATE_CREATE_DATE_HISTORY_LIST } from 'src/store-admin/constants';
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
    spoonCode,
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
      <TableCell align="left">{storeCode}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {userName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {phoneNumber}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(registrationDate).isValid()
          ? dayjs(registrationDate).format(FORMATE_CREATE_DATE_HISTORY_LIST)
          : ''}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(firstScanDate).isValid()
          ? dayjs(firstScanDate).format(FORMATE_CREATE_DATE_HISTORY_LIST)
          : ''}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {qrCode}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {spoonCode}
      </TableCell>

      <TableCell padding="checkbox" align="left">
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
