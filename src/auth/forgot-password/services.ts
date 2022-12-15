import { AxiosResponse } from 'axios';
import { API_ADMIN_FORGOT_PASSWORD } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IForgotPassword, IResForgotPass } from '../login/interface';

export const forgotPassword = (params: IForgotPassword) => {
  return axiosInstance.get<IResForgotPass, AxiosResponse<IResForgotPass>>(
    API_ADMIN_FORGOT_PASSWORD,
    {
      params,
    }
  );
};
