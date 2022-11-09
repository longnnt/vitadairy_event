import { TableCell, TableRow, Checkbox } from '@mui/material';

export const ProductCodeTableRow = ({
  productCode,
  onSelectRow,
  selected,
}: {
  productCode: string;
  onSelectRow: (checked: boolean) => void;
  selected: boolean;
}) => {
  return (
    <TableRow hover sx={{ cursor: 'pointer' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell>{productCode}</TableCell>
    </TableRow>
  );
};
