import { IEventCallback, EventSearchParams } from './../interface';
import { getListEvent } from './../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetListEvent = ({
  params,
  callback,
}: {
  params: EventSearchParams;
  callback?: IEventCallback;
}) =>
  useQuery([QUERY_KEYS.EVENT_LIST, params], () => getListEvent(params), {
    onSuccess() {
      callback?.onSuccess && callback?.onSuccess();
    },
    onError() {
      callback?.onError && callback?.onError();
    },
  });
