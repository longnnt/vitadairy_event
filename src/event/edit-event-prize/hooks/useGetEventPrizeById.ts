import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getEventPrizeById } from '../service';

export const useGetEventPrizeById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_DETAIL, id], () => getEventPrizeById(id)),
  };
};
