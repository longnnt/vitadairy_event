import { TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';
import { FORMAT_DATE_NEWS } from '../../constants';
import { IPropsPrizeHistoryTableRow } from '../../interfaces';

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
        {dayjs(giftReceivedDate).format(FORMAT_DATE_NEWS)}
      </TableCell>

      <TableCell align="left">{qr}</TableCell>
      <TableCell align="left">{spoonCode}</TableCell>
    </TableRow>
  );
}

export { PrizeHistoryTableRow };

