import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getStoreAdminCode } from '../services';

export const useGetStoreAdminById = (id: string) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_DETAIL, id], () => getStoreAdminCode(id)),
  };
};
