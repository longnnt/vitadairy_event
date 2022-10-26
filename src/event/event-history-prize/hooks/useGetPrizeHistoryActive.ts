import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
// import { getActivePrizeHistory } from '../services';


export function useGetStoreActive() {
  // const queryClient = useQueryClient();
  // return useMutation(getActivePrizeHistory, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([QUERY_KEYS.EVENT_PRIZE_HISTORY]);
  //   },
  //   retry: 2,
  // });
}
