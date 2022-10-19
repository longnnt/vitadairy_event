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
  const token = store.getState()?.authLogin?.accessToken;

  if (token) {
    try {
      // const token2 =
      //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9sYW0wMzA3QGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2NjYxNDk4MTcsImV4cCI6MjM4NjE0OTgxN30.dy7a2Jg7bay5nHlaHL__6t9FcEX9-rJypEiKC2KChHaoIZ-wX1zExV5GEBEmmZiJD5o9PpcMqQrXaNwTCK0kZg';
      config.headers = {
        ...config.headers,
        Authorization: token,
        // Authorization: token2,
      };
    } catch (e) {
      console.log(e);
    }
  }
  return config;
});

export default axiosInstance;
