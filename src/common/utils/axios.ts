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

export default axiosInstance;
