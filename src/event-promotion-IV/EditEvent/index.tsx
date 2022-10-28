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
