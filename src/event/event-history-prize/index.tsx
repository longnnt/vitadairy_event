import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { DEFAULT_LOADING_SIZE } from './constants';
import LoadingSkeletonHistoryPrizeScreen from './history-prize/components/SkeletonScreen';
import { EventPrizeHistoryDashboard } from './history-prize/HistoryList';
import { useGetPrizeHistory } from './hooks/useGetPrizeHistory';
import { IPrizeHistoryParams } from './interfaces';

// --------------------------------------------

export default function HistoryListPrize() {
  const { themeStretch } = useSettings();
  const searchParams: IPrizeHistoryParams = {
    size: DEFAULT_LOADING_SIZE,
  };
  const { isLoading } = useGetPrizeHistory(searchParams);
  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        
        {isLoading ?<LoadingSkeletonHistoryPrizeScreen/> : <EventPrizeHistoryDashboard />}
        {/* <LoadingSkeletonHistoryPrizeScreen/> */}
      </Container>
    </Page>
  );
}
