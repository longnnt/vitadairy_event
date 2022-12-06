import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getStoreAdminById } from '../services';

export const useGetStoreAdminById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_DETAIL, id], () => getStoreAdminById(id)),
  };
};
