import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { SuccessUploadCode } from '../constants';
import { buttonTypeState } from '../event.slice';
import { IStoreAdminCallback } from '../interfaces';
import { addEvent } from '../services';

export const useAddEvent = (callback: IStoreAdminCallback) => {
  const buttonType = useSelector(buttonTypeState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  return useMutation(addEvent, {
    onSuccess: (rs, variables) => {
      if (rs.data?.meta?.status === SuccessUploadCode) {
        queryClient.invalidateQueries([QUERY_KEYS.EVENT_CREATE_PRIZE]);
        const idEvent = rs?.data?.response?.id;
        callback.onSuccess && callback.onSuccess();
        if (buttonType === 'saveCreateSubmit') {
          navigate(PATH_DASHBOARD.eventAdmin.editFileEvent(+idEvent));
        } else if (buttonType === 'saveSubmit') {
          navigate(PATH_DASHBOARD.eventAdmin.listPrize(id as string));
        }
      } else {
        callback.onError && callback.onError();
      }
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
  });
};
