import {
  API_CREATE_EVENT,
  API_PROVINCE,
  API_STORE_ADMIN,
  API_TRANSACTION_TYPE,
  API_PRIZE_HISTORY,
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
<<<<<<< HEAD
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY}`, {
    params,
  });
=======
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY}/v2`, { params });
>>>>>>> a8ca82485c29c9ada3b355190426fd414e0fbb03
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

export const getTransactionTypeId = async () => {
  return axiosInstance.get<unknown, IResTransaction>(`${API_TRANSACTION_TYPE}`);
};

export const getProvince = async () => {
  return axiosInstance.get<unknown, IResProvince>(`${API_PROVINCE}`);
};

export const addEvent = (data: IFormCreateEvent) => {
  return axiosInstance.post(`${API_CREATE_EVENT}`, data);
};
