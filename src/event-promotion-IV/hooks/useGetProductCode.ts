import { IEventCallback, EventSearchParams } from './../interface';
import { getProductCode } from './../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetProductCode = ({
  params,
  callback,
}: {
  params: EventSearchParams;
  callback: IEventCallback;
}) =>
  useQuery([QUERY_KEYS.PRODUCT_CODE, params], () => getProductCode(params), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
