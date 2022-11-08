import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { ButtonType, SuccessUploadCode } from '../constants';
import { buttonTypeState } from '../event.slice';
import { IStoreAdminCallback } from '../interfaces';
import { addEvent } from '../services';
import useMessage from 'src/store-admin/hooks/useMessage';

export const useAddEvent = (callback: IStoreAdminCallback) => {
  const buttonType = useSelector(buttonTypeState);
  const { showErrorSnackbar } = useMessage();
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
        if (buttonType === ButtonType.SAVE_CREATE_SUBMIT) {
          navigate(PATH_DASHBOARD.eventAdmin.editFileEvent(+idEvent));
        } else if (buttonType === ButtonType.SAVE_SUBMIT) {
          navigate(PATH_DASHBOARD.eventAdmin.listPrize(id as string));
        }
      } else {
        showErrorSnackbar(rs.data?.meta?.msg);
      }
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
  });
};
