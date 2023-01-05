import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { EditGroupEventForm } from './components/EditGroupEventForm';
import LoadingPageAddEditGroupEvent from '../common/components/SkeletonAddEdit';
import { useGetGroupEventById } from '../hooks/useGetGroupEventById';

export default function AddGroupEvent() {
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
        :<EditGroupEventForm/>
        }
      </Container>
    </Page>
  );
}
