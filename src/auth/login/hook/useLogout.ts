import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'src/common/redux/store';
import { PATH_AUTH } from 'src/common/routes/paths';
import { setAccessToken, setLogout } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getLogout } from '../service';


export const useAuthlogout = () => {
  const navigate = useNavigate();

  return {
    ...useMutation(getLogout, {
      onSuccess: (data, context) => {
        dispatch(setAccessToken(''));
        dispatch(setLogout(false));
        navigate(PATH_AUTH.login, { replace: true });
      },
      onError: () => {
      },
    }),
  };
};
