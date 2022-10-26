import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { ListPrizeDashboard } from './list-prize-dashboard/ListPrize';
// --------------------------------------------

export default function ListPrize() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListPrizeDashboard/>
      </Container>
    </Page>
  );
}
