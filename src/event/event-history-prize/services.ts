import { API_PRIZE_HISTORY } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataPrizeHistory, IHistoryListEventParams, IPrizeHistoryActive, IPrizeHistoryParams} from './interfaces';


export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
  return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY}/v2`, { params });
};
export const exportPrizeHistory = (params: IPrizeHistoryParams) => {
  return axiosInstance.get(`${API_PRIZE_HISTORY}/export/csv/v2`, {
    params,
    headers: { responseType: 'blob' },
  });
};
