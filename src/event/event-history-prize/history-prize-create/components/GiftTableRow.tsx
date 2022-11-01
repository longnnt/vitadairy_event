import { TableCell, TableRow } from '@mui/material';
import { dispatch } from 'src/common/redux/store';
import { setGift } from '../../event.slice';
import { IPropsGiftTableRow } from '../../interfaces';

function GiftTableRow({ row, handleClose }: IPropsGiftTableRow) {
  const { name, type, money, id } = row;
  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(setGift(row));
        handleClose();
      }}
    >
      <TableCell align="left">{name}</TableCell>

      <TableCell align="center">{type}</TableCell>

      <TableCell align="right">{money}</TableCell>
    </TableRow>
  );
}

export { GiftTableRow };
