import { Switch, TableCell, TableRow, Link, Box } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { FORMATE_CREATE_DATE } from 'src/store-admin/constants';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { setCode } from 'src/store-admin/storeAdmin.slice';
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

  const dispatch = useDispatch();

  const { mutate } = useGetStoreActive();

  const handleOnChange = (active: boolean) => {
    mutate({ code, isActive: active });
  };

  const handleShopInvitation = (id: string) => {
    navigate(PATH_DASHBOARD.storeAdmin.edit_shop(id));
  dispatch(setCode(code))
  }
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" onClick={() => handleShopInvitation(code)}>
        <Link underline="always">
          {code}
        </Link>
      </TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(createdDate).format(FORMATE_CREATE_DATE)}
      </TableCell>

      <TableCell align="left">{address}</TableCell>

      <TableCell align="right">
        <a target="_blank" rel="noopener noreferrer" href={qrLink}>
          Tải QR
        </a>
      </TableCell>

      <TableCell align="right" title={isActive === true ? 'actived' : 'unActivced'}>
        <Switch
          defaultChecked={isActive}
          size='medium'
          onChange={(e) => {
            handleOnChange(e.target.checked);
          }}
        />        
      </TableCell>
    </TableRow>
  );
}

export { StoreTableRow };
