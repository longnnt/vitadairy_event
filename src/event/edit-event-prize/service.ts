import {
  API_EDIT_EVENT_PRIZE,
  API_GET_ALL_GIFTS,
  API_GIFT,
  API_PRIZE_EDIT,
  API_PROVINCE_SEARCH_BY_FILTER,
  API_PROVINCE_VN,
  API_TRANSACTION_TYPE_UNUSE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IFormEdit,
  IFormSubmitEdit,
  IGiftById,
  IParamsGetGift,
  IProvinceParams,
  IQuery,
  IResEventPrizeById,
  IResGetGifts,
  IResProvince,
  IResTransactionType,
} from './common/interface';

export const getEventPrizeById = (id: number) => {
  return axiosInstance.get<unknown, IResEventPrizeById>(API_PRIZE_EDIT + `/${id}`);
};

export const getAllTransactionType = (params: IQuery) => {
  return axiosInstance.get<unknown, IResTransactionType>(API_TRANSACTION_TYPE_UNUSE, {
    params,
  });
};

export const getAllProvinceVN = (params: IProvinceParams) => {
  return axiosInstance.get<unknown, IResProvince>(`${API_PROVINCE_SEARCH_BY_FILTER}`, {params});
};

export const eidtEventPrize = (newData: IFormSubmitEdit) => {
  return axiosInstance.patch(API_EDIT_EVENT_PRIZE, newData);
};

export const getAllGifts = (params: IParamsGetGift) => {
  return axiosInstance.get<unknown, IResGetGifts>(API_GET_ALL_GIFTS, { params });
};

export const getGiftById = (id: number) => {
  return axiosInstance.get<unknown, IGiftById>(API_GIFT + `/${id}`);
};
