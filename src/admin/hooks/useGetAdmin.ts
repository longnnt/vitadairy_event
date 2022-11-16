import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminParams, IResAdmins } from '../interfaces';
import { getAdmin } from '../services';

export function useGetAdmin(params: IAdminParams) {
  return {
    ...useQuery([QUERY_KEYS.ADMIN, params], () => getAdmin(params), {
      select: (data) => data?.data?.response,
    }),
  };
}
