import { useMutation } from 'react-query';
import { ILoginCallback } from '../interface';
import { getLogout } from '../service';

export const useAuthlogout = (callback: ILoginCallback) => {
  return {
    ...useMutation(getLogout, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};