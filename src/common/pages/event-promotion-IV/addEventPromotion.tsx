import Container from '@mui/material/Container';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { AddEvent } from 'src/event-promotion-IV/AddEvent';
// --------------------------------------------

export default function ListEventPromotion() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới sự kiện">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AddEvent />
      </Container>
    </Page>
  );
}
