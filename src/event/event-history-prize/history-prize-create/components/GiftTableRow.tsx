import { TableCell, TableRow } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { dispatch } from 'src/common/redux/store';
import { setGift } from '../../event.slice';
import { IFormCreate, IPropsGiftTableRow } from '../../interfaces';

function GiftTableRow({ row, handleClose }: IPropsGiftTableRow) {
  const methods = useFormContext<IFormCreate>();

  const {
    setValue,
    formState: { errors },
  } = methods;
  const { name, type, money, id } = row;
  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(setGift(row));
        setValue('giftId', id);
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

