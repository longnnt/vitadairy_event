import { API_ADMIN_FORGOTPASSWORD } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IForgotPassword, IResForgotPass } from '../login/interface';

export const forgotPassword = (params: IForgotPassword) => {
  return axiosInstance.get<unknown, IResForgotPass>(API_ADMIN_FORGOTPASSWORD, { params });
};
