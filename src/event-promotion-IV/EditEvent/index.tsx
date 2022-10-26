import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetEventById } from '../hooks/useGetEventById';
import { EditEventForm } from './EditEventForm';
import useMessage from 'src/store-admin/hooks/useMessage';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'src/common/redux/store';
import { setEventDetail } from '../eventPromotionIV.slice';
import { useEffect } from 'react';
import { IEventFormData } from '../interface';
import dayjs from 'dayjs';

export const EditEvent = () => {
  //   const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  //   const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  //   const { data } = useGetEventById({
  //     id: parseInt(id as string),
  //     callback: {
  //       onSuccess: () => showSuccessSnackbar('Tải sự kiện thành công'),
  //       onError: () => showErrorSnackbar('Tải sự kiện thất bại'),
  //     },
  //   });
  const fakeData = {
    name: 'soemthing',
    startDate: '2022-10-06T20:13:00.000Z',
    endDate: '2022-10-04T17:00:00.000Z',
    skus: ['Ralph Hubbard'],
    defaultWinRate: 1,
    upRate: 1,
    downRate: 1,
    userRegisterDate: '2022-09-30T17:00:00.000Z',
    userLimit: 1,
    id: '172ce2e3-2cb5-4815-9b27-888fc77594af',
  };
  const data: IEventFormData = {
    ...fakeData,
    startDate: new Date(fakeData.startDate),
    endDate: new Date(fakeData.endDate),
    userRegisterDate: new Date(fakeData.userRegisterDate),
  };
  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    dispatch(setEventDetail(data));
  }, [data]);

  useEffect(
    () => () => {
      dispatch(setEventDetail({} as IEventFormData));
    },
    []
  );
  return (
    <>
      <HeaderBreadcrumbs
        heading="DANH SÁCH SỰ KIỆN"
        links={[
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Danh sách sự kiện', href: PATH_DASHBOARD.eventPromotionIV.root },
          { name: 'Sửa sự kiện' },
        ]}
      />
      <EditEventForm />
    </>
  );
};
