import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { useGetListPrize } from './hooks/useGetListPrize';
import { IListPrizeParams } from './interfaces';
import LoadingSkeletonListPrizeScreen from './list-prize-dashboard/components/SkeletonScreen';
import { ListPrizeDashboard } from './list-prize-dashboard/ListPrize';

// --------------------------------------------

export default function ListPrize() {
  const { themeStretch } = useSettings();
  const params = useParams();
  const id = params?.id;
  const searchParams: IListPrizeParams = {
    eventId: id,
  };
  const { isLoading } = useGetListPrize(searchParams);

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isLoading ? (<LoadingSkeletonListPrizeScreen/>) : <ListPrizeDashboard />}
      </Container>
    </Page>
  );
}
