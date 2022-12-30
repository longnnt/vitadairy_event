import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import LoadingSkeletonListPrizeScreen from 'src/event/list-prize/list-prize-dashboard/components/LoadingListPrizePage';
import { ListGroupEventDashboard } from './components/ListGroupEventDashboard';
import LoadingSkeletonListGroupEventPage from './components/SkeletonPageListGroupEvent';

export default function ListGroupEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Group Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <LoadingSkeletonListGroupEventPage/> */}
        <ListGroupEventDashboard/>
      </Container>
    </Page>
  );
}
