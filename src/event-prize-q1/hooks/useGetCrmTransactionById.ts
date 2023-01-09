import { getCrmTransactionById } from './../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetCrmTransactionById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_GET_TRANSACTION, id], () => getCrmTransactionById(id), {
      enabled: !!id,
    }),
  };
};
