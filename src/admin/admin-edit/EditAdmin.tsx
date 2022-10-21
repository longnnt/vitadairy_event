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
// import { AddFormNewAdmin } from './components/AddNewAdminForm';

export default function EditAdminDashboard() {
  const params = useParams();
  const id = params?.id;

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Get admin successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get admin error', {
      variant: 'error',
    });
  };
  const { data } = useGetAdminById({
    id: parseInt(id as string),
    callback: { onSuccess, onError },
  });
  const adminDetail: IResEditAdmin = data?.data;
  useEffect(() => {
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