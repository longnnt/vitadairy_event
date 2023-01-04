import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { EventPrizeHistoryDashboard } from './components/ListHistoryPrize';

export default function HistoryPrizeEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="History-Prize">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <LoadingSkeletonListGroupEventPage/> */}
        <EventPrizeHistoryDashboard/>
      </Container>
    </Page>
  );
}
