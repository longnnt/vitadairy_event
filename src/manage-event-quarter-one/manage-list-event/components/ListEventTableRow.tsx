import { MenuItem, TableCell, TableRow, Switch } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { FORMAT_DATE_FILTER } from 'src/common/constants/common.constants';
import { STATUS } from 'src/manage-event-quarter-one/common/constants';
import { IPropsListEventTableRow } from 'src/manage-event-quarter-one/common/interface';
import { usePatchEvent } from 'src/manage-event-quarter-one/hooks/usePatchEvent';
import useMessage from 'src/store-admin/hooks/useMessage';
// ----------------------------------------------------------------------

function ListEventTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListEventTableRow) {
  const navigate = useNavigate();

  const {
    id,
    name,
    groupName,
    startDate,
    endDate,
    eventCustomerLimit,
    eventStoreLimit,
    status,
  } = row;

  const checkStatus: any = status;
  const isChecked = checkStatus === STATUS.ACTIVE;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };
  
  const { mutate } = usePatchEvent({
    onSuccess: () => {
      showSuccessSnackbar('Cập nhật thành công');
    },
    onError: () => showErrorSnackbar('Cập nhật thất bại'),
  });

  const handleOnChange = (active: boolean) => {
    mutate({ id, status: active ? STATUS.ACTIVE : STATUS.IN_ACTIVE });
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>

      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">{groupName}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(startDate).isValid() ? dayjs(startDate).format(FORMAT_DATE_FILTER) : ''}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dayjs(endDate).isValid() ? dayjs(endDate).format(FORMAT_DATE_FILTER) : ''}
      </TableCell>

      <TableCell align="left">{eventCustomerLimit}</TableCell>

      <TableCell align="left">{eventStoreLimit}</TableCell>
      <TableCell align="left" title={checkStatus}>
        <Switch
          size="medium"
          checked={isChecked}
          onChange={(e) => {
            handleOnChange(e.target.checked);
          }}
        />
      </TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Chỉnh sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

export { ListEventTableRow };

