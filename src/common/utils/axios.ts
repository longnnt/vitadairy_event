import axios from 'axios';
import { toQueryString } from 'src/common/constants/common.utils';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  paramsSerializer: (param: object) => toQueryString(param),
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState()?.authLogin.accessToken
  if (token) {
    try {
      config.headers = {
        ...config.headers,
        Authorization: `${token}`,
      }
    }catch(e){
       console.log(e)
    }
  }
  return {
    ...config,
  };
});
export default axiosInstance;
