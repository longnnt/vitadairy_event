import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IHistoryListEventParams} from '../interfaces';
import { getPrizeHistoryAdmin } from '../services';


export function useGetPrizeHistory(params: IHistoryListEventParams) {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_HISTORY, params], () =>
      getPrizeHistoryAdmin(params)
    ),
  };
};
