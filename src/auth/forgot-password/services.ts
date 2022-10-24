import { API_ADMIN_FORGOTPASSWORD } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IForgotPassword, IResForgotPass } from '../login/interface';

export const forgotPassword = async (email: IForgotPassword) => {
  console.log(email);

  return (await (
    await axiosInstance.get(API_ADMIN_FORGOTPASSWORD + `?email=${email.email}`)
  ).data) as IResForgotPass;
};
