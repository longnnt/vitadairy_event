import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IGiftParams } from '../interfaces';
import { getGift } from '../services';

export function useGetGilf(params: IGiftParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_GIFT, params], () => getGift(params)),
  };
}
