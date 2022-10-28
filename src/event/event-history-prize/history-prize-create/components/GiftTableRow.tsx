import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IPropsGiftTableRow } from '../../interfaces';


function GiftTableRow({
  row,
}: IPropsGiftTableRow) {
  const { name,type,money } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover >
      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">{type}</TableCell>

      <TableCell align="left">{money}</TableCell>

    </TableRow>
  );
}

export { GiftTableRow };