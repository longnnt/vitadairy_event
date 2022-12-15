import { TableCell, TableRow } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { dispatch } from 'src/common/redux/store';
import { setTransactionType } from '../../event.slice';
import { IFormCreate, IPropsTransactionTableRow, ISelectPopup } from '../../interfaces';

function TransactionTypeTableRow({ row, handleClose }: IPropsTransactionTableRow) {
  const { id, code, name, description, mainCode } = row;
  const methods = useFormContext<IFormCreate>();

  const {
    setValue,
    formState: { errors },
  } = methods;
  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(setTransactionType(row));
        // setValue('transactionTypeId', id);
        handleClose();
      }}
    >
      <TableCell align="left">{id}</TableCell>

      <TableCell align="left">{code}</TableCell>

      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">{description}</TableCell>

      <TableCell align="left">{mainCode}</TableCell>
    </TableRow>
  );
}

export { TransactionTypeTableRow };
