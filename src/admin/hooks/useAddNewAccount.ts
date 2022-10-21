import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { IAdminCallback } from '../interfaces';
import { addAllNewAccount } from '../services';

export const useAddNewAdmin = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return {
    ...useMutation(addAllNewAccount, {
      onSuccess: (_result, _variables) => {
        if (_result.data.meta.status > 1000) {
          return callback.onError && callback.onError();
        }
        navigate(PATH_DASHBOARD.admin.list);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};