import { API_PRIZE_HISTORY } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataPrizeHistory, IHistoryListEventParams, IPrizeHistoryActive, IPrizeHistoryParams} from './interfaces';


export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY}/all`, { params });
};
export const exportPrizeHistory = (params: IPrizeHistoryParams) => {
  return axiosInstance.get(`${API_PRIZE_HISTORY}/export/csv`, {
    params,
    headers: { responseType: 'blob' },
  });
};
