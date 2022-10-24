import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interfaces';
import { editAdmin } from '../services';

export const useEditAdmin = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editAdmin, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_ADMIN, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};