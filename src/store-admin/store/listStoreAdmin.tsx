import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { StoreAdminListDashboard } from 'src/store-admin/storeAdmin-list/listStoreAdmin';
// --------------------------------------------

export default function StoreAdminList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <StoreAdminListDashboard />
      </Container>
    </Page>
  );
}
