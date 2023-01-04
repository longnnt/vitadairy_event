import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGift } from '../services';
import { IGiftParams } from './../../event/event-history-prize/interfaces';

export const useGetListGift = (params: IGiftParams) => {
    return {
        ...useQuery([QUERY_KEYS.LIST_GIFT, params], () => getGift(params)),
    }
}