import { Switch, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { formatCreateDate } from 'src/store-admin/constants';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { IPropsStoreTableRow } from '../../interfaces';

// ----------------------------------------------------------------------

function StoreTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsStoreTableRow) {
  const { code, phoneNumber, address, qrLink, isActive, createdDate } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { mutate } = useGetStoreActive();

  const handleOpenMenu = (store: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(store.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOnChange = (active: boolean) => {
    mutate({ code, isActive: active });
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{code}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(createdDate).format(formatCreateDate)}
      </TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">
        <a target="_blank" rel="noopener noreferrer" href={qrLink}>
          Tải QR
        </a>
      </TableCell>
      <TableCell align="left" title={isActive === true ? 'actived' : 'unAtivced'}>
        <Switch
          checked={isActive ? true : false}
          onChange={(e) => {
            handleOnChange(e.target.checked);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export { StoreTableRow };
