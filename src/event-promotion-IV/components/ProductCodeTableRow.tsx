import { TableCell, TableRow, Checkbox } from '@mui/material';
import { dispatch } from 'src/common/redux/store';
import { setProduct } from '../eventPromotionIV.slice';

export const ProductCodeTableRow = ({
  product,
  onSelectRow,
  selected,
}: {
  product: any;
  onSelectRow: (checked: boolean) => void;
  selected: boolean;
}) => {
  const { code, id } = product;
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
