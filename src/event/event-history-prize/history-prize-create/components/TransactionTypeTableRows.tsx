import { Checkbox, TableCell, TableRow } from '@mui/material';

export const TransactionTypeTableRows = ({
  transactionType,
  onSelectRow,
  selected,
}: {
  transactionType: any;
  onSelectRow: (checked: boolean) => void;
  selected: boolean;
}) => {
  const { code, id } = transactionType;
  return (
    <TableRow hover sx={{ cursor: 'pointer' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={(e) => {
            onSelectRow(e.target.checked);
          }}
        />
      </TableCell>
      <TableCell>{code}</TableCell>
    </TableRow>
  );
};
