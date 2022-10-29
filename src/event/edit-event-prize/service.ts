import {
  API_EDIT_EVENT_PRIZE,
  API_GET_ALL_GIFTS,
  API_PRIZE_EDIT,
  API_PROVINCE_VN,
  API_TRANSACTION_TYPE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IFormEdit,
  IParamsGetGift,
  IResEventPrizeById,
  IResGetGifts,
  IResProvince,
  IResTransactionType,
} from './common/interface';

export const getEventPrizeById = (id: number) => {
  return axiosInstance.get<unknown, IResEventPrizeById>(API_PRIZE_EDIT + `/${id}`);
};

export const getAllTransactionType = () => {
  return axiosInstance.get<unknown, IResTransactionType>(API_TRANSACTION_TYPE);
};

export const getAllProvinceVN = async () => {
  return axiosInstance.get<unknown, IResProvince>(API_PROVINCE_VN);
};

export const eidtEventPrize = (newData: IFormEdit) => {
  return axiosInstance.patch(API_EDIT_EVENT_PRIZE, newData);
};

export const getAllGifts = (params: IParamsGetGift) => {
  return axiosInstance.get<unknown, IResGetGifts>(API_GET_ALL_GIFTS, { params });
};
