import { AxiosResponse } from 'axios';
import { API_ADMIN_FORGOTPASSWORD } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {  IParamResetPassWord, IResetPassword,  IResResetPass } from '../login/interface';

export const forgotPassword = (params: IParamResetPassWord) => {
  return axiosInstance.post<IResResetPass, AxiosResponse<IResResetPass>>(
    API_ADMIN_FORGOTPASSWORD,
      params
  );
};
