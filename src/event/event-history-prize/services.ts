import {
  API_CREATE_EVENT,
  API_PROVINCE,
  API_STORE_ADMIN,
  API_TRANSACTION_TYPE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IDataPrizeHistory,
  IFormCreateEvent,
  IPrizeHistoryActive,
  IPrizeHistoryParams,
  IResProvince,
  IResTransaction,
} from './interfaces';

export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_STORE_ADMIN}`, { params });
};

export const deletePrizeHistoryAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActivePrizeHistory = (params: IPrizeHistoryActive) => {
  return axiosInstance.patch<unknown, IPrizeHistoryActive>(
    `${API_STORE_ADMIN}/${params.code}/active?isActive=${params.isActive}`
  );
};

export const getTransactionTypeId = async () => {
  return axiosInstance.get<unknown, IResTransaction>(`${API_TRANSACTION_TYPE}`);
};

export const getProvince = async () => {
  return axiosInstance.get<unknown, IResProvince>(`${API_PROVINCE}?page=0&size=20`);
};

export const addEvent = (data: IFormCreateEvent) =>
  axiosInstance.post(API_CREATE_EVENT, data);
