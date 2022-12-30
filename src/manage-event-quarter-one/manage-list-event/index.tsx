import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { ListEventDashboard } from './components/ManageListEvent'
// --------------------------------------------

export default function ManageListEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="List-Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListEventDashboard />
      </Container>
    </Page>
  );
}
