import { Switch, TableCell, TableRow, Link } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { FORMATE_CREATE_DATE } from 'src/store-admin/constants';
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
  const navigate = useNavigate();

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

  const handleShopInvitation = (id: string) => {
    navigate(PATH_DASHBOARD.storeAdmin.shop_invitation_id(id));
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" onClick={() => handleShopInvitation(code.toString())}>
        <Link underline="always">
          {code}
        </Link>
      </TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(createdDate).format(FORMATE_CREATE_DATE)}
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
