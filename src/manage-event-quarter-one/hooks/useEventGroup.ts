import { useQuery } from "react-query";
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant";
import { IEventGroup } from "../common/interface";
import { getEventGroup } from "../service";

export const useEventGroup = (params: IEventGroup) => {
    return {
      ...useQuery([QUERY_KEYS.EVENT_GROUP,params], () => getEventGroup(params), {
        staleTime: 2000,
        select: (data) => data?.data?.response,

      }),
    };
  };