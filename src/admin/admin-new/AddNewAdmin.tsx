import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { AddFormNewAdmin } from './components/AddNewAdminForm';

export default function AddNewAdminDashboard() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Tạo mới admin"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.ADMIN_LIST, href: PATH_DASHBOARD.admin.list },
          { name: 'Tạo mới admin' },
        ]}
      />
      <AddFormNewAdmin />
    </>
  );
}