import { Switch, TableCell, TableRow, Link, Box, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { FORMATE_CREATE_DATE } from 'src/store-admin/constants';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { setActive, setActiveSelector, setCode } from 'src/store-admin/storeAdmin.slice';
import { IPropsStoreTableRow } from '../../interfaces';
import utc from 'dayjs/plugin/utc'
import useMessage from 'src/store-admin/hooks/useMessage';
import { useGetStoreAdmin } from 'src/store-admin/hooks/useGetStoreAdmin';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

// ----------------------------------------------------------------------

function StoreTableRow({
  row,
  selected,
  // onEditRow,
  // onSelectRow,
  // onDeleteRow,
}: IPropsStoreTableRow) {

  // Chỗ này set global đúng chưa?
  dayjs().utcOffset()
  dayjs.extend(utc)
  const navigate = useNavigate();

  const { code, phoneNumber, address, qrLink, isActive, createdDate } = row;

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  // useMutateStoreActive
  const { mutate } = useGetStoreActive({
    onSuccess: () => {showSuccessSnackbar('Cập nhật thành công')},
    onError: () => showErrorSnackbar('Cập nhật thất bại'),
  });
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
      {new Date(createdDate).toUTCString()}
      </TableCell>

      <TableCell align="left">{address}</TableCell>

      <TableCell align="right">
        <a target="_blank" rel="noopener noreferrer" href={qrLink}>
          Tải QR
        </a>
      </TableCell>

      <TableCell align="right" title={isActive === true ? 'actived' : 'unActivced'}>
        <Switch
          size='medium'
          checked={isActive}
          onChange={(e) => {
            handleOnChange(e.target.checked);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export { StoreTableRow };
