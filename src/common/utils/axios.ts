import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toQueryString } from 'src/common/constants/common.utils';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';
import { PATH_AUTH } from '../routes/paths';
import Snackbar from '@mui/material/Snackbar';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL:  HOST_API,

});

export const axiosInstanceTemp = axios.create({
  baseURL:  'https://api-sandbox.vitadairyvietnam.vn/api-v3',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if (response?.status === 401 && response?.data?.meta?.status === 1003) {
      window.location.href = PATH_AUTH.login;
    }
    // else if ((response?.status === 401 && response?.data?.meta?.status === 1002)){
        
    // }
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
