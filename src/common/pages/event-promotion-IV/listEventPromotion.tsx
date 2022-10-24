import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import ListEventPromotionDashboard from 'src/event-promotion-IV/ListEvent';
// --------------------------------------------

export default function ListEventPromotion() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListEventPromotionDashboard />
      </Container>
    </Page>
  );
}
