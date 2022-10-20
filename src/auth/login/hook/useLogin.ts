import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { setAccessToken, setLogin } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getAuth } from '../service';
export const useAuthlogin = (callback: ILoginCallback) => {
  return {
    ...useMutation(getAuth, {
      onSuccess: (data, context) => {
<<<<<<< HEAD
        const { accessToken } = data.data;
        dispatch(setAccessToken(`Bearer ${accessToken}`));
=======
        const { accessToken } = data.data.response.auth;
        dispatch(setAccessToken( 'Bearer ' + accessToken));
>>>>>>> 2813d6e6326a234b72b45e52e01abd0c40e479d8
        dispatch(setLogin(true));
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
