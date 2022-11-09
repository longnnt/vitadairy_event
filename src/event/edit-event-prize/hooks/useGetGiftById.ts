import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGiftById } from '../service';

export const useGetGiftById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.GIFT_DETAIL, id], () => getGiftById(id), {}),
  };
};
