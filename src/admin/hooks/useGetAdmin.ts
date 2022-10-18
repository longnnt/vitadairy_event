import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminSearchParams,  IResAdmins } from '../interfaces';
import { getAdmin } from '../services';

export function useGetAdmin(params: IAdminSearchParams) {
  const query = useQuery<IResAdmins>([QUERY_KEYS.ADMIN, params], () => getAdmin(params));

  return { data: query.data || ({} as IResAdmins), isLoading: query.isLoading };
}
