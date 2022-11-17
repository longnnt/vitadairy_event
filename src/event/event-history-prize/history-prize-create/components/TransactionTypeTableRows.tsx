import { TableCell, TableRow } from '@mui/material';
import { dispatch } from 'src/common/redux/store';
import { setTransactionType } from '../../event.slice';
import { IPropsTransactionTableRow } from '../../interfaces';

function TransactionTypeTableRow({ row, handleClose }: IPropsTransactionTableRow) {
  const { id, code, name, description, mainCode } = row;
  return (
    <TableRow
      hover
      onClick={() => {
        dispatch(setTransactionType(row));
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
