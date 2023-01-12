import { IListPrizeParams } from './../../event/list-prize/interfaces';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from "react-query"
import { getListPrize } from '../services';

export const useGetListPrize = (params: IListPrizeParams) => {
    return {
        ...useQuery(
            [QUERY_KEYS.EVENT_LIST_PRIZE_Q1, params],
            () => getListPrize(params), {cacheTime: 0}
        )
    }
}