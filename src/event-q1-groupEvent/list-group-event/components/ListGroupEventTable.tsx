import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { ConfirmEditModal } from 'src/common/components/modal/ConfirmEditModal';
import { TableMoreMenu } from 'src/common/components/table';
import Can from 'src/common/lib/Can';
import { dispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { setConfirmEdit } from 'src/event-promotion-IV/eventPromotionIV.slice';
import { alertStatusGroupEventSelector, setAlert, setIsConfirmDelete } from 'src/event-q1-groupEvent/groupEvent.slice';
import { IPropsListGroupEventTableRow } from 'src/event-q1-groupEvent/interfaces';

// ----------------------------------------------------------------------

function ListGroupEventTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsListGroupEventTableRow) {
  const { id, name } = row;
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const alertStatus= useSelector(alertStatusGroupEventSelector);
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleCloseModal = () => {
    dispatch(setAlert(false))
  };
  const handleOnAgree= () =>{
    dispatch(setAlert(false))
    dispatch(setIsConfirmDelete(true));
  }
  
  return (
    <>
    <TableRow hover selected={selected} sx={{ overflow: 'hidden' }}>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">
        <Can do="update" on="all">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
                  <MenuItem
                    onClick={() => {
                      navigate(PATH_DASHBOARD.eventQ1GroupEvent.viewGroupEvent(id));
                    }}
                  >
                    <Iconify icon={'mdi:eye-outline'} />
                    Xem
                  </MenuItem>
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
                      // handleOpenModal()
                      handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Xóa
                  </MenuItem>
                  
                </Stack>
               
              </>
            }
          />
        </Can>
        
      </TableCell>
    </TableRow>
    <ConfirmEditModal
     open={alertStatus}
     handleClose={handleCloseModal}
     type='xóa group event này'
     colorType={false}
     handleOnAgree={handleOnAgree}
    />
    </>
  );
}

export { ListGroupEventTableRow };
