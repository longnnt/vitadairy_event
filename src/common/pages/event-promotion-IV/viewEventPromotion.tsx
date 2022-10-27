import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { ViewEvent } from 'src/event-promotion-IV/ViewEvent';
// --------------------------------------------

export default function ListEventPromotion() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ViewEvent />
      </Container>
    </Page>
  );
}
