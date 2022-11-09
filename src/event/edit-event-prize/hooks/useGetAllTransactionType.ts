import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllTransactionType } from '../service';

export const useGetAllTransactionType = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.ALL_TRANSACTION_TYPE], () => getAllTransactionType(id), {
      select: (data) => data.data.response,
    }),
  };
};
