import { useQuery, useQueryClient, QueryKey } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IManageEventParams } from '../common/interface';
import { getListEventAdmin } from '../services';

export function useGetListEventAdmin(params: IManageEventParams) {
  return {
    ...useQuery([QUERY_KEYS.EVENT_ADMIN_CONTROLLER, params], () => getListEventAdmin(params), {
      select: (data) => data?.data,
    }),
  };
}
