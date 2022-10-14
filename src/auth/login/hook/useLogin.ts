import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { setAccessToken, setLogin } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getAuth } from '../service';
export const useAuthlogin = (callback: ILoginCallback) => {
  return {
    ...useMutation(getAuth, {
      onSuccess: (data, context) => {
        const { accessToken } = data.data;
        dispatch(setAccessToken(accessToken));
        dispatch(setLogin(true));
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
