import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { ListEventDashboard } from '../manage-list-event/ManageListEvent'
// --------------------------------------------

export default function StoreAdminList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="List-Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListEventDashboard />
      </Container>
    </Page>
  );
}
