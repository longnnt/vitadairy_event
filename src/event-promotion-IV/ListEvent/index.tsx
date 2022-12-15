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
  setConfirmPopup,
  setIsResetSelect,
  setOpeneditModal,
  setSelectedIds,
} from '../eventPromotionIV.slice';
import { dispatch, useSelector } from 'src/common/redux/store';
import { useDeleteEvents } from '../hooks/useDeleteEvent';
import useMessage from 'src/store-admin/hooks/useMessage';
import Can from 'src/common/lib/Can';
import { EventSearchParams } from '../interface';
import { useGetListEvent } from '../hooks/useGetListEvent';
import { DEFAULT_LOADING_SIZE } from '../constant';
import LoadingSkeletonListEventScreen from './LoadingListEventPage';

export default function ListEventPromotionDashboard() {
  const navigate = useNavigate();

  const selectedIdsValue = useSelector(selectedIdsState);

  const searchParams: EventSearchParams = {
    size: DEFAULT_LOADING_SIZE,
  };

  const { isLoading } = useGetListEvent({
    params: searchParams,
  });

  const handleCreateEvent = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.new);
  };

  const handleDeleteRows = () => {
    dispatch(setOpeneditModal(true));
    dispatch(setSelectedIds(selectedIdsValue));
    // resetSelect();
    // dispatch(setConfirmPopup(true));
    // dispatch(setSelectedIds(selectedIdsValue));
  };

  return (
    <>
      {isLoading ? (
        <LoadingSkeletonListEventScreen />
      ) : (
        <>
          <HeaderBreadcrumbs
            heading="DANH SÁCH SỰ KIỆN"
            links={[
              { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
              { name: 'Danh sách sự kiện' },
            ]}
            action={
              <>
                <Can do="update" on="all">
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon={'akar-icons:file'} />}
                    onClick={handleCreateEvent}
                    sx={{ mr: '10px' }}
                  >
                    Tạo mới
                  </Button>
                  <Button
                    disabled={!selectedIdsValue.length}
                    variant="contained"
                    startIcon={<Iconify icon={'akar-icons:file'} />}
                    color="error"
                    onClick={handleDeleteRows}
                  >
                    Xóa
                  </Button>
                </Can>
              </>
            }
          />
          <Card sx={{ p: '10px', w: '100%' }}>
            <EventTableToolbar />
            <EventTable />
          </Card>
        </>
      )}
    </>
  );
}
