import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { CreateEventDashboard } from './components/ManageCreateEvent';
// --------------------------------------------

export default function ManageListEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Create-Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CreateEventDashboard />
      </Container>
    </Page>
  );
}
