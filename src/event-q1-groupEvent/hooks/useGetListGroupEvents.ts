import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGroupEventParams } from '../interfaces';
import { getListGroupEvents } from '../services';


export function useGetListGroupEvents(params: IListGroupEventParams) {
  return {
    ...useQuery([QUERY_KEYS.EVENT_LIST_GROUP_EVENT, params], () => getListGroupEvents(params)),
  };
}
