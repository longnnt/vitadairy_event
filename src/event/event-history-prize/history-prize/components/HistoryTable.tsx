import { Checkbox, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { IPropsPrizeHistoryTableRow } from '../../interfaces';


// ----------------------------------------------------------------------

function PrizeHistoryTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsPrizeHistoryTableRow) {
  const { code, phoneNumber, address, qrLink, isActive, createdDate } = row;



  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{code}</TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {createdDate.slice(0, 19).replace('T', ' ')}
      </TableCell>

      <TableCell align="left">{address}</TableCell>

      <TableCell align="left"><a target="_blank" rel="noopener noreferrer" href={qrLink}>Tải QR</a></TableCell>

      <TableCell align="left" >
        
      </TableCell>


      <TableCell align="right">
       
      </TableCell>
    </TableRow>
  );
}

export { PrizeHistoryTableRow };

