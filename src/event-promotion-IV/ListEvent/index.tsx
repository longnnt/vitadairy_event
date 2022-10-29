import { Button, Card } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { EventTable } from './EventTable';

import { useNavigate } from 'react-router-dom';
import { EventTableToolbar } from './EventTableToolbar';

export default function ListEventPromotionDashboard() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate(PATH_DASHBOARD.eventPromotionIV.new);
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
          <Button
            variant="contained"
            startIcon={<Iconify icon={'akar-icons:file'} />}
            onClick={handleCreateEvent}
          >
            Tạo mới
          </Button>
        }
      />
      <Card sx={{ p: '10px', w: '100%' }}>
        <EventTableToolbar />
        <EventTable />
      </Card>
    </>
  );
}
