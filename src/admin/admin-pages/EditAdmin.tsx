import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import EditAdminDashboard from '../admin-edit/EditAdmin';

export default function EditEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin: Edit">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <EditAdminDashboard />
      </Container>
    </Page>
  );}