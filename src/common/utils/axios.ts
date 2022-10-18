import axios from 'axios';
import { toQueryString } from 'src/common/constants/common.utils';
// config
import { HOST_API } from '../../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  paramsSerializer: (param: object) => toQueryString(param),
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    // Promise.reject((error.response && error.response.data) || 'Something went wrong')
    Promise.reject(
      (error.response && error.response.data) || { mesage: 'Something went wrong' }
    )
);

axiosInstance.interceptors.request.use(async (config) => {
  const getPersist = localStorage.getItem('redux-root');

  if (getPersist) {
    try {
      const authLogin = JSON.parse(getPersist).authLogin;

      // const token = JSON.parse(authLogin).accessToken;

      const token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9sYW0wMzA3QGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2NjYwNzU1MzMsImV4cCI6MjM4NjA3NTUzM30.IRg3CBf7G7QtAmsunqZShSqAa6ASKXtZRWSAMJY_yxMgaaNrcYfIG367UH03DfAGt35cvSioE0dMo7TGwabNQA';
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
