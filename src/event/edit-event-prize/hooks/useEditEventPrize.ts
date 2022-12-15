import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { cancelMultiQueries } from 'src/common/utils/cacelCategoryInvalidate';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { invalidateMultiQueries } from 'src/common/utils/invalidateMultiQueries';
import { IFormSubmitEdit } from '../common/interface';
import { eidtEventPrize } from '../service';

export const useEditEventPrize = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(eidtEventPrize, {
      onMutate: async (newData: IFormSubmitEdit) => {
        const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EVENT_PRIZE_DETAIL);
        cancelMultiQueries(queryClient, keys);
        const previousEventPrize = keys.map(
          (key) =>
            queryClient.getQueryData<IFormSubmitEdit>(key) || ({} as IFormSubmitEdit)
        );
        keys.forEach((queryKey) => {
          queryClient.setQueryData<IFormSubmitEdit>([queryKey, newData.id], newData);
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
