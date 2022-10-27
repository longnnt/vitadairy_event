import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { eidtEventPrize } from '../service';

export const useEditEventPrize = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(eidtEventPrize, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.EVENT_PRIZE_DETAIL]);
      },
    }),
  };
};
