import axios from 'axios';
import { toQueryString } from 'src/common/constants/common.utils';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    // Promise.reject((error.response && error.response.data) || 'Something went wrong')
    Promise.reject(
      (error.response && error.response.data) || { message: 'Something went wrong' }
    )
);

axiosInstance.interceptors.request.use(async (config) => {
  // const getPersist = localStorage.getItem('redux-root');
  const getToken = store.getState().authLogin;

  if (getToken) {
    try {
      const token = getToken?.accessToken;

      // const token =
      //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9sYW0wMzA3QGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2NjYwNzU1MzMsImV4cCI6MjM4NjA3NTUzM30.IRg3CBf7G7QtAmsunqZShSqAa6ASKXtZRWSAMJY_yxMgaaNrcYfIG367UH03DfAGt35cvSioE0dMo7TGwabNQA';
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    } catch (e) {
      console.log(e);
    }
  }
  return config;
});

export default axiosInstance;
