import { QUERY_KEYS } from './../../common/constants/queryKeys.constant';
import { useQuery } from "react-query"
import { getCrmTransaction } from '../services';

export const useGetUnsuedCrmTranSacTion = () => {
    const params = {
        page: 0,
        size: 2000
    }

    return {
        ...useQuery([QUERY_KEYS.EVENT_GET_TRANSACTION, params], () => {
            getCrmTransaction()
        })
    }
};