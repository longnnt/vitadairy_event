import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toQueryString } from 'src/common/constants/common.utils';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    {
      const response = error.response;

      if (response?.status === 401) {
        window.location.href=PATH_AUTH.login
      }
      return Promise.reject(error);
    }
);
axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState()?.authLogin.accessToken;
  if (token) {
    try {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    } catch (e) {
      console.log(e);
    }
  }
  return {
    ...config,
  };
});
export default axiosInstance;
