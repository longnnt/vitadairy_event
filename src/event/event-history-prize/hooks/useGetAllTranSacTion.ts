import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getTransactionTypeId } from '../services';

export const useGetAllTranSacTion = () => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_GET_TRANSACTION], () => getTransactionTypeId()),
  };
};
