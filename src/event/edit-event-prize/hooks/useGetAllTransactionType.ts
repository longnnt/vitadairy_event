import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllTransactionType } from '../service';

export const useGetAllTransactionType = () => {
  return {
    ...useQuery([QUERY_KEYS.ALL_TRANSACTION_TYPE], getAllTransactionType),
  };
};
