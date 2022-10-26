import { useSelector } from 'react-redux';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import HistoryNewForm from './components/HistoryNewForm';

export default function AddEventDashboard() {

  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new event"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'Event' }]}
      />
      <HistoryNewForm />
    </>
  );
}
