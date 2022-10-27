import { Container } from '@mui/system';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { EditEventPrizeForm } from './components/EditEventPrizeForm';

export default function EditEventPrize() {
  return (
    <>
      <Container>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa quà tặng sự kiện: "
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.LIST_EVENT_PRIZE,
              href: PATH_DASHBOARD.eventAdmin.listPrize,
            },
            { name: BREADCUMBS.EDIT_EVENT_PRIZE },
          ]}
        />
        <EditEventPrizeForm />
      </Container>
    </>
  );
}
