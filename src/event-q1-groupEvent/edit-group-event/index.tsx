import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { EditGroupEventForm } from './components/EditGroupEventForm';
import LoadingPageAddEditGroupEvent from '../common/components/SkeletonAddEdit';

export default function AddGroupEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Group Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <LoadingPageAddEditGroupEvent/> */}
        <EditGroupEventForm/>
      </Container>
    </Page>
  );
}
