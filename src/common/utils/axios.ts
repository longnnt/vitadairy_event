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
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.request.use(async (config) => {
  const getPersist = localStorage.getItem('redux-root');

  if (getPersist) {
    try {
      const authLogin = JSON.parse(getPersist).authLogin;

      const token = JSON.parse(authLogin).accessToken;

      // const token =
      //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9sYW0wMzA3QGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2NjYwMTQxNTAsImV4cCI6MjM4NjAxNDE1MH0.pA26R7T8ICmiVTDBDGLdyVwdpe_U93v-BzarArhQEypOYgvHfBotWXycGcv4sX6OBVGN_SNuDfQQHK0YZWcozA';
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
