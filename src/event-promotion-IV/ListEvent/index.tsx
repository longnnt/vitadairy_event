import { Button, Card } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { EventTable } from './EventTable';

import { useNavigate } from 'react-router-dom';
import { EventTableToolbar } from './EventTableToolbar';
import {
  selectedIdsState,
  setIsResetSelect,
  setSelectedIds,
} from '../eventPromotionIV.slice';
import { dispatch, useSelector } from 'src/common/redux/store';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import useMessage from 'src/store-admin/hooks/useMessage';

export default function ListEventPromotionDashboard() {
  const navigate = useNavigate();

  const selectedIdsValue = useSelector(selectedIdsState);

  const handleCreateEvent = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.new);
  };

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const mutationDelete = useDeleteEvents({
    onSuccess: () => showSuccessSnackbar('Xóa sự kiện thành công'),
    onError: () => showErrorSnackbar('Xóa sự kiện thất bại'),
    onSuccessSend: () => showErrorSnackbar('Sự kiện đã có người trúng không thể xóa'),
  });

  const handleDeleteRows = () => {
    if (selectedIdsValue.length) {
      mutationDelete.mutate(selectedIdsValue);
      dispatch(setSelectedIds([]));
      dispatch(setIsResetSelect(true));
    }
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện' },
        ]}
        action={
          <>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              onClick={handleCreateEvent}
              sx={{ mr: '10px' }}
            >
              Tạo mới
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'akar-icons:file'} />}
              color="error"
              onClick={handleDeleteRows}
            >
              Xóa
            </Button>
          </>
        }
      />
      <Card sx={{ p: '10px', w: '100%' }}>
        <EventTableToolbar />
        <EventTable />
      </Card>
    </>
  );
}
