import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { invalidateMultiQueries } from 'src/common/utils/invalidateMultiQueries';
import { IFormEdit } from '../common/interface';
import { eidtEventPrize } from '../service';

export const useEditEventPrize = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(eidtEventPrize, {
      // onSuccess: () => {
      //   queryClient.invalidateQueries([QUERY_KEYS.EVENT_PRIZE_DETAIL]);
      // },
      onMutate: async (newData: IFormEdit) => {
        const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_PRIZE_DETAIL);
        cancelMultiQueries(queryClient, keys);

        const previousEventPrize = keys.map(
          (key) => queryClient.getQueryData<IFormEdit>(key) || ({} as IFormEdit)
        );
        keys.forEach((queryKey) => {
          queryClient.setQueryData<IFormEdit>([queryKey, newData.id], newData);
        });
        return { previousEventPrize, keys };
      },
      onError: (_error, _variables, context) => {
        if (!context?.previousEventPrize || !context.previousEventPrize.length) return;
      },
      onSettled(data, error, variables, context) {
        invalidateMultiQueries(queryClient, context?.keys);
      },
    }),
  };
};
