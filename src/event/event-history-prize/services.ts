import {
  API_CREATE_EVENT,
  API_CREATE_TRANSACTION_TYPE,
  API_GIFT,
  API_PRIZE_EDIT,
  API_PRIZE_HISTORY,
  API_PROVINCE_VN,
  API_STORE_ADMIN,
  API_TRANSACTION_TYPE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IDataPrizeHistory,
  IFormCreateEvent,
  IGiftParams,
  IPrizeHistoryActive,
  IPrizeHistoryParams,
  IResEventById,
  IResGift,
  IResProvince,
  IResTransaction,
  ITransactionParams,
} from './interfaces';

export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY}/v2`, {
    params,
  });
};

export const deletePrizeHistoryAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActivePrizeHistory = (params: IPrizeHistoryActive) => {
  return axiosInstance.patch<unknown, IPrizeHistoryActive>(
    `${API_STORE_ADMIN}/${params.code}/active?isActive=${params.isActive}`
  );
};

export const exportPrizeHistory = (params: IPrizeHistoryParams) => {
  return axiosInstance.get(`${API_PRIZE_HISTORY}/export/csv/v2`, {
    params,
    headers: { responseType: 'blob' },
  });
};

export const getTransactionTypeId = (params: ITransactionParams) => {
  return axiosInstance.get<unknown, IResTransaction>(`${API_CREATE_TRANSACTION_TYPE}`, {
    params,
  });
};

export const getProvince = () => {
  return axiosInstance.get<unknown, IResProvince>(`${API_PROVINCE_VN}`);
};

export const addEvent = (data: IFormCreateEvent) => {
  return axiosInstance.post(`${API_CREATE_EVENT}`, data);
};

export const getGift = (params: IGiftParams) => {
  return axiosInstance.get<unknown, IResGift>(`${API_GIFT}`, { params });
};

export const getEventById = (id: number) => {
  return axiosInstance.get<unknown, IResEventById>(API_PRIZE_EDIT + `/${id}`);
};
