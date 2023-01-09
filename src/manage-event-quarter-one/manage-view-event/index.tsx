import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { ViewEventDashboard } from './components/ManageViewEvent';
// --------------------------------------------

export default function ManageListEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Edit-Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ViewEventDashboard />
      </Container>
    </Page>
  );
}
