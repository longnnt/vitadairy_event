import { TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';
import {
  FORMAT_DATE_FILTER
} from 'src/common/constants/common.constants';
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
        {dayjs(giftReceivedDate).isValid()
          ? dayjs(giftReceivedDate).format(FORMAT_DATE_FILTER)
          : ''}
      </TableCell>

      <TableCell align="left">{qr}</TableCell>
      <TableCell align="left">{spoonCode}</TableCell>
    </TableRow>
  );
}

export { PrizeHistoryTableRow };

