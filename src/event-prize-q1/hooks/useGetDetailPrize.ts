import { getDetailPrize } from './../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from "react-query"

export const useGetDetailPrize = (id: number) => {
    return {
        ...useQuery(
            [QUERY_KEYS.EVENT_PRIZE_DETAIL, {id}],
            () => getDetailPrize(id)
        )
    }
}