import { useQuery } from "react-query";
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant";
import { IHistoryListEventParams } from "src/event/event-history-prize/interfaces";
import { getPrizeHistoryAdmin } from "../services";

export function useGetPrizeHistory(params: IHistoryListEventParams) {
    return {
      ...useQuery([QUERY_KEYS.EVENT_PRIZE_HISTORY_Q1, params], () =>
      getPrizeHistoryAdmin(params)
      ),
    };
  }