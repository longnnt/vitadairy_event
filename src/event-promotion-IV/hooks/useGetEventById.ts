import { IEventCallback } from './../interface';
import { getEventById } from './../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetEventById= ({
  id,
  callback,
}: {
  id: number;
  callback: IEventCallback;
}) =>
  useQuery([QUERY_KEYS.EDIT_EVENT_ADMIN, id], () => getEventById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
