import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import EditStoreAdminDashboard from '../storeAdmin-edit/EditStoreAdmin';

export default function EditStore() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin: Edit">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <EditStoreAdminDashboard />
      </Container>
    </Page>
  );
}