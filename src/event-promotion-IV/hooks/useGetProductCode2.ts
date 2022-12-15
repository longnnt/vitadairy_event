import { IEventCallback, EventSearchParams } from './../interface';
import { getProductCode } from './../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetProductCode_2 = (params: EventSearchParams) =>
  useQuery([QUERY_KEYS.PRODUCT_CODE, params], () => getProductCode(params), {
    select: (data) => data.data.response,
  });
