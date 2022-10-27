import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetAdminById } from '../hooks/useGetAdminById';
import { IFormAdmin, IResEditAdmin } from '../interfaces';
import { setAdmintDetail } from '../admin.slice';
import { useEffect } from 'react';
import { dispatch } from 'src/common/redux/store';
import { EditFormAdmin } from './components/EditAdminForm';
import useMessage from 'src/store-admin/hooks/useMessage';
import useDeepEffect from 'src/common/hooks/useDeepEffect';

export default function EditAdminDashboard() {
  const params = useParams();
  const id = params?.id;
  const { useDeepCompareEffect } = useDeepEffect();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { data } = useGetAdminById({
    id: parseInt(id as string),
    callback: {
      onSuccess: () => showSuccessSnackbar('Get Admin successfully'),
      onError: () => showErrorSnackbar('Get admin fail'),
    },
  });
  const adminDetail: IResEditAdmin = data?.data;
  useDeepCompareEffect(() => {
    dispatch(setAdmintDetail(adminDetail));
  }, [JSON.stringify(adminDetail)]);

  useEffect(
    () => () => {
      dispatch(setAdmintDetail({} as IResEditAdmin));
    },
    []
  );
  return (
    <>
      <HeaderBreadcrumbs
        heading="Cập nhật admin"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.admin.root },
          { name: 'Cập nhật admin' },
        ]}
      />
      <EditFormAdmin />
    </>
  );
}
