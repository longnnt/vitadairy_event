import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import AddNewAdminDashboard from 'src/admin/admin-new/AddNewAdmin';

export default function AddPolicy() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Policy: Create">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <AddNewAdminDashboard />
      </Container>
    </Page>
  );
}
