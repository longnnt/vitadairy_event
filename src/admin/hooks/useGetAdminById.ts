import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interfaces';
import { getAdminById } from '../services';

export const useGetAdminById = ({
  id,
  callback,
}: {
  id: number;
  callback: IAdminCallback;
}) =>
  useQuery([QUERY_KEYS.EDIT_ADMIN, id], () => getAdminById(id), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });