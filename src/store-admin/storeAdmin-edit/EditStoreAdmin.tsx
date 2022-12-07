import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetStoreAdminById } from '../hooks/useGetStoreAdminById';
import { IFormStoreDetail, IResEditStoreAdmin } from '../interfaces';
import { setStoreAdmintDetail } from '../storeAdmin.slice';
import { useEffect } from 'react';
import { dispatch } from 'src/common/redux/store';
import { EditStoreAdminForm } from './components/EditStoreAdminForm';
import useMessage from 'src/store-admin/hooks/useMessage';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import LoadingScreen from 'src/common/components/LoadingScreen';

export default function EditStoreAdminDashboard() {
  const params = useParams();
  const id = params?.id;
  const { useDeepCompareEffect } = useDeepEffect();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { data,isLoading } = useGetStoreAdminById({
    id: parseInt(id as string),
    callback: {
      onSuccess:()=>{},
      onError: () => showErrorSnackbar('Get store admin fail'),
    },
  });
  const storeAdminDetail: IResEditStoreAdmin = data?.data;
  useDeepCompareEffect(() => {
    dispatch(setStoreAdmintDetail(storeAdminDetail));
  }, [JSON.stringify(storeAdminDetail)]);

  useEffect(
    () => () => {
      dispatch(setStoreAdmintDetail({} as IResEditStoreAdmin));
    },
    []
  );
  return (
    <>
      <HeaderBreadcrumbs
        heading="Cập nhật store admin"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.storeAdmin.root },
          { name: BREADCUMBS.STORE_ADMIN, href: PATH_DASHBOARD.storeAdmin.list },
          { name: 'Thông tin cửa hàng' },
        ]}
      />
      {isLoading && (<LoadingScreen/>)}
      <EditStoreAdminForm />
    </>
  );
}
