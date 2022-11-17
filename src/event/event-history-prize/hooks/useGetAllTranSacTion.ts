import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ITransactionParams } from '../interfaces';
import { getTransactionTypeId } from '../services';

export const useGetAllTranSacTion = (params: ITransactionParams) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_GET_TRANSACTION, params], () =>
      getTransactionTypeId(params)
    ),
  };
};
