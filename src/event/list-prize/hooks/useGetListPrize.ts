import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListPrizeEventParams } from '../interfaces';
import { getListPrize } from '../services';


export function useGetListPrize(params: IListPrizeEventParams) {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_HISTORY, params], () =>
      getListPrize(params)
    ),
  };
};
