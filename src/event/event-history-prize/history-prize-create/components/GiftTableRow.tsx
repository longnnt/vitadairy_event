import { Switch, TableCell, TableRow } from '@mui/material';
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
  const { image, name, type, money, point, total, active, id } = row;
  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(setGift(row));
        setValue('giftId', id);
        handleClose();
      }}
    >
      <TableCell><img src={image} alt="" height="50" width="50" /></TableCell>

      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">{type}</TableCell>

      <TableCell align="left">{point}</TableCell>
      
      <TableCell align="left">{total}</TableCell>

      <TableCell align="left">{money}</TableCell>

      <TableCell align="right" title={active === true ? 'actived' : 'unAtivced'}>
        <Switch
          size='medium'
          checked={active ? true : false}
        />        
      </TableCell>

    </TableRow>
  );
}

export { GiftTableRow };

