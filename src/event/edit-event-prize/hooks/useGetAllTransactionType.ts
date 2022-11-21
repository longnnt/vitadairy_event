// import { useQuery } from 'react-query';
// import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
// import { IQuery } from '../common/interface';
// import { getAllTransactionType } from '../service';

// export const useGetAllTransactionType = (params: IQuery) => {
//   return {
//     ...useQuery(
//       [QUERY_KEYS.ALL_TRANSACTION_TYPE, params],
//       () => getAllTransactionType(params),
//       {
//         select: (data) => data.data.response,
//       }
//     ),
//   };
// };

import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllTransactionType } from '../service';

export const useGetAllTransactionType = () => {
  return {
    ...useQuery([QUERY_KEYS.ALL_TRANSACTION_TYPE], getAllTransactionType, {
      select: (data) => data.data.response,
    }),
  };
};
