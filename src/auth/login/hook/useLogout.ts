import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'src/common/redux/store';
import { PATH_AUTH } from 'src/common/routes/paths';
import { setAccessToken, setLogout } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getLogout } from '../service';


export const useAuthlogout = (callback: ILoginCallback) => {
  const navigate = useNavigate();

  return {
    ...useMutation(getLogout, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
        dispatch(setAccessToken(''));
        dispatch(setLogout(false));
        navigate(PATH_AUTH.login, { replace: true });
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
