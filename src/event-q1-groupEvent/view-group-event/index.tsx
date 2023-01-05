import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import LoadingPageAddEditGroupEvent from '../common/components/SkeletonAddEdit';
import { useGetGroupEventById } from '../hooks/useGetGroupEventById';
import { ViewGroupEventForm } from './components/ViewGroupEventForm';

export default function AddViewGroupEvent() {
  const { themeStretch } = useSettings();
  const params = useParams();
  const id = params?.id;
  const { isLoading } = useGetGroupEventById({
    id: parseInt(id as string)
  });

  return (
    <Page title="Group Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isLoading ?
          <LoadingPageAddEditGroupEvent />
        :<ViewGroupEventForm/>
        }
      </Container>
    </Page>
  );
}
