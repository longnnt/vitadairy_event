import { API_PRIZE_HISTORY, API_PRIZE_HISTORY_Q1 } from "src/common/constants/apis";
import { axiosInstance } from "src/common/utils/axios";
import { IDataPrizeHistory } from "src/event/event-history-prize/interfaces";
import { IPrizeHistoryParams } from "../common/interface";

export const exportPrizeHistory = (params: IPrizeHistoryParams) => {
    return axiosInstance.get(`${API_PRIZE_HISTORY_Q1}/export/csv`, {
      params,
      headers: { responseType: 'blob' },
    });
  };


  export const getPrizeHistoryAdmin = (params: IPrizeHistoryParams) => {
    return axiosInstance.get<unknown, IDataPrizeHistory>(`${API_PRIZE_HISTORY_Q1}`, {
      params,
    });
  };