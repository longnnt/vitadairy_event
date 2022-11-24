import { Link, Switch, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import useMessage from 'src/store-admin/hooks/useMessage';
import { setCode } from 'src/store-admin/storeAdmin.slice';
import { IPropsStoreTableRow } from '../../interfaces';
import utc from 'dayjs/plugin/utc';
import { FORMATE_CREATE_DATE } from 'src/store-admin/constants';

// ----------------------------------------------------------------------

function StoreTableRow({
  row,
  selected,
}: IPropsStoreTableRow) {
  
  const navigate = useNavigate();
  dayjs.extend(utc)

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
      {dayjs.utc(createdDate).utcOffset(7, true).format(FORMATE_CREATE_DATE) }
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

