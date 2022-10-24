import { Container } from '@mui/material';
import { AdminListDashboard } from 'src/admin/admin-list/ListAdmin';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';


export default function AdminList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Quản lý admin">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <AdminListDashboard />
      </Container>
    </Page>
  );
}
