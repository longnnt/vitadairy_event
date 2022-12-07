import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IStoreAdminCallback } from '../interfaces';
import { getStoreAdminById } from '../services';

export const useGetStoreAdminById = ({
  code,
  callback,
}: {
  code: string;
  callback: IStoreAdminCallback;
}) =>
  useQuery([QUERY_KEYS.STORE_ADMIN, code], () => getStoreAdminById(code), {
    onSuccess() {
      callback.onSuccess && callback.onSuccess();
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
  
