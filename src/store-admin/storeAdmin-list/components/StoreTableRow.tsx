import { Link, Switch, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCode } from 'src/auth/login/login.slice';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { FORMATE_CREATE_DATE_HISTORY_LIST } from 'src/store-admin/constants';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import useMessage from 'src/store-admin/hooks/useMessage';
import { IPropsStoreTableRow } from '../../interfaces';
// ----------------------------------------------------------------------

function StoreTableRow({ row, selected }: IPropsStoreTableRow) {
  const navigate = useNavigate();

  const { code, phoneNumber, address, qrLink, isActive, createdDate } = row;

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  // useMutateStoreActive
  const { mutate } = useGetStoreActive({
    onSuccess: () => {
      showSuccessSnackbar('Cập nhật thành công');
    },
    onError: () => showErrorSnackbar('Cập nhật thất bại'),
  });
  const handleOnChange = (active: boolean) => {
    mutate({ code, isActive: active });
  };

  const handleShopInvitation = (id: string) => {
    navigate(PATH_DASHBOARD.storeAdmin.edit_shop(id));
    dispatch(setCode(code));
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" onClick={() => handleShopInvitation(code)}>
        <Link underline="always">{code}</Link>
      </TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {_.isDate(dayjs(createdDate).format(FORMATE_CREATE_DATE_HISTORY_LIST))
          ? dayjs(createdDate).format(FORMATE_CREATE_DATE_HISTORY_LIST)
          : createdDate}
      </TableCell>

      <TableCell align="left">{address}</TableCell>

      <TableCell align="right">
        <a target="_blank" rel="noopener noreferrer" href={qrLink}>
          Tải QR
        </a>
      </TableCell>

      <TableCell align="right" title={isActive === true ? 'actived' : 'unActivced'}>
        <Switch
          size="medium"
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
