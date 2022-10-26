import { getTransactionTypeId } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetAllNewEvent = () => {
  const queryClient = useQueryClient();
  return {
    ...useQuery([QUERY_KEYS.EVENT_CREATE_PRIZE], () => getTransactionTypeId(), {
      staleTime: 2000,
    }),
    invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.EVENT_CREATE_PRIZE),
  };
};
