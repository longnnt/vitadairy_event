import axios from 'src/common/utils/axios';
import { IAuth } from './interface';

export const getAuth = (params: IAuth) => {
  return axios.post('admin/login', params);
};
