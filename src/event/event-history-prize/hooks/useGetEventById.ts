import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getEventById } from '../services';

export const useGetEventById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_DETAIL, id], () => getEventById(id)),
  };
};
