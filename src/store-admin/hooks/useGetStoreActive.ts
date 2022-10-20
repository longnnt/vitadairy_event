import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getActiveStore } from '../services';

export function useGetStoreActive() {
  const queryClient = useQueryClient();
  return useMutation(getActiveStore, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.STORE_ADMIN]);
    },
    retry: 2,
  });
}
