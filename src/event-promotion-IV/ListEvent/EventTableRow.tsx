import { Checkbox, Link, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { FORMAT_DATE_FILTER } from 'src/common/constants/common.constants';
import Can from 'src/common/lib/Can';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useUpdateEventStatus } from '../hooks/useUpdateEventStatus';
import { EventTableRowProps } from '../interface';
import useMessage from 'src/store-admin/hooks/useMessage';

export const EventTableRow = ({
  row,
  onSelectRow,
  selected,
  onDeleteRow,
  onViewRow,
}: EventTableRowProps) => {
  const navigate = useNavigate();
  const { name, startDate, endDate, status, id } = row;

  const checkStatus: any = status;
  const isChecked = checkStatus === 'ACTIVE';
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setOpenMenuActions(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleEditEventAction = (id: number) => {
    navigate(PATH_DASHBOARD.eventPromotionIV.edit(id));
    setOpenMenuActions(null);
  };

  const handleClickView = () => {
    onViewRow(row);
    setOpenMenuActions(null);
  };
  const handleViewListPrize = (id: string) => {
    navigate(PATH_DASHBOARD.eventAdmin.listPrize(id));
  };

  const { mutate } = useUpdateEventStatus({
    onSuccess: () => {
      showSuccessSnackbar('Cập nhật thành công');
    },
    onError: () => showErrorSnackbar('Cập nhật thất bại'),
  });
  const handleOnChange = (active: boolean) => {

    mutate({ id, status: active ? "ACTIVE" : "IN_ACTIVE" });
  };

  return (
    <TableRow hover selected={selected}>
      <Can do="update" on="all">
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
      </Can>
      <TableCell align="left" onClick={() => handleViewListPrize(id.toString())}>
        <Link underline="always">{name}</Link>
      </TableCell>
      <TableCell align="left">
        {dayjs(startDate).isValid() ? dayjs(startDate).format(FORMAT_DATE_FILTER) : ''}
      </TableCell>
      <TableCell align="left">
        {dayjs(endDate).isValid() ? dayjs(endDate).format(FORMAT_DATE_FILTER) : ''}
      </TableCell>
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
              <MenuItem onClick={() => handleViewListPrize(id.toString())}>
                <Iconify icon={'fa6-solid:gift'} />
                View Gift
              </MenuItem>
              <MenuItem onClick={handleClickView}>
                <Iconify icon={'akar-icons:eye'} />
                View Event
              </MenuItem>
              <Can do="update" on="all">
                <MenuItem onClick={() => handleEditEventAction(id)}>
                  <Iconify icon={'eva:edit-fill'} />
                  Edit
                </MenuItem>
                <MenuItem
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              </Can>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};
