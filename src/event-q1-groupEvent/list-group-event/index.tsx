import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import LoadingSkeletonListPrizeScreen from 'src/event/list-prize/list-prize-dashboard/components/LoadingListPrizePage';
import { ListGroupEventDashboard } from './components/ListGroupEventDashboard';
import LoadingSkeletonListGroupEventPage from './components/SkeletonPageListGroupEvent';
import { IListGroupEventParams } from '../interfaces';
import { useGetListGroupEvents } from '../hooks/useGetListGroupEvents';
import { DEFAULT_LOADING_LIMIT } from '../contants';

export default function ListGroupEvent() {
  const { themeStretch } = useSettings();
  const searchParams: IListGroupEventParams = {
    limit: DEFAULT_LOADING_LIMIT,
  };
  const {isLoading} = useGetListGroupEvents(searchParams);
  return (
    <Page title="Group Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isLoading ?
          <LoadingSkeletonListGroupEventPage/>
        :<ListGroupEventDashboard/>
        }
      </Container>
    </Page>
  );
}
