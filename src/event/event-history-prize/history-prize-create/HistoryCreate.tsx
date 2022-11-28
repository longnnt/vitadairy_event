import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import HistoryNewForm from './components/HistoryNewForm';

export default function AddEventDashboard() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new prize"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: 'List event' },
          { name: 'Create event' },
        ]}
      />
      <HistoryNewForm />
    </>
  );
}
