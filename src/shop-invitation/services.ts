import {
  API_SHOP_INVITATION,
  API_SHOP_INVITATION_EXPORTCSV,
  API_STORE_ADMIN_CODE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IParamsQuery, IResShopInvitationData } from './common/interfaces';

export const getAllShopInvitation = (): Promise<IResShopInvitationData> => {
  return axiosInstance.get(API_SHOP_INVITATION);
};

export const getAllShopInvitationByparams = (
  params: IParamsQuery
): Promise<IResShopInvitationData> => {
  return axiosInstance.get(API_SHOP_INVITATION, { params });
};

export const getAllShopInvitationExport = () => {
  return axiosInstance.get(API_SHOP_INVITATION_EXPORTCSV);
};

export const getStoreAdminCode = (id: string) => {
  return axiosInstance.get(`${API_STORE_ADMIN_CODE}/${id}`);
};
