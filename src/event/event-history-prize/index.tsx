import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { EventPrizeHistoryDashboard } from './history-prize/HistoryList';

// --------------------------------------------

export default function HistoryListPrize() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EventPrizeHistoryDashboard />
      </Container>
    </Page>
  );
}
