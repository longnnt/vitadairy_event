import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { getActiveListPrize } from '../services';

export function useGetListPrizeActive() {
  const queryClient = useQueryClient();
  return useMutation(getActiveListPrize, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.EVENT_PRIZE_HISTORY]);
    },
    retry: 2,
  });
}
