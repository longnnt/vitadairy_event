import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from "react-query"
import { getListPrize } from '../services';

export const useGetListPrize = (eventId: number) => {
    return {
        ...useQuery(
            [QUERY_KEYS.EVENT_LIST_PRIZE_Q1, { eventId }],
            () => getListPrize(eventId), {cacheTime: 0}
        )
    }
}