import { TableCell, TableRow } from '@mui/material';

import dayjs from 'dayjs';
import _ from 'lodash';
import { FORMAT_DATE_FILTER, FORMAT_TEST } from 'src/common/constants/common.constants';
import { IPropsPrizeHistoryTableRow } from '../../common/interface';

// ----------------------------------------------------------------------

function PrizeHistoryTableRow({ row, selected }: IPropsPrizeHistoryTableRow) {
  const { id, phoneNumber, userName, qr, giftName, giftReceivedDate, spoonCode } = row;
  const time = giftReceivedDate.split(' ')[0].replace(',', '');
  const date = giftReceivedDate.split(' ')[1].split('/');
  const day = date[0];
  let month = date[1];
  if (parseInt(month) < 10) {
    month = '0' + month;
  }
  const year = date[2];
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{userName}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{giftName}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(giftReceivedDate).isValid()
          ? dayjs(giftReceivedDate).format(FORMAT_DATE_FILTER)
          : `${month}-${day}-${year} ${time}`}
      </TableCell>

      <TableCell align="left">{qr}</TableCell>
      <TableCell align="left">{spoonCode}</TableCell>
    </TableRow>
  );
}

export { PrizeHistoryTableRow };
