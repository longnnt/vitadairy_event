import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataPrizeHistory, IHistoryListEventParams, IPrizeHistoryActive, IPrizeHistoryParams} from './interfaces';


export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_STORE_ADMIN}`, { params });
};

export const deletePrizeHistoryAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActivePrizeHistory = (params: IPrizeHistoryActive) => {
  return axiosInstance.patch<unknown, IPrizeHistoryActive>(`${API_STORE_ADMIN}/${params.code}/active?isActive=${params.isActive}`);
};
