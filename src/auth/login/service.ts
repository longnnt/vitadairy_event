import { API_LOGIN, API_LOGOUT } from 'src/common/constants/apis';
import axios from 'src/common/utils/axios';
import { IAuth } from './interface';

export const getAuth = (params: IAuth) => {
  return axios.post(API_LOGIN, params);
};
export const getLogout = () => {
  return axios.delete(API_LOGOUT);
};
