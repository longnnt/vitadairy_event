import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { SUCCESS_UPLOAD_CODE } from 'src/store-admin/constants';
import { IManageEventAdminCallback } from '../common/interface';
import { deleteEventId } from '../services';
import useMessage from 'src/store-admin/hooks/useMessage';

export function useDeleteEventId(callback: IManageEventAdminCallback) {
  const queryClient = useQueryClient();   
  const { showErrorSnackbar } = useMessage();
  return useMutation ((id: number) => deleteEventId(id), {
    onSuccess: (_rs, _variables) => {
      if (_rs.data?.meta?.status === SUCCESS_UPLOAD_CODE) {

        queryClient
          .getQueryCache()
          .findAll([QUERY_KEYS.EVENT_ADMIN_CONTROLLER])
          .forEach(({ queryKey }) => {
            queryClient.invalidateQueries(queryKey);
          });
        callback.onSuccess && callback.onSuccess();
      } else {
        showErrorSnackbar('Sự kiện này đã có người trúng giải không thể xóa');
      }
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}