import { API_SHOP_INVITATION } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IParams_Query, IResShop_Invitation } from './interfaces';
import { toQueryString } from 'src/common/lib/common.lib';

// export const getAllShop_Invitation1 = async () => {
//   const data = (await (
//     await axiosInstance.get(API_SHOP_INVITATION)
//   ).data?.response?.response) as IResShop_Invitation[];
//   console.log('servie data', data);
//   return data;
// };
export const getAllShop_Invitation = async () => {
  return await axiosInstance.get(API_SHOP_INVITATION);
};

export const getAllShop_InvitationByparams = async (params: IParams_Query) => {
  return await axiosInstance.get(API_SHOP_INVITATION + toQueryString(params));
};
