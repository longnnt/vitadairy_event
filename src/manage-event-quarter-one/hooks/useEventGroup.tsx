import { useQuery } from "react-query";
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant";
import { getEventGroup } from "../service";

export const useEventGroup = () => {
    return {
      ...useQuery([QUERY_KEYS.EVENT_GROUP], () => getEventGroup(), {
        staleTime: 2000,
        select: (data) => data?.data?.response,

      }),
    };
  };