import { Checkbox, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { IPropsPrizeHistoryTableRow } from '../../interfaces';
import dayjs from 'dayjs';
import { FORMATE_CREATE_DATE } from 'src/store-admin/constants';
import { FORMAT_DATE_NEW, FORMAT_DATE_NEWS } from '../../constants';

// ----------------------------------------------------------------------

function PrizeHistoryTableRow({ row, selected }: IPropsPrizeHistoryTableRow) {
  const { id, phoneNumber, userName, qr, giftName, giftReceivedDate, spoonCode } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{userName}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{giftName}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {/* {giftReceivedDate.slice(0, 19).replace('T', ' ')} */}
        {/* {dayjs(giftReceivedDate).format(FORMATE_CREATE_DATE)} */}
        {dayjs(giftReceivedDate).format(FORMAT_DATE_NEW)}
      </TableCell>

      <TableCell align="left">{qr}</TableCell>
      <TableCell align="left">{spoonCode}</TableCell>
    </TableRow>
  );
}

export { PrizeHistoryTableRow };
