import { Link, Switch, TableCell, TableRow, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCode } from 'src/auth/login/login.slice';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { FORMAT_DATE_FILTER } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import useMessage from 'src/store-admin/hooks/useMessage';
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

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

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
        {dayjs(createdDate).isValid()
          ? dayjs(createdDate).format(FORMAT_DATE_FILTER)
          : ''}
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
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <MenuItem
              onClick={() => {
                onEditRow();
                handleCloseMenu();
              }}
            >
              <Iconify icon={'eva:edit-fill'} />
              Edit
            </MenuItem>
          }
        />
      </TableCell>
    </TableRow>
  );
}

export { StoreTableRow };
