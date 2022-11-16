import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IHistoryListEventParams, IStoreAdminCallback } from '../interfaces';
import { getPrizeHistoryAdmin } from '../services';

export const useGetPrizeHistory = ({
  params,
  callback,
}: {
  params: IHistoryListEventParams;
  callback: IStoreAdminCallback;
}) =>
  useQuery([QUERY_KEYS.EVENT_PRIZE_HISTORY, params], () => getPrizeHistoryAdmin(params), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
