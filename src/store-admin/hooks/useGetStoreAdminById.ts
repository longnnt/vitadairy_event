import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { getStoreAdminById } from '../services';

export const useGetStoreAdminById = ({
  id,
  callback,
}: {
  id: number;
  callback: IStoreAdminCallback;
}) =>
  useQuery([QUERY_KEYS.EDIT_ADMIN, id], () => getStoreAdminById(id), {
    onSuccess() {
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
